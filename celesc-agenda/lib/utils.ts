export function isDiaUtil(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function adicionarDiasUteis(date: Date, days: number): Date {
  let result = new Date(date);
  let count = 0;
  while (count < days) {
    result.setDate(result.getDate() + 1);
    if (isDiaUtil(result)) count++;
  }
  return result;
}

export function diferencaDiasUteis(start: Date, end: Date): number {
  let count = 0;
  const date = new Date(start);
  while (date < end) {
    if (isDiaUtil(date)) count++;
    date.setDate(date.getDate() + 1);
  }
  return count;
}
