export default function errorHandler(error, _req, res, next) {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' });
  }
  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'The uploaded PDF must be 8 MB or smaller.' });
  }

  console.error('Unhandled API error.');
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
}
