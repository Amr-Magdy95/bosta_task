import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationArabic from './Translation/Arabic/translation.json';
import translationEnglish from './Translation/English/translation.json';

const resources = {
    Ar: {
        translation: translationArabic
    },
    En:{
        translation: translationEnglish
    }

}

i18next.use(initReactI18next)
.init({
    resources,
    lng: "en"
})

export default i18next;