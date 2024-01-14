import { hexToHSL, hexToHSLs, hexToRGB, hexToRGBs } from "./convert/hex";
import { rgbToHex, rgbToHsl, rgbToHsls } from "./convert/rgb";
import { hslToHex, hslToRGB, hslToRGBs } from "./convert/hsl";
import {
  namedToHSL,
  namedToHSLs,
  namedToHex,
  namedToRGB,
  namedToRGBs,
} from "./convert/named";
import {
  Alpha,
  Hue,
  Lightness,
  NamedColor,
  RGBValue,
  Saturation,
} from "./interfaces";
import { getMetaTheme } from "./utils";
import { sanitizeHex } from "./helpers";

/**
 * The Colors class provides a set of utility functions for color conversions and management.
 * It allows for converting between color formats (HEX, RGB, HSL, and Named.)
 * and handles color transformations with an optional fallback color.
 */
class Colors {
  /**
   * Creates an instance of the Colors class.
   *
   * @param {string} fallbackColor - A default HEX color to be used when input color is invalid.
   */
  constructor(public fallbackColor: string) {
    this.fallbackColor = sanitizeHex(fallbackColor);
  }

  /**
   * Retrieves the meta theme color from the document's meta tags.
   * This is useful for aligning color themes across web content.
   *
   * @returns {string | undefined} The HEX color code of the meta theme, if available.
   */
  metaTheme(): string | undefined {
    return getMetaTheme();
  }

  /**
   * Converts a hex color code to its RGB representation, with an optional alpha value.
   *
   * This function sanitizes the hex code and alpha value, then converts
   * the sanitized hex code into RGB values. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {string} hex - The hex color code to be converted.
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {{ r: number; g: number; b: number; a?: number }} An object containing the RGB (and optionally alpha) components.
   *
   * @example
   * hexToRGB('#FF5733', 80); // Outputs { r: 255, g: 87, b: 51, a: 0.8 }
   * hexToRGB('#FF5733');     // Outputs { r: 255, g: 87, b: 51 }
   */
  hexToRGB(
    hex: string,
    alpha?: Alpha
  ): { r: number; g: number; b: number; a?: number } {
    return hexToRGB(hex, alpha, this.fallbackColor);
  }

  /**
   * Converts a hex color code to a string in the 'rgb' or 'rgba' format, with an optional alpha value.
   *
   * This function utilizes hexToRGB to convert the hex code to RGB, and then formats
   * the result into a CSS-compatible string. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {string} hex - The hex color code to be converted.
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {string} A string in the format 'rgb(...)' or 'rgba(...)'.
   *
   * @example
   * hexToRGBs('#FF5733');     // Outputs 'rgb(255, 87, 51)'
   * hexToRGBs('#FF5733', 80); // Outputs 'rgba(255, 87, 51, 0.8)'
   */
  hexToRGBs(hex: string, alpha?: Alpha): string {
    return hexToRGBs(hex, alpha, this.fallbackColor);
  }

  /**
   * Converts a hex color code to its HSL representation, with an optional alpha value.
   *
   * This function sanitizes the hex code and alpha value, then converts the sanitized
   * hex code into HSL values. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {string} hex - The hex color code to be converted.
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {{ h: number; s: number; l: number; a?: number }} An object containing the HSL (and optionally alpha) components.
   *
   * @example
   * hexToHSL('#00FF00');     // Outputs { h: 120, s: 100, l: 50 }
   * hexToHSL('#00FF00', 50); // Outputs { h: 120, s: 100, l: 50, a: 0.5 }
   */
  hexToHSL(
    hex: string,
    alpha?: Alpha
  ): { h: number; s: number; l: number; a?: number } {
    return hexToHSL(hex, alpha, this.fallbackColor);
  }

  /**
   * Converts a hex color code to a string in the 'hsl' or 'hsla' format, with an optional alpha value.
   *
   * This function utilizes hexToHSL() to convert the hex code to HSL, and then formats
   * the result into a CSS-compatible string. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {string} hex - The hex color code to be converted.
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {string} The HSL(A) color code.
   *
   * @example
   * hexToHSLs('#00FF00');     // Outputs 'hsl(120, 100%, 50%)'
   * hexToHSLs('#00FF00', 50); // Outputs 'hsla(120, 100%, 50%, 0.5)'
   */
  hexToHSLs(hex: string, alpha?: Alpha): string {
    return hexToHSLs(hex, alpha, this.fallbackColor);
  }

