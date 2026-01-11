import * as CONSTANTS from "./constants";
import * as Carbon from "./index";

export const padStart = (str: string | number, length: number, pad: string): string =>
    String(str).padStart(length, pad);

export const padZoneStr = (minutesOffset: number): string => {
    const absMinutes = Math.abs(minutesOffset);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    const sign = minutesOffset <= 0 ? "+" : "-";

    return `${sign}${padStart(hours, 2, "0")}:${padStart(minutes, 2, "0")}`;
};

const UNIT_MAP: Record<string, string> = {
    y: CONSTANTS.YEAR,
    M: CONSTANTS.MONTH,
    w: CONSTANTS.WEEK,
    d: CONSTANTS.DAY,
    h: CONSTANTS.HOUR,
    m: CONSTANTS.MINUTE,
    s: CONSTANTS.SECOND,
    ms: CONSTANTS.MILLISECOND,
};

export const prettyUnit = (unit: string = ""): string =>
    UNIT_MAP[unit] ?? unit.toLowerCase().replace(/s$/, "");

export const monthDiff = (a: any, b: any): number => {
    const wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month());
    const anchor = a.add(wholeMonthDiff, "months").valueOf();
    const isBBeforeAnchor = (b.valueOf() - anchor) < 0;
    const anchorNext = a.add(wholeMonthDiff + (isBBeforeAnchor ? -1 : 1), "months").valueOf();
    const fractionalDiff = (b.valueOf() - anchor) / Math.abs(anchor - anchorNext);

    return -(wholeMonthDiff + fractionalDiff);
};

export const getShort = (arr: string[] | undefined, index: number, full: string[], length: number): string =>
    arr?.[index] ?? full[index].substring(0, length);

export const findShortIndex = (arr: string[] | undefined, short: string, full: string[]): number => {
    const index = arr?.indexOf(short) ?? -1;
    return index !== -1 ? index : full.findIndex((f) => f.startsWith(short));
};

export const absFloor = (num: number): number => (num < 0 ? Math.ceil(num) : Math.floor(num)) || 0;

// @ts-ignore
export const newDate = (...args: any[]): Date => new Date(...args);