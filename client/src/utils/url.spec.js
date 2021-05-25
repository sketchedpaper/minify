import { isValidUrl } from "./url";

describe("url validator", () => {
  it("returns true if valid url", () => {
    expect(isValidUrl("sadfdsaf.com")).toEqual(false);
    expect(isValidUrl("https;//")).toEqual(false);
    expect(isValidUrl("http//")).toEqual(false);
    expect(isValidUrl("http://google.com")).toEqual(true);
    expect(isValidUrl("https://google.com")).toEqual(true);
  });
});
