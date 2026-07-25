import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Splits a stat string like "340+", "+30", or "94%" into its parts for CountUp. */
export function parseStatValue(value: string) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/)
  if (!match) return { prefix: '', number: 0, suffix: value }
  const [, prefix, number, suffix] = match
  return { prefix, number: parseInt(number, 10), suffix }
}
