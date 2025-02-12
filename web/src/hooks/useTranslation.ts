import { useTranslation as useI18nTranslation } from "react-i18next";

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();

  const isRTL = i18n.language === "ar";

  return {
    t,
    isRTL,
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
} 