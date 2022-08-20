import crypto from 'crypto';

export function generateUniqueKey(bytes = 16) {
  return crypto.randomBytes(bytes).toString('hex');
}