  /**
   * Converts RGB values to a hexadecimal color code, with an optional alpha value.
   *
   * Result formated into a CSS-compatible string
   * If an alpha (transparency) value is provided, it is included in the return object.
   *
   * @param {number} red - The red component of the color (0-255).
   * @param {number} green - The green component of the color (0-255).
   * @param {number} blue - The blue component of the color (0-255).
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {string} The hexadecimal color code.
   *
   * @example
   * rgbToHex(255, 87, 51);     // Outputs '#FF5733'
   * rgbToHex(255, 87, 51, 80); // Outputs '#FF5733CC'
   */
  rgbToHex(
    red: RGBValue,
    green: RGBValue,
    blue: RGBValue,
    alpha?: Alpha
  ): string {
    return rgbToHex(red, green, blue, alpha);
  }

  /**
   * Converts RGB values to an HSL representation, with an optional alpha value.
   *
   * If an alpha (transparency) value is provided, it is included in the return object.
   *
   * @param {number} red - The red component of the color (0-255).
   * @param {number} green - The green component of the color (0-255).
   * @param {number} blue - The blue component of the color (0-255).
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {{ h: number; s: number; l: number; a?: number }} An object containing the HSL (and optionally alpha) components.
   *
   * @example
   * rgbToHsl(255, 87, 51);     // Outputs { h: 14, s: 100, l: 60 }
   * rgbToHsl(255, 87, 51, 80); // Outputs { h: 14, s: 100, l: 60, a: 0.8 }
   */
  rgbToHsl(
    red: RGBValue,
    green: RGBValue,
    blue: RGBValue,
    alpha?: Alpha
  ): { h: number; s: number; l: number; a?: number } {
    return rgbToHsl(red, green, blue, alpha);
  }

  /**
   * Converts RGB values to a string in the 'hsl' or 'hsla' format, with an optional alpha value.
   *
   * Utilizes rgbToHsl to convert RGB values to HSL, and then formats the result into a
   * CSS-compatible string. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {number} red - The red component of the color (0-255).
   * @param {number} green - The green component of the color (0-255).
   * @param {number} blue - The blue component of the color (0-255).
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {string} The HSL(A) color code.
   *
   * @example
   * rgbToHsls(255, 87, 51);     // Outputs 'hsl(14, 100%, 60%)'
   * rgbToHsls(255, 87, 51, 80); // Outputs 'hsla(14, 100%, 60%, 0.8)'
   */
  rgbToHsls(
    red: RGBValue,
    green: RGBValue,
    blue: RGBValue,
    alpha?: Alpha
  ): string {
    return rgbToHsls(red, green, blue, alpha);
  }

  /**
   * Converts HSL (Hue, Saturation, Lightness) values to an RGB representation, with an optional alpha value.
   *
   * If an alpha (transparency) value is provided, it is included in the return object.
   *
   * @param {Hue} hue - The hue component of the color (0-360 degrees).
   * @param {Saturation} saturation - The saturation component of the color (0-100%).
   * @param {Lightness} lightness - The lightness component of the color (0-100%).
   * @param {Alpha} [alpha] - The optional alpha value (0-100) to be included (optional).
   * @returns {{ r: number; g: number; b: number; a?: number }} An object containing the RGB (and optionally alpha) components.
   *
   * @example
   * hslToRGB(120, 100, 50);     // Outputs { r: 0, g: 255, b: 0 }
   * hslToRGB(120, 100, 50, 80); // Outputs { r: 0, g: 255, b: 0, a: 0.8 }
   */
  hslToRGB(
    hue: Hue,
    saturation: Saturation,
    lightness: Lightness,
    alpha?: Alpha
  ): { r: number; g: number; b: number; a?: number } {
    return hslToRGB(hue, saturation, lightness, alpha);
  }

  /**
   * Converts HSL values to a string in the 'rgb' or 'rgba' format, with an optional alpha value.
   *
   * Utilizes hslToRGB() to convert HSL values to RGB, and then formats the result into a
   * CSS-compatible string. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {Hue} hue - The hue component of the color (0-360 degrees).
   * @param {Saturation} saturation - The saturation component of the color (0-100%).
   * @param {Lightness} lightness - The lightness component of the color (0-100%).
   * @param {Alpha} [alpha] - The optional alpha value (0-100) to be included (optional).
   * @returns {string} The RGB(A) color code.
   *
   * @example
   * hslToRGBs(120, 100, 50);     // Outputs 'rgb(0, 255, 0)'
   * hslToRGBs(120, 100, 50, 80); // Outputs 'rgba(0, 255, 0, 0.8)'
   */
  hslToRGBs(
    hue: Hue,
    saturation: Saturation,
    lightness: Lightness,
    alpha?: Alpha
  ): string {
    return hslToRGBs(hue, saturation, lightness, alpha);
  }

