export interface UploadResult {
  url: string;
  name: string;
}

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_TOTAL_SIZE = 100 * 1024 * 1024;
const MIN_IMAGES = 2;
const MAX_IMAGES = 10;

/**
 * Validate uploaded files against type, size, and count constraints.
 */
export function validateFiles(
  files: File[]
): { valid: File[]; errors: string[] } {
  const errors: string[] = [];
  const valid: File[] = [];

  let totalSize = 0;

  for (const file of files) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      errors.push(
        `"${file.name}" has an unsupported file type. Accepted: JPG, JPEG, PNG, WEBP.`
      );
      continue;
    }
    totalSize += file.size;
    valid.push(file);
  }

  if (valid.length > MAX_IMAGES) {
    errors.push(`Maximum ${MAX_IMAGES} images allowed.`);
  }

  if (totalSize > MAX_TOTAL_SIZE) {
    errors.push("Total upload size exceeds 100 MB.");
  }

  return { valid, errors };
}

export function getUploadConstraints() {
  return { minImages: MIN_IMAGES, maxImages: MAX_IMAGES, maxTotalSize: MAX_TOTAL_SIZE };
}

/**
 * Upload images to storage.
 * Currently returns local object URLs for preview.
 *
 * TODO: Connect to Cloudinary or AWS S3:
 * 1. Import the SDK (cloudinary or @aws-sdk/client-s3)
 * 2. Upload each file to the service
 * 3. Return the permanent URLs
 */
export async function uploadImages(files: File[]): Promise<UploadResult[]> {
  return files.map((file) => ({
    url: URL.createObjectURL(file),
    name: file.name,
  }));
}

/**
 * Convert files to base64 data URLs for API transmission.
 * Temporary approach until Cloudinary/S3 is integrated.
 */
export async function filesToBase64(files: File[]): Promise<string[]> {
  const promises = files.map(
    (file) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
  );
  return Promise.all(promises);
}
