import { decimalToHex, sanitizeAlpha } from "../helpers";
import { Alpha, RGBValue } from "../interfaces";

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
function rgbToHex(
  red: RGBValue,
  green: RGBValue,
  blue: RGBValue,
  alpha?: Alpha
): string {
  const hexR = decimalToHex(red);
  const hexG = decimalToHex(green);
  const hexB = decimalToHex(blue);
  const hexA = decimalToHex(Math.round(sanitizeAlpha(alpha) * 255));

  if (alpha && hexA !== "FF") return `#${hexR}${hexG}${hexB}${hexA}`;
  return `#${hexR}${hexG}${hexB}`;
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
function rgbToHsl(
  red: RGBValue,
  green: RGBValue,
  blue: RGBValue,
  alpha?: Alpha
): { h: number; s: number; l: number; a?: number } {
  const normalize = (value: number) => value / 255;
  const norm = {
    red: normalize(red),
    green: normalize(green),
    blue: normalize(blue),
  };

  const max = Math.max(norm.red, norm.green, norm.blue);
  const min = Math.min(norm.red, norm.green, norm.blue);
  const luminance = (max + min) / 2;
  let saturation = 0;

  if (max !== min) {
    saturation =
      luminance > 0.5
        ? (max - min) / (2 - max - min)
        : (max - min) / (max + min);
  }

  const hue =
    max === norm.red
      ? ((norm.green - norm.blue) / (max - min) +
          (norm.green < norm.blue ? 6 : 0)) *
        60
      : max === norm.green
      ? ((norm.blue - norm.red) / (max - min) + 2) * 60
      : ((norm.red - norm.green) / (max - min) + 4) * 60;

  const a = sanitizeAlpha(alpha);
  if (a && a !== 1)
    return {
      h: Math.round(hue),
      s: Math.round(saturation * 100),
      l: Math.round(luminance * 100),
      a: a,
    };

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(luminance * 100),
  };
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
function rgbToHsls(
  red: RGBValue,
  green: RGBValue,
  blue: RGBValue,
  alpha?: Alpha
): string {
  const { h, s, l, a } = rgbToHsl(red, green, blue, alpha);
  if (a !== 1) return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { rgbToHex, rgbToHsl, rgbToHsls };
