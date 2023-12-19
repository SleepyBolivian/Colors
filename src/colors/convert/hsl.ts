import { hueToRGB, sanitizeAlpha } from "../helpers";
import { Alpha, Hue, Lightness, RGBValue, Saturation } from "../interfaces";
import { rgbToHex } from "./rgb";

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
function hslToRGB(
  hue: Hue,
  saturation: Saturation,
  lightness: Lightness,
  alpha?: Alpha
): { r: number; g: number; b: number; a?: number } {
  const a = sanitizeAlpha(alpha);

  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRGB(p, q, h + 1 / 3);
    g = hueToRGB(p, q, h);
    b = hueToRGB(p, q, h - 1 / 3);
  }

  if (a !== 1) {
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: a,
    };
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
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
function hslToRGBs(
  hue: Hue,
  saturation: Saturation,
  lightness: Lightness,
  alpha?: Alpha
): string {
  const { r, g, b, a } = hslToRGB(hue, saturation, lightness, alpha);
  if (a && a !== 1) return `rgba(${r}, ${g}, ${b}, ${a})`;
  return `rgb(${r}, ${g}, ${b})`;
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
function hslToHex(
  hue: Hue,
  saturation: Saturation,
  lightness: Lightness,
  alpha?: Alpha
): string {
  const { r, g, b } = hslToRGB(hue, saturation, lightness);
  return rgbToHex(r as RGBValue, g as RGBValue, b as RGBValue, alpha);
}

export { hslToHex, hslToRGB, hslToRGBs };
