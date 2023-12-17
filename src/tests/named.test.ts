import {
  namedToHSL,
  namedToHSLs,
  namedToHex,
  namedToRGB,
  namedToRGBs,
} from "../colors/convert/named";

describe("Named Conversion", () => {
  it("Hex: String - 'Red'", () => {
    expect(namedToHex("Red")).toEqual("#FF0000");
  });
  it("Hex: String - 'Red' with alpha", () => {
    expect(namedToHex("Red", 83)).toEqual("#FF0000D4");
  });

  it("RGB: Object - 'Red'", () => {
    expect(namedToRGB("Red")).toEqual({ r: 255, g: 0, b: 0 });
  });
  it("RGB: Object - 'Red' with alpha", () => {
    expect(namedToRGB("Red", 83)).toEqual({ r: 255, g: 0, b: 0, a: 0.83 });
  });
  it("RGB: String - 'Red'", () => {
    expect(namedToRGBs("Red")).toEqual("rgb(255, 0, 0)");
  });
  it("RGB: Object - 'Red' with alpha", () => {
    expect(namedToRGBs("Red", 83)).toEqual("rgba(255, 0, 0, 0.83)");
  });

  it("HSL: Object - 'Red'", () => {
    expect(namedToHSL("Red")).toEqual({ h: 0, s: 100, l: 50 });
  });
  it("HSL: Object - 'Red' with alpha", () => {
    expect(namedToHSL("Red", 83)).toEqual({ h: 0, s: 100, l: 50, a: 0.83 });
  });
  it("HSL: String - 'Red'", () => {
    expect(namedToHSLs("Red")).toEqual("hsl(0, 100%, 50%)");
  });
  it("HSL: String - 'Red' with alpha", () => {
    expect(namedToHSLs("Red", 83)).toEqual("hsla(0, 100%, 50%, 0.83)");
  });
});
