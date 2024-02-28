import en from '../lang/en.json'
import fr from '../lang/fr.json'
import de from '../lang/de.json'
import zh from '../lang/zh.json'
import pt from '../lang/pt.json'
import es from '../lang/es.json'
import { INestedMessages } from '../lang'

export type Language = 'pt' | 'en' | 'de' | 'fr' | 'zh' | 'es' | undefined

const useLocale = () => {
    const DEFAULT_LANGUAGE = 'en'
    function getMessagesByLanguage(lang: string): INestedMessages {
        const messages: Record<string, INestedMessages> = {
            en: en,
            fr: fr,
            de: de,
            zh: zh,
            pt: pt,
            es: es
        }

        return messages[lang]
    }

    function getCurrentLanguage() {
        const intlCurrentLanguage = 'intl-current-language'
        const currentLanguage = window.localStorage.getItem(intlCurrentLanguage)

        if (currentLanguage !== null) {
            return currentLanguage
        }

        window.localStorage.setItem(intlCurrentLanguage, DEFAULT_LANGUAGE)
        return DEFAULT_LANGUAGE
    }

    function switchLanguage(newLanguage: string) {
        const intlCurrentLanguage = 'intl-current-language'
        window.localStorage.setItem(intlCurrentLanguage, newLanguage)

        return newLanguage
    }

    return { getMessagesByLanguage, getCurrentLanguage, switchLanguage }
}

export default useLocale