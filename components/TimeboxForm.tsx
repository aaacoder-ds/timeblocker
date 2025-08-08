"use client";

import { useMemo, useState } from 'react';
import { generateIcsCalendar } from '@/lib/ics';

type ParsedTask = { title: string; minutes: number };

function parseDurationToMinutes(text: string): number | null {
  const trimmed = text.trim().toLowerCase();
  if (!trimmed) return null;
  const regex = /(?:(\d+)\s*h)?\s*(?:(\d+)\s*m)?$/i;
  const match = trimmed.match(regex);
  if (match) {
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    if (hours === 0 && minutes === 0) return null;
    return hours * 60 + minutes;
  }
  const asNumber = Number(trimmed);
  if (!Number.isNaN(asNumber) && asNumber > 0) return asNumber; // minutes
  return null;
}

function parseTasks(input: string): ParsedTask[] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      // Accept: "Title - 30m" or "Title | 1h30m" or "Title, 45"
      const parts = line.split(/[-|,]/);
      const title = parts[0]?.trim() || 'Task';
      const durationText = parts[1]?.trim() || '';
      const minutes = parseDurationToMinutes(durationText);
      return minutes ? { title, minutes } : { title: line, minutes: 30 };
    });
}

export default function TimeboxForm() {
  const [tasksText, setTasksText] = useState<string>(
    ['Deep work - 90m', 'Emails - 20m', 'Standup - 15m', 'Code review - 45m'].join('\n')
  );
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState<string>('09:00');
  const [titlePrefix, setTitlePrefix] = useState<string>('Timeblock');
  const [timezone, setTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const parsedTasks = useMemo(() => parseTasks(tasksText), [tasksText]);

  function onDownloadIcs() {
    const startDateTime = new Date(`${date}T${startTime}:00`);
    const ics = generateIcsCalendar({
      tasks: parsedTasks,
      start: startDateTime,
      timezone,
      titlePrefix
    });
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timeblock-${date}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="panel">
      <div className="row">
        <label>
          Tasks and durations
          <textarea
            value={tasksText}
            onChange={(e) => setTasksText(e.target.value)}
            placeholder="Task A - 30m\nTask B | 1h\nTask C, 45"
          />
          <span className="muted">Formats: 30m, 1h, 1h30m, or minutes (e.g. 45)</span>
        </label>
        <div>
          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Start time
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
          <label>
            Timezone
            <input type="text" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
          </label>
          <label>
            Title prefix
            <input type="text" value={titlePrefix} onChange={(e) => setTitlePrefix(e.target.value)} />
          </label>
        </div>
      </div>

      <div className="actions" style={{ marginTop: '1rem' }}>
        <button className="primary" onClick={onDownloadIcs}>
          Download .ics
        </button>
      </div>
    </div>
  );
}

