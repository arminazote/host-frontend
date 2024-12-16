import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next";
i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "en",
        resources: {
            en: {
                translation: {
                    greeting: "Hello, Welcome!"
                }
            },
            hi: {
                translation: {
                    greeting: "नमस्ते, स्वागत है!"
                }
            },
            bn: {
                translation: {
                    greeting: "হ্যালো, স্বাগতম!"
                }
            }
        }
    })