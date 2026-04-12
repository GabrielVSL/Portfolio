import { createContext, useState, useContext } from 'react';

// Cria a "Nuvem"
const LanguageContext = createContext();

// O Provedor que vai abraçar o seu App
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt');

  const toggleLang = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Um Hook customizado para você usar facilmente em qualquer arquivo
export const useLanguage = () => useContext(LanguageContext);