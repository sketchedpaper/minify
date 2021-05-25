export const isValidUrl = (url) => {
  if (url.startsWith("http")) {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  }
  return false;
};
