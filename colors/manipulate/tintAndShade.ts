import { hexToRGB } from "../convert/hex";
import { rgbToHex } from "../convert/rgb";
import { Alpha, RGBValue, Shade, Tint } from "../interfaces";

/**
 * Generates a tinted version of a hex color code, with an optional alpha value.
 *
 * This function first converts the hex color to its RGB representation. It then calculates
 * the tinted color by increasing the RGB values towards white by a specified percentage.
 * If an alpha (transparency) value is provided, it is included in the return object.
 *
 * Calculations provided by: https://maketintsandshades.com/about
 *
 * @param {string} hex - The hex color code to be tinted.
 * @param {number} tint - The tint percentage (0-100).
 * @param {number} [alpha] - The optional alpha value (0-100).
 * @returns {string} A tinted color in hex or rgba format.
 *
 * @example
 * getTint('#442200', 20);     // Outputs '#694E33
 * getTint('#442200', 20, 83); // Outputs 'rgba(105, 78, 51, 0.83)'
 */
function getTint(hex: string, tint: Tint, alpha?: Alpha): string {
  const { r, g, b, a } = hexToRGB(hex, alpha);
  const tinted = [r, g, b].map((c) => Math.round(c + ((255 - c) * tint) / 100));

  if (a && a !== 1) {
    return `rgba(${tinted[0]}, ${tinted[1]}, ${tinted[2]}, ${a})`;
  }

  return rgbToHex(
    tinted[0] as RGBValue,
    tinted[1] as RGBValue,
    tinted[2] as RGBValue
  );
}

/**
 * Generates a shaded version of a hex color code, with an optional alpha value.
 *
 * This function first converts the hex color to its RGB representation. It then calculates
 * the shaded color by decreasing the RGB values towards black by a specified percentage.
 * If an alpha (transparency) value is provided, it is included in the return object.
 *
 * Calculations provided by: https://maketintsandshades.com/about
 *
 * @param {string} hex - The hex color code to be shaded.
 * @param {number} shade - The shade percentage (0-100).
 * @param {number} [alpha] - The optional alpha value (0-100).
 * @returns {string} A shaded color in hex or rgba format.
 *
 * @example
 * getShade('#442200', 20);    // Outputs '#361b00'
 * getShade('#442200', 20, 83); // Outputs 'rgba(68, 34, 0, 0.83)'
 */
function getShade(hex: string, shade: Shade, alpha?: Alpha): string {
  const { r, g, b, a } = hexToRGB(hex, alpha);
  const shaded = [r, g, b].map((c) => Math.round((c * (100 - shade)) / 100));

  if (a && a !== 1) {
    return `rgba(${shaded[0]}, ${shaded[1]}, ${shaded[2]}, ${a})`;
  }

  return rgbToHex(
    shaded[0] as RGBValue,
    shaded[1] as RGBValue,
    shaded[2] as RGBValue
  );
}

export { getTint, getShade };
