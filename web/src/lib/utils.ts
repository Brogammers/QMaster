import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(utcTimestamp: string): string {
  try {
    // Parse the UTC timestamp
    const date = parseISO(utcTimestamp)

    // Format the date to relative time
    return formatDistanceToNow(date, { addSuffix: true })
  } catch (error) {
    console.error('Error formatting timestamp:', error)
    return 'Invalid date'
  }
}
