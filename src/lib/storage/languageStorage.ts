import type { LanguageCode } from '../i18n/dictionaries';
import { LANGUAGE_STORAGE_KEY } from './keys';

function isLanguageCode(value: unknown): value is LanguageCode {
  return value === 'en' || value === 'ar';
}

export function loadLanguage(): LanguageCode | null {
  try {
    const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguageCode(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function saveLanguage(language: LanguageCode): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded) — persistence is best-effort
  }
}
