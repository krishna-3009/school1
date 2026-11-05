export function atlasUri() {
  const uri = process.env.MONGODB_URI?.trim();
  const username = encodeURIComponent(process.env.MONGODB_USERNAME || '');
  const password = encodeURIComponent(process.env.MONGODB_PASSWORD || '');

  if (!uri) throw new Error('MONGODB_URI is missing');

  return uri
    .replaceAll('<username>', username)
    .replaceAll('<password>', password)
    .replaceAll('<db_username>', username)
    .replaceAll('<db_password>', password)
    .replaceAll('${MONGODB_USERNAME}', username)
    .replaceAll('${MONGODB_PASSWORD}', password);
}
