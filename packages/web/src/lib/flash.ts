export let messages: Record<string, string> = {};

export const flash = {
  set(k: string, v: string) {
    messages[k] = v;
  },
  get(k: string) {
    if (k in messages) {
      let message = messages[k];
      messages[k] = "";
      return message;
    }
  },
};
