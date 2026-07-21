export type LanguageCode = 'en' | 'ar';

export interface Dictionary {
  navbar: {
    appName: string;
    languageLabel: string;
  };
}

export const dictionaries: Record<LanguageCode, Dictionary> = {
  en: {
    navbar: {
      appName: 'MUI Theme Customizer',
      languageLabel: 'Language',
    },
  },
  ar: {
    navbar: {
      appName: 'مخصص ثيمات MUI',
      languageLabel: 'اللغة',
    },
  },
};
