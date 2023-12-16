import { decimalToHex, sanitizeAlpha } from "../helpers";
import { hexToHSL, hexToRGB } from "./hex";
import { Alpha } from "../interfaces";
import { NamedColor, NamedValues } from "../named.colors";

function namedToHex(color: NamedColor, alpha?: Alpha): string {
  const named = NamedValues[color];

  const a = sanitizeAlpha(alpha);
  const hexA = decimalToHex(Math.round(a * 255));

  if (alpha && hexA !== "FF") return `${named}${hexA}`;
  return named;
}

function namedToRGB(color: NamedColor, alpha?: Alpha) {
  const named = NamedValues[color];
  const a = sanitizeAlpha(alpha);
  if (a !== 1) return { ...hexToRGB(named), a };

  return { ...hexToRGB(named) };
}

function namedToRGBs(color: NamedColor, alpha?: Alpha): string {
  const named = namedToRGB(color, alpha);
  if (named.a && named.a !== 1)
    return `rgba(${named.r}, ${named.g}, ${named.b}, ${named.a})`;
  return `rgb(${named.r}, ${named.g}, ${named.b})`;
}

function namedToHSL(color: NamedColor, alpha?: Alpha) {
  const named = NamedValues[color];
  const a = sanitizeAlpha(alpha);
  if (a !== 1) return { ...hexToHSL(named), a };
  return { ...hexToHSL(named) };
}

function namedToHSLs(color: NamedColor, alpha?: Alpha): string {
  const named = namedToHSL(color, alpha);
  if (named.a && named.a !== 1)
    return `hsla(${named.h}, ${named.s}%, ${named.l}%, ${named.a})`;
  return `hsl(${named.h}, ${named.s}%, ${named.l}%)`;
}

export { namedToHex, namedToRGB, namedToRGBs, namedToHSL, namedToHSLs };
