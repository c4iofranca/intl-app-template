import "./App.css";
import { useIntlContext } from "./context/IntlContext";

function App() {
  const { translate } = useIntlContext()

  return (
    <div>
      <h1>internalization</h1>
      <div className="card">
        <p>{translate('app.greetings')}</p>
      </div>
    </div>
  );
}

export default App;
