// utils/urlUtils.ts
export const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with '-'
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing '-'
  };
  