import { messages } from "../lang"
import useLocale from "./useLocale"

const useTranslate = () => {
    const { getMessagesByLanguage, getCurrentLanguage } = useLocale()
    function isTranslationInCache(lang: string): boolean {
        const intlCacheName = `intl-${lang.toUpperCase()}`

        return (
            window.localStorage.getItem(intlCacheName) !== null &&
            window.localStorage.getItem(intlCacheName) !== '0'
        )
    }

    function getMessages(lang: string) {
        const intlCacheName = `intl-${lang.toUpperCase()}`
        
        if (isTranslationInCache(lang)) {
            return JSON.parse(window.localStorage.getItem(intlCacheName)!)
        }

        const nestedMessages = getMessagesByLanguage(lang)
        window.localStorage.setItem(intlCacheName, JSON.stringify(nestedMessages))

        return messages(nestedMessages)
    }

    function translate(key: string) {
        const language = getCurrentLanguage()

        if (isTranslationInCache(language)) {
            const intlCacheName = `intl-${language.toUpperCase()}`
            const dict = JSON.parse(window.localStorage.getItem(intlCacheName)!)
            const value = key.split('.').reduce((k, v) => k && k[v], dict)

            return value != null && value != "" ? value : key 
        } else {
            return key 
        }
    }

    return { getMessages, translate }
}

export default useTranslate