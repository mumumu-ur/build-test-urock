import i18next from "i18next";
import ko from "/locales/ko/translation.json";
import en from "/locales/en/translation.json";
import DOMPurify from 'dompurify';

function getCurrentLocale() {
  const lang = localStorage.getItem("lang");
  if (lang) return lang;
  if (window.location.pathname.startsWith("/en/")) return "en";
  return "ko";
}

i18next
  .init({
    lng: getCurrentLocale(),
    fallbackLng: "ko",
    resources: {
      ko: { translation: ko },
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    updatePageContent();
    setupLanguageSwitcher();
  });

export function setLocale(locale) {
  localStorage.setItem("lang", locale);
  i18next.changeLanguage(locale).then(() => {
    updatePageContent();
  });
}

export function t(key) {
  return i18next.t(key);
}

function updatePageContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const raw = t(key);
    el.innerHTML = DOMPurify.sanitize(raw);
  });
}

function setupLanguageSwitcher() {
  document.querySelectorAll(".language-option").forEach((option) => {
    option.addEventListener("click", (e) => {
      e.preventDefault();
      const locale = option.dataset.lang;
      setLocale(locale);
    });
  });
}

window.t = t;
window.setLocale = setLocale;
