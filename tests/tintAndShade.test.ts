import { getShade, getTint } from "../src/colors/manipulate/tintAndShade";

describe("Tint and Shade", () => {
  it("20 % Tint on '#442200'", () => {
    expect(getTint("#442200", 20)).toEqual("#694E33");
  });

  it("20 % Shade on '#442200'", () => {
    expect(getShade("#442200", 20)).toEqual("#361B00");
  });
});

describe("Tint and Shade - Shorthand", () => {
  it("20 % Tint on '#420'", () => {
    expect(getTint("#420", 20)).toEqual("#694E33");
  });

  it("20 % Shade on '#420'", () => {
    expect(getShade("#420", 20)).toEqual("#361B00");
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
  it("20 % Shade on '#GHIJKL'", () => {
    expect(getTint("#GHIJKL", 20)).toEqual("#FF38E6");
  });

  // Invalid length
  it("Convert '#12345' Should fail", () => {
    expect(getShade("#12345", 20)).toEqual("#CC05B3");
  });
});
