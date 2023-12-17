import { rgbToHex, rgbToHsl } from "../src/colors/convert/rgb";

describe("RGB to Hex", () => {
  it("Convert (68, 34, 0) to '#442200'", () => {
    expect(rgbToHex(68, 34, 0)).toEqual("#442200");
  });

  it("Convert (68, 34, 0, 83) to '#442200D4'", () => {
    expect(rgbToHex(68, 34, 0, 83)).toEqual("#442200D4");
  });
});

describe("RGB to HSL", () => {
  it("Convert (68, 34, 0) to { h: 30, s: 100, l: 13 }", () => {
    expect(rgbToHsl(68, 34, 0)).toEqual({ h: 30, s: 100, l: 13 });
  });

  it("Convert (68, 34, 0, 83) to { h: 30, s: 100, l: 13, a: 83 }", () => {
    expect(rgbToHsl(68, 34, 0, 83)).toEqual({
      h: 30,
      s: 100,
      l: 13,
      a: 0.83,
    });
  });
});
