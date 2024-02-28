import br from "../flags/br.png";
import cn from "../flags/cn.png";
import de from "../flags/de.png";
import es from "../flags/es.png";
import fr from "../flags/fr.png";
import us from "../flags/us.png";

export interface INestedMessages {
  [key: string]: string | INestedMessages;
}

export const LANGUAGES = [
  { name: "english", flag: us, code: "en" },
  { name: "portuguese", flag: br, code: "pt" },
  { name: "dutch", flag: de, code: "de" },
  { name: "spanish", flag: es, code: "es" },
  { name: "french", flag: fr, code: "fr" },
  { name: "chinese", flag: cn, code: "zh" },
];

export const messages = (
  nestedMessages: INestedMessages
): Record<string, string> => {
  return Object.keys(nestedMessages).reduce(
    (dict: Record<string, string>, key) => {
      const value = nestedMessages[key];

      if (typeof value === "string") {
        dict[key] = value;
      } else {
        Object.assign(dict, messages(value));
      }

      return dict;
    },
    {}
  );
};
