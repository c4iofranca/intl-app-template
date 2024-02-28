/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import useLocale, { Language } from "../hooks/useLocale";
import useTranslate from "../hooks/useTranslate";
import { INestedMessages } from "../lang";

interface IIntlContext {
  language: Language;
  messages: INestedMessages;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translate: (key: string) => any
  switchLocale: (newLanguage: string) => void
}

interface IIntlProviderProps {
    children: React.ReactNode;
}

const IntlContext = createContext<IIntlContext | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IntlProvider({ children }: IIntlProviderProps) {
  const [language, setLanguage] = useState<Language>();
  const [messages, setMessages] = useState<INestedMessages>({});

  const { getMessages, translate } = useTranslate();
  const { getCurrentLanguage, switchLanguage } = useLocale();

  const loadCurrentLanguage = () => {
    const currentLanguage = getCurrentLanguage();

    setLanguage(currentLanguage as Language);
  }

  const switchLocale = (newLanguage: string) => {
    switchLanguage(newLanguage)
    loadCurrentLanguage()
  }

  useEffect(() => {
    loadCurrentLanguage()
  }, []);

  useEffect(() => {
    if (!language) return;

    const dict = getMessages(language);
    setMessages(dict);
  }, [language]);

  return (
    <IntlContext.Provider value={{ language, messages, translate, switchLocale }}>
      {children}
    </IntlContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useIntlContext(): IIntlContext {
    const context = useContext(IntlContext)

    if (!context) {
        throw new Error('Error loading messages')
    }

    return context
}

export default IntlProvider;
