import { hexToRGB } from "../convert/hex";
import { rgbToHex } from "../convert/rgb";
import { Alpha, Blue, Green, Red } from "../interfaces";

function getTint(hex: string, tint: number, alpha?: Alpha): string {
  const { r, g, b, a } = hexToRGB(hex, alpha);
  const tinted = [r, g, b].map((c) => Math.round(c + ((255 - c) * tint) / 100));

  if (a && a !== 1) {
    return `rgba(${tinted[0]}, ${tinted[1]}, ${tinted[2]}, ${a})`;
  }

  return rgbToHex(tinted[0] as Red, tinted[1] as Green, tinted[2] as Blue);
}

function getShade(hex: string, shade: number, alpha?: Alpha): string {
  const { r, g, b, a } = hexToRGB(hex, alpha);
  const shaded = [r, g, b].map((c) => Math.round((c * (100 - shade)) / 100));

  if (a && a !== 1) {
    return `rgba(${shaded[0]}, ${shaded[1]}, ${shaded[2]}, ${a})`;
  }

  return rgbToHex(shaded[0] as Red, shaded[1] as Green, shaded[2] as Blue);
}

export { getTint, getShade };
