import {
  hexToHSLValues,
  hexToRGBValues,
  sanitizeAlpha,
  sanitizeHex,
} from "../helpers";
import { Alpha } from "../interfaces";

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
function hexToRGB(
  hex: string,
  alpha?: Alpha
): { r: number; g: number; b: number; a?: number } {
  const sanitizedHex = sanitizeHex(hex);
  const a = sanitizeAlpha(alpha);
  const { r, g, b } = hexToRGBValues(sanitizedHex);
  if (alpha && a !== 1) return { r, g, b, a };
  return { r, g, b };
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
function hexToRGBs(hex: string, alpha?: Alpha): string {
  const { r, g, b, a } = hexToRGB(hex, alpha);
  if (alpha && a !== 1) return `rgba(${r}, ${g}, ${b}, ${a})`;
  return `rgb(${r}, ${g}, ${b})`;
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
function hexToHSL(
  hex: string,
  alpha?: Alpha
): { h: number; s: number; l: number; a?: number } {
  const sanitizedHex = sanitizeHex(hex);
  const a = sanitizeAlpha(alpha);
  const { h, s, l } = hexToHSLValues(sanitizedHex);
  if (alpha && a !== 1) return { h, s, l, a };
  return { h, s, l };
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
function hexToHSLs(hex: string, alpha?: Alpha): string {
  const { h, s, l, a } = hexToHSL(hex, alpha);
  if (alpha && a !== 1) return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { hexToRGB, hexToRGBs, hexToHSL, hexToHSLs };
