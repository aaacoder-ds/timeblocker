type Task = { title: string; minutes: number };

function formatDateToICS(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function generateIcsCalendar({
  tasks,
  start,
  timezone,
  titlePrefix
}: {
  tasks: Task[];
  start: Date;
  timezone: string;
  titlePrefix: string;
}): string {
  // Convert start from local TZ to UTC snapshot
  const localStart = new Date(start);
  const events: string[] = [];

  let cursor = new Date(localStart);
  for (let i = 0; i < tasks.length; i += 1) {
    const { title, minutes } = tasks[i];
    const eventStart = new Date(cursor);
    const eventEnd = addMinutes(eventStart, minutes);

    const uid = `${eventStart.getTime()}-${i}@timeblocker.aaacoder.xyz`;
    const dtstamp = formatDateToICS(new Date());
    const dtstart = formatDateToICS(eventStart);
    const dtend = formatDateToICS(eventEnd);

    const summary = `${titlePrefix ? `${titlePrefix}: ` : ''}${title}`.replace(/\n/g, ' ');

    events.push(
      [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART:${dtstart}`,
        `DTEND:${dtend}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:Timeboxed via Timeblocker (${timezone})`,
        'END:VEVENT'
      ].join('\n')
    );
    cursor = eventEnd;
  }

  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Timeblocker//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR'
  ].join('\n');

  return calendar;
}

