import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function generateExcerpt(content: string, maxLength = 160): string {
  const plainText = content.replace(/<[^>]+>/g, '');
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return `${plainText.slice(0, maxLength)}…`;
}

export function readingTime(content: string): string {
  const wpm = 225;
  const words = content.trim().replace(/<[^>]+>/g, '').split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return `${time} min read`;
}