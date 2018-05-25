export default function deepCopy<T>(toCopy: T): T {
  if (!toCopy) {
    return toCopy;
  }

  const copied = Array.isArray(toCopy) ? [] : {};
  for (const field of Object.keys(toCopy)) {
    const value = toCopy[field];
    copied[field] = (typeof value === 'object') ? deepCopy(value) : value;
  }
  return <T>copied;
}