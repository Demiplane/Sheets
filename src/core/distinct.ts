export function distinct<T>(array: T[]) {
  let temp: T[] = [];

  for (const candidate of array) {
    if (temp.filter(item => item === candidate).length === 0) {
      temp = temp.concat(candidate);
    }
  }

  return temp;
}