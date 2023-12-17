import { hexToRGB, hexToRGBs } from "../src/colors/convert/hex";

describe("OBJ - Hex to RGB", () => {
  it("Convert '#442200' to { r: 68, g: 34, b: 0 }", () => {
    expect(hexToRGB("#442200")).toEqual({ r: 68, g: 34, b: 0 });
  });
});

describe("OBJ - Hex to RGBA", () => {
  it("Convert '#442200' to { r: 68, g: 34, b: 0, a: 0.83}", () => {
    expect(hexToRGB("#442200", 83)).toEqual({ r: 68, g: 34, b: 0, a: 0.83 });
  });
});

describe("OBJ - Hex Shorthand to RGB", () => {
  it("Convert '#420' to { r: 68, g: 34, b: 0 }", () => {
    expect(hexToRGB("#420")).toEqual({ r: 68, g: 34, b: 0 });
  });
});

describe("OBJ - Hex Shorthand to RGBA", () => {
  it("Convert (#420, 83) to { r: 68, g: 34, b: 0, a: 0.83}", () => {
    expect(hexToRGB("#420", 83)).toEqual({ r: 68, g: 34, b: 0, a: 0.83 });
  });
});

describe("String - Hex to RGB", () => {
  it("Convert '#442200' to rgba(68, 34, 0)", () => {
    expect(hexToRGBs("#442200")).toEqual("rgb(68, 34, 0)");
  });
});

describe("String - Hex to RGBA", () => {
  it("Convert (#442200, 83) to rgba(68, 34, 0, 0.83)", () => {
    expect(hexToRGBs("#442200", 83)).toEqual("rgba(68, 34, 0, 0.83)");
  });
});

describe("String - Hex Shorthand to RGB", () => {
  it("Convert '#420' to rgb(68, 34, 0)", () => {
    expect(hexToRGBs("#420")).toEqual("rgb(68, 34, 0)");
  });
});

describe("String - Hex Shorthand to RGBA", () => {
  it("Convert (#420, 83) to rgba(68, 34, 0, 0.83)", () => {
    expect(hexToRGBs("#420", 83)).toEqual("rgba(68, 34, 0, 0.83)");
  });
});

// Error Checking
describe("OBJ - Fail - Hex to RGB", () => {
  let ogConsoleError: any;

  beforeAll(() => {
    ogConsoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = ogConsoleError;
  });
  // Values outside 0-9 or A-F range
  it("Convert '#GHIJKL' Should return as default color", () => {
    expect(hexToRGB("#GHIJKL")).toEqual({ r: 255, g: 6, b: 224 });
  });

  // TODO: Add setting to allow for filling in missing values
  // Invalid length
  it("Convert '#12345' Should fail", () => {
    expect(hexToRGB("#12345")).toEqual({ r: 255, g: 6, b: 224 });
  });

  // Invalid length and values outside 0-9 or A-F range
  it("Convert '#12345G' Should fail", () => {
    expect(hexToRGB("#12345G")).toEqual({ r: 255, g: 6, b: 224 });
  });

  // Invalid length with opacity
  it("Convert (#F6, 83) Should fail", () => {
    expect(hexToRGB("#F6", 83)).toEqual({ r: 255, g: 6, b: 224, a: 0.83 });
  });
});
