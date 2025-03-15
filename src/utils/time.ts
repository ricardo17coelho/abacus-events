export function isStartEndCurrentTime(time_start: string, time_end: string) {
  if (!time_start || !time_end) return;
  const dt = new Date();

  const s = time_start.split(':');
  const dt1 = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    parseInt(s[0]),
    parseInt(s[1]),
  );

  const e = time_end.split(':');
  const dt2 = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    parseInt(e[0]),
    parseInt(e[1]),
  );

  return dt >= dt1 && dt <= dt2;
}

export function isEndTimeGreaterThenStartTime(
  time_start: string,
  time_end: string,
) {
  if (!time_start || !time_end) return;
  const dt = new Date();

  const s = time_start.split(':');
  const dt1 = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    parseInt(s[0]),
    parseInt(s[1]),
  );

  const e = time_end.split(':');
  const dt2 = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    parseInt(e[0]),
    parseInt(e[1]),
  );

  return dt1 <= dt2;
}
