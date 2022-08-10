export function isJson(str: string): boolean {
  try {
    const parsed = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
