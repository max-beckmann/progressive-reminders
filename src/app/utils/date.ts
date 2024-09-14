export function isTodayOrDue(date: Date) {
  const today = new Date();
  const isToday = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
  const isDue = date.getTime() < new Date().getTime();

  return isToday || isDue;
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
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`
  }
}
