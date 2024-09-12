import {
  format,
  formatISO,
  parse,
  parseISO,
  parseJSON,
  startOfToday,
} from "date-fns";

export const parseDay = (dayStr: string, format: string = "yyyyMMdd"): Date => {
  return parse(dayStr, format, startOfToday());
};

export const parseDate = (
  dayStr: string,
  format: string = "yyyyMMddHHmm"
): Date => {
  return parse(dayStr, format, new Date());
};

export const parseDateIso = (dateStr: string): Date => {
  return parseISO(dateStr);
};

export const parseDateJson = (dateJson: string): Date => {
  return parseJSON(dateJson);
};

export const formatDay = (
  day: string | Date,
  formatTo: string = "yyyy/MM/dd"
): string => {
  return format(day, formatTo);
};

export const formatIsoDay = (day: string | Date): string => {
  return formatISO(day, { representation: "date" });
};

export const formatDate = (
  date: string | Date,
  formatTo: string = "yyyy/MM/dd HH:mm"
): string => {
  return format(date, formatTo);
};

export const formatIsoDate = (date: string | Date): string => {
  return formatISO(date);
};
