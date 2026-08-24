import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
import {
  MAX_ATTACHMENT_SIZE_BYTES,
  ALLOWED_ATTACHMENT_EXTENSIONS,
  ATTACHMENT_CONTENT_TYPES,
  getFileExtension,
} from '@/lib/attachments';

let _ses: SESClient | null = null;
export function getSesClient() {
  if (!_ses) {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error("Missing AWS SES environment variables");
    }
    _ses = new SESClient({
      region,
      credentials: { accessKeyId: accessKeyId.trim(), secretAccessKey: secretAccessKey.trim() },
    });
  }
  return _ses;
}

export const SES_FROM_EMAIL = process.env.SES_FROM_EMAIL || 'noreply@designpovindia.com';

export interface EmailAttachment {
  filename: string;
  contentType: string;
  content: Buffer;
}

function encodeMimeWord(str: string) {
  return /[^\x00-\x7F]/.test(str)
    ? `=?UTF-8?B?${Buffer.from(str, 'utf-8').toString('base64')}?=`
    : str;
}

function buildRawMimeEmail(opts: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments: EmailAttachment[];
}) {
  const boundaryMixed = `mixed_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const boundaryAlt = `alt_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const headers = [
    `From: ${opts.from}`,
    `To: ${opts.to}`,
    `Subject: ${encodeMimeWord(opts.subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundaryMixed}"`,
  ].join('\r\n');

  const alternativePart = [
    `--${boundaryMixed}`,
    `Content-Type: multipart/alternative; boundary="${boundaryAlt}"`,
    '',
    `--${boundaryAlt}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(opts.text, 'utf-8').toString('base64'),
    '',
    `--${boundaryAlt}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(opts.html, 'utf-8').toString('base64'),
    '',
    `--${boundaryAlt}--`,
  ].join('\r\n');

  const attachmentParts = opts.attachments.map((attachment) => {
    const filename = encodeMimeWord(attachment.filename);
    const base64Content = attachment.content.toString('base64').replace(/(.{76})/g, '$1\r\n');
    return [
      '',
      `--${boundaryMixed}`,
      `Content-Type: ${attachment.contentType}; name="${filename}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${filename}"`,
      '',
      base64Content,
    ].join('\r\n');
  }).join('');

  return [headers, '', alternativePart, attachmentParts, `--${boundaryMixed}--`, ''].join('\r\n');
}

export async function sendRawEmail(opts: {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: EmailAttachment[];
}) {
  const rawMessage = buildRawMimeEmail({
    from: opts.from || SES_FROM_EMAIL,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    attachments: opts.attachments || [],
  });

  await getSesClient().send(new SendRawEmailCommand({
    Source: SES_FROM_EMAIL,
    Destinations: [opts.to],
    RawMessage: { Data: Buffer.from(rawMessage, 'utf-8') },
  }));
}

export type AttachmentReadResult =
  | { ok: true; attachment: EmailAttachment }
  | { ok: false; error: string };

export async function readEmailAttachment(file: File): Promise<AttachmentReadResult> {
  const extension = getFileExtension(file.name);
  if (!ALLOWED_ATTACHMENT_EXTENSIONS.includes(extension)) {
    return { ok: false, error: `"${file.name}" has an unsupported file type.` };
  }
  if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
    return { ok: false, error: `"${file.name}" is too large (max 10MB).` };
  }

  const arrayBuffer = await file.arrayBuffer();
  return {
    ok: true,
    attachment: {
      filename: file.name,
      contentType: file.type || ATTACHMENT_CONTENT_TYPES[extension] || 'application/octet-stream',
      content: Buffer.from(arrayBuffer),
    },
  };
}
