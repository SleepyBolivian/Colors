import { Alpha, NamedColor, NamedValues } from "../interfaces";
import { decimalToHex, sanitizeAlpha } from "../helpers";
import { hexToHSL, hexToRGB } from "./hex";

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
function namedToHex(color: NamedColor, alpha?: Alpha): string {
  const named = NamedValues[color];

  const a = sanitizeAlpha(alpha);
  const hexA = decimalToHex(Math.round(a * 255));

  if (alpha && hexA !== "FF") return `${named}${hexA}`;
  return named;
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
function namedToRGB(
  color: NamedColor,
  alpha?: Alpha
): { r: number; g: number; b: number; a?: number } {
  const named = NamedValues[color];
  const a = sanitizeAlpha(alpha);
  if (a !== 1) return { ...hexToRGB(named), a };

  return { ...hexToRGB(named) };
}

/**
 * Converts a named color to a string in the 'rgb' or 'rgba' format, with an optional alpha value.
 *
 * This function utilizes namedToRGB to convert the named color to RGB, and then formats
 * the result into a CSS-compatible string. If an alpha (transparency) value is provided,
 * it is included in the return object.
 *
 * @param {NamedColor} color - The named color to be converted.
 * @param {number} [alpha] - The optional alpha value (0-100).
 * @returns {string} The RGB(A) color code.
 *
 * @example
 * namedToRGBs('blue', 50); // Outputs 'rgba(0, 0, 255, 0.5)'
 * namedToRGBs('red');      // Outputs 'rgb(255, 0, 0)'
 */
function namedToRGBs(color: NamedColor, alpha?: Alpha): string {
  const named = namedToRGB(color, alpha);
  if (named.a && named.a !== 1)
    return `rgba(${named.r}, ${named.g}, ${named.b}, ${named.a})`;
  return `rgb(${named.r}, ${named.g}, ${named.b})`;
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
function namedToHSL(
  color: NamedColor,
  alpha?: Alpha
): { h: number; s: number; l: number; a?: number } {
  const named = NamedValues[color];
  const a = sanitizeAlpha(alpha);
  if (a !== 1) return { ...hexToHSL(named), a };
  return { ...hexToHSL(named) };
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
function namedToHSLs(color: NamedColor, alpha?: Alpha): string {
  const named = namedToHSL(color, alpha);
  if (named.a && named.a !== 1)
    return `hsla(${named.h}, ${named.s}%, ${named.l}%, ${named.a})`;
  return `hsl(${named.h}, ${named.s}%, ${named.l}%)`;
}

export { namedToHex, namedToRGB, namedToRGBs, namedToHSL, namedToHSLs };
