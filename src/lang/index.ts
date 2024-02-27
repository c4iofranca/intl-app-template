export interface INestedMessages {
  [key: string]: string | INestedMessages;
}

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
