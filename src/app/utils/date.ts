export function isToday(date: Date) {
  const today = new Date();

  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

export function transformToDate(date: string, time?: string): Date {
  const [year, month, day] = date.split('-').map(Number);

  if (time) {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  return new Date(year, month - 1, day);

}

export function transformToStrings(date: Date): {
  date: string,
  time: string
} {
  return {
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    time: `${date.getHours()}:${date.getMinutes()}`
  }
}