  /**
   * Converts HSL values to a hexadecimal color code, with an optional alpha value.
   *
   * Utilizes hslToRGB() to convert HSL values to RGB, and then formats the restult to Hex with
   * rgbToHex() into a CSS-compatible string. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {Hue} hue - The hue component of the color (0-360 degrees).
   * @param {Saturation} saturation - The saturation component of the color (0-100%).
   * @param {Lightness} lightness - The lightness component of the color (0-100%).
   * @param {Alpha} [alpha] - The optional alpha value (0-100) to be included (optional).
   * @returns {string} The hexadecimal color code.
   *
   * @example
   * hslToHex(120, 100, 50);     // Outputs the hex code with the equivalent HSL values
   * hslToHex(120, 100, 50, 80); // Outputs the hex code with the equivalent HSL and alpha values
   */
  hslToHex(
    hue: Hue,
    saturation: Saturation,
    lightness: Lightness,
    alpha?: Alpha
  ): string {
    return hslToHex(hue, saturation, lightness, alpha);
  }

  /**
   *
   * Converts a named color to its hexadecimal representation, with an optional alpha value.
   * If an alpha (transparency) value is provided, it is included in the return object.
   *
   * @param {NamedColor} color - The named color to be converted.
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {string} The hexadecimal color code.
   *
   * @example
   * namedToHex('red', 50); // Outputs '#FF000080'
   * namedToHex('blue');    // Outputs '#0000FF'
   */
  namedToHex(color: NamedColor, alpha?: Alpha): string {
    return namedToHex(color, alpha);
  }

  /**
   * Converts a named color to its RGB representation, with an optional alpha value.
   *
   * This function converts a named color to its hexadecimal equivalent using namedToHex,
   * If an alpha (transparency) value is provided, it is included in the return object.
   *
   * @param {NamedColor} color - The named color to be converted.
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {{ r: number; g: number; b: number; a?: number }} An object containing the RGB (and optionally alpha) components.
   *
   * @example
   * namedToRGB('blue', 50); // Outputs { r: 0, g: 0, b: 255, a: 0.5 }
   * namedToRGB('red');      // Outputs { r: 255, g: 0, b: 0 }
   */
  namedToRGB(
    color: NamedColor,
    alpha?: Alpha
  ): { r: number; g: number; b: number; a?: number } {
    return namedToRGB(color, alpha);
  }

  /**
   * Converts a named color to a string in the 'rgb' or 'rgba' format, with an optional alpha value.
   *
   * This function utilizes namedToRGB to convert the named color to RGB, and then formats
   * the result into a CSS-compatible string. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {NamedColor} color - The named color to be converted.
   * @param {Alpha} [alpha] - The optional alpha value (0-100).
   * @returns {string} The RGB(A) color code.
   *
   * @example
   * namedToRGBs('blue', 50); // Outputs 'rgba(0, 0, 255, 0.5)'
   * namedToRGBs('red');      // Outputs 'rgb(255, 0, 0)'
   */
  namedToRGBs(color: NamedColor, alpha?: Alpha): string {
    return namedToRGBs(color, alpha);
  }

  /**
   * Converts a named color to its HSL representation, with an optional alpha value.
   *
   * This function converts a named color to its hexadecimal equivalent using namedToHex,
   * and then to its HSL representation. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {NamedColor} color - The named color to be converted.
   * @param {Alpha} [alpha] - The optional alpha value (0-100).
   * @returns {{ h: number; s: number; l: number; a?: number }} An object containing the HSL components.
   *
   * @example
   * namedToHSL('blue', 50); // Outputs { h: 240, s: 100, l: 50, a: 0.5 }
   * namedToHSL('red');      // Outputs { h: 0, s: 100, l: 50 }
   */
  namedToHSL(
    color: NamedColor,
    alpha?: Alpha
  ): { h: number; s: number; l: number; a?: number } {
    return namedToHSL(color, alpha);
  }

  /**
   * Converts a named color to a string in the 'hsl' or 'hsla' format, with an optional alpha value.
   *
   * This function utilizes namedToHSL() to convert the named color to HSL, and then formats
   * the result into a CSS-compatible string. If an alpha (transparency) value is provided,
   * it is included in the return object.
   *
   * @param {NamedColor} color - The named color to be converted.
   * @param {number} [alpha] - The optional alpha value (0-100).
   * @returns {string} The HSL(A) color code.
   *
   * @example
   * namedToHSLs('blue', 50); // Outputs 'hsla(240, 100%, 50%, 0.5)'
   * namedToHSLs('red');      // Outputs 'hsl(0, 100%, 50%)'
   */
  namedToHSLs(color: NamedColor, alpha?: Alpha): string {
    return namedToHSLs(color, alpha);
  }

  /**
   * Sanitizes a hexadecimal color code.
   *
   * Removes any leading hash character and converts short-hand hex codes (3 digits) to
   * full-length (6 digits) by duplicating each digit. If the hex code is invalid, a default
   * hex code is returned.
   *
   * @param {string} hex - The hex color code to be sanitized.
   * @returns The sanitized hex color code.
   *
   */
  sanitizeHex(hex: string): string {
    return sanitizeHex(hex);
  }
}

export { Colors };
