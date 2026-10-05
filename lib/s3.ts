import { S3Client, PutObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// designpovindia.com/* is the S3 prefix CloudFront (NEXT_PUBLIC_CDN_URL) serves from.
const S3_PREFIX = "designpovindia.com";

let _client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!_client) {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error("Missing AWS S3 environment variables (AWS_REGION / AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY).");
    }
    _client = new S3Client({
      region,
      credentials: { accessKeyId: accessKeyId.trim(), secretAccessKey: secretAccessKey.trim() },
    });
  }
  return _client;
}

let _presignClient: S3Client | null = null;

// Separate client for presigned uploads. Recent AWS SDK versions add a
// default CRC32 checksum to every PutObject; in a presigned URL that's the
// checksum of an *empty* body (x-amz-checksum-crc32=AAAAAA==), so S3 rejects
// the real file. "WHEN_REQUIRED" leaves the checksum out.
function getPresignClient(): S3Client {
  if (!_presignClient) {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error("Missing AWS S3 environment variables (AWS_REGION / AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY).");
    }
    _presignClient = new S3Client({
      region,
      credentials: { accessKeyId: accessKeyId.trim(), secretAccessKey: secretAccessKey.trim() },
      requestChecksumCalculation: "WHEN_REQUIRED",
    });
  }
  return _presignClient;
}

export interface S3UploadResult {
  /** Path relative to the CDN base, e.g. "/gallery/2027/artists/foo-abc123.jpg" */
  path: string;
  /** Full CloudFront URL, ready to store and render directly. */
  url: string;
}

/**
 * Uploads a file buffer to the shared totality-solutions S3 bucket under the
 * designpovindia.com/ prefix, and returns the CloudFront URL for it.
 */
export async function uploadBufferToS3(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<S3UploadResult> {
  const bucket = process.env.AWS_BUCKET_NAME?.trim();
  if (!bucket) throw new Error("Missing AWS_BUCKET_NAME environment variable.");

  const normalizedKey = key.startsWith("/") ? key.slice(1) : key;
  const fullKey = `${S3_PREFIX}/${normalizedKey}`;

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: fullKey,
      Body: buffer,
      ContentType: contentType,
    })
  );

  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL || `https://d1qlyda1dsr5ui.cloudfront.net/${S3_PREFIX}`;
  const path = `/${normalizedKey}`;

  return { path, url: `${cdnBase}${path}` };
}

/**
 * Creates a short-lived URL the browser can PUT a file to directly, so large
 * files (videos) skip the 4.5 MB request-body limit of our own API routes.
 * ContentType and ContentLength are part of the signature: S3 rejects the
 * upload if the browser sends a different type or size, which is what
 * enforces the size limit checked by the caller.
 *
 * Requires a CORS rule on the bucket allowing PUT from the site's origins.
 */
export async function createPresignedUpload(
  key: string,
  contentType: string,
  contentLength: number
): Promise<S3UploadResult & { uploadUrl: string }> {
  const bucket = process.env.AWS_BUCKET_NAME?.trim();
  if (!bucket) throw new Error("Missing AWS_BUCKET_NAME environment variable.");

  const normalizedKey = key.startsWith("/") ? key.slice(1) : key;
  const uploadUrl = await getSignedUrl(
    getPresignClient(),
    new PutObjectCommand({
      Bucket: bucket,
      Key: `${S3_PREFIX}/${normalizedKey}`,
      ContentType: contentType,
      ContentLength: contentLength,
    }),
    { expiresIn: 60 * 10 }
  );

  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL || `https://d1qlyda1dsr5ui.cloudfront.net/${S3_PREFIX}`;
  const path = `/${normalizedKey}`;
  return { uploadUrl, path, url: `${cdnBase}${path}` };
}

/**
 * Resolves a stored image value (either a bare "/path" or a full CloudFront URL)
 * back to its S3 object key, or null if it's not one of ours (external URL, empty, etc).
 */
export function resolveS3KeyFromCdnValue(value: string | null | undefined): string | null {
  if (!value) return null;
  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL || `https://d1qlyda1dsr5ui.cloudfront.net/${S3_PREFIX}`;

  let relativePath: string;
  if (value.startsWith("http")) {
    if (!value.startsWith(cdnBase)) return null;
    relativePath = value.slice(cdnBase.length);
  } else {
    relativePath = value;
  }

  const normalized = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  if (!normalized) return null;
  return `${S3_PREFIX}/${normalized}`;
}

/** Batch-deletes up to 1000 S3 objects by key. Missing/invalid keys are ignored. */
export async function deleteObjectsFromS3(keys: string[]): Promise<void> {
  const bucket = process.env.AWS_BUCKET_NAME?.trim();
  const uniqueKeys = Array.from(new Set(keys.filter(Boolean)));
  if (!bucket || uniqueKeys.length === 0) return;

  await getS3Client().send(
    new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: { Objects: uniqueKeys.map((Key) => ({ Key })) },
    })
  );
}
