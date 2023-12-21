import { hslToHex, hslToRGB, hslToRGBs } from "../colors/convert/hsl";

describe("HSL Conversion", () => {
  it("RGB: Object", () => {
    expect(hslToRGB(30, 100, 13)).toEqual({ r: 66, g: 33, b: 0 });
  });

  it("RGB: String", () => {
    expect(hslToRGBs(30, 100, 13)).toEqual("rgb(66, 33, 0)");
  });

  it("Hex: String", () => {
    expect(hslToHex(30, 100, 13)).toEqual("#422100");
  });

  it("RGB: Object - w/Alpha", () => {
    expect(hslToRGB(30, 100, 13, 83)).toEqual({ r: 66, g: 33, b: 0, a: 0.83 });
  });

  it("RGB: String - w/Alpha", () => {
    expect(hslToRGBs(30, 100, 13, 83)).toEqual("rgba(66, 33, 0, 0.83)");
  });

  it("Hex: String - w/Alpha", () => {
    expect(hslToHex(30, 100, 13, 83)).toEqual("#422100D4");
  });
});
