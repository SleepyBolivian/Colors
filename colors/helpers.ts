import { Alpha } from "./interfaces";

/**
 * Converts a decimal value to a hexadecimal string.
 *
 * Given a decimal number, this function converts it to its hexadecimal representation.
 * The resulting string is in uppercase and is padded with a leading zero if it's a single digit.
 *
 * @param {number} value - The decimal number to be converted.
 * @returns {string} The hexadecimal representation of the input number, in uppercase.
 *
 * @example
 * decimalToHex(15);  // Outputs '0F'
 * decimalToHex(255); // Outputs 'FF'
 */
function decimalToHex(value: number): string {
  const hexValue = value.toString(16).toUpperCase();
  return hexValue.length === 1 ? `0${hexValue}` : hexValue;
}

/**
 * Sanitizes the alpha value.
 *
 * Converts an alpha value from a 0-100 range to a 0-1 range. If no alpha value is provided,
 * a default value of 1 is returned.
 *
 * @param {Alpha} alpha - The alpha value to be sanitized (optional).
 * @returns {number} The sanitized alpha value.
 *
 * @example
 * sanitizeAlpha(50); // Outputs 0.5
 * sanitizeAlpha();   // Outputs 1
 *
 */
function sanitizeAlpha(alpha?: Alpha): number {
  if (alpha) {
    return alpha / 100;
  }
  return 1;
}

/**
 * Sanitizes a hexadecimal color code.
 *
 * Removes any leading hash character and converts short-hand hex codes (3 digits) to
 * full-length (6 digits) by duplicating each digit. If the hex code is invalid, a default
 * hex code is returned.
 *
 * @param {string} hex - The hex color code to be sanitized.
 * @param {string} fallbackColor - The fallback color to be used if the hex code is invalid.
 * @returns The sanitized hex color code.
 *
 */
function sanitizeHex(hex: string, fallbackColor?: string) {
  let sanitizedHex = hex.trim().replace(/^#/, "");

  if (sanitizedHex.length === 3) {
    sanitizedHex = sanitizedHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (!/^[0-9A-F]{6}$/i.test(sanitizedHex)) {
    console.error("@sleepybolivian/colors", `Invalid Hex Value: ${hex}.`);
    return fallbackColor ?? "FF06E0";
  }

  return sanitizedHex;
}

/**
 * Converts a hex color code to its RGB components.
 *
 * Takes a hex color code and splits it into its red, green, and blue components,
 *
 * @param {string} hex - The hex color code to be converted.
 * @returns An object containing the RGB components.
 *
 * @example
 * hexToRGBValues('FF5733'); // Outputs { r: 255, g: 87, b: 51 }
 */
function hexToRGBValues(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b };
}

/**
 * Converts a hex color code to its HSL components.
 *
 * Processes a hex color code and calculates its hue, saturation, and lightness components,
 * returning an object with these values. The hue is in degrees (0-360), while saturation
 * and lightness are in percentages (0-100%).
 *
 * @param {string} hex - The hex color code to be converted.
 * @returns An object containing the HSL components.
 *
 * @example
 * hexToHSLValues('00FF00'); // Outputs { h: 120, s: 100, l: 50 }
 */
function hexToHSLValues(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = (max + min) / 2;
  let s = h;
  let l = h;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);
  h = Math.round(h * 360);

  return { h, s, l };
}

/**
 * Converts a hue to an RGB value.
 *
 * The function takes three parameters, p, q, and t, which are used in the calculation
 * to convert a hue value (part of the HSL color model) into an RGB color model value.
 * It uses specific conditions to handle different ranges of the input hue value.
 *
 * @param {number} p - The first input value, calculated from lightness and saturation.
 * @param {number} q - The second input value, calculated from lightness and saturation.
 * @param {number} t - The hue value, normalized between 0 and 1.
 * @returns {number} The calculated RGB value based on the provided hue.
 */
function hueToRGB(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export {
  decimalToHex,
  sanitizeHex,
  sanitizeAlpha,
  hexToRGBValues,
  hexToHSLValues,
  hueToRGB,
};
