import "./App.css";
import { useIntlContext } from "./context/IntlContext";
import { LANGUAGES } from "./lang";

function App() {
  const { translate, language: currentLanguage, switchLocale } = useIntlContext();

  return (
    <div>
      <h1>internalization</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {LANGUAGES.map((language) => (
          <img
            src={language.flag}
            width={40}
            height={25}
            style={
              (language.code as string) === currentLanguage
                ? { border: "2px solid white" }
                : { cursor: "pointer" }
            }
            onClick={() => switchLocale(language.code)}
          />
        ))}
      </div>

      <div className="card">
        <p>{translate("app.greetings")}</p>
        <p>{translate('app.message')}</p>
      </div>
    </div>
  );
}

export default App;
