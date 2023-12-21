var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// colors/helpers.ts
function decimalToHex(value) {
  const hexValue = value.toString(16).toUpperCase();
  return hexValue.length === 1 ? `0${hexValue}` : hexValue;
}
function sanitizeAlpha(alpha) {
  if (alpha) {
    return alpha / 100;
  }
  return 1;
}
function sanitizeHex(hex) {
  let sanitizedHex = hex.trim().replace(/^#/, "");
  if (sanitizedHex.length === 3) {
    sanitizedHex = sanitizedHex.split("").map((char) => char + char).join("");
  }
  if (!/^[0-9A-F]{6}$/i.test(sanitizedHex)) {
    console.error("@sleepybolivian/colors", `Invalid Hex Value: ${hex}.`);
    return "FF06E0";
  }
  return sanitizedHex;
}
function hexToRGBValues(hex) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b };
}
function hexToHSLValues(hex) {
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
function hueToRGB(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

// colors/convert/hex.ts
function hexToRGB(hex, alpha) {
  const sanitizedHex = sanitizeHex(hex);
  const a = sanitizeAlpha(alpha);
  const { r, g, b } = hexToRGBValues(sanitizedHex);
  if (alpha && a !== 1)
    return { r, g, b, a };
  return { r, g, b };
}
function hexToRGBs(hex, alpha) {
  const { r, g, b, a } = hexToRGB(hex, alpha);
  if (alpha && a !== 1)
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  return `rgb(${r}, ${g}, ${b})`;
}
function hexToHSL(hex, alpha) {
  const sanitizedHex = sanitizeHex(hex);
  const a = sanitizeAlpha(alpha);
  const { h, s, l } = hexToHSLValues(sanitizedHex);
  if (alpha && a !== 1)
    return { h, s, l, a };
  return { h, s, l };
}
function hexToHSLs(hex, alpha) {
  const { h, s, l, a } = hexToHSL(hex, alpha);
  if (alpha && a !== 1)
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// colors/convert/rgb.ts
function rgbToHex(red, green, blue, alpha) {
  const hexR = decimalToHex(red);
  const hexG = decimalToHex(green);
  const hexB = decimalToHex(blue);
  const hexA = decimalToHex(Math.round(sanitizeAlpha(alpha) * 255));
  if (alpha && hexA !== "FF")
    return `#${hexR}${hexG}${hexB}${hexA}`;
  return `#${hexR}${hexG}${hexB}`;
}
function rgbToHsl(red, green, blue, alpha) {
  const normalize = (value) => value / 255;
  const norm = {
    red: normalize(red),
    green: normalize(green),
    blue: normalize(blue)
  };
  const max = Math.max(norm.red, norm.green, norm.blue);
  const min = Math.min(norm.red, norm.green, norm.blue);
  const luminance = (max + min) / 2;
  let saturation = 0;
  if (max !== min) {
    saturation = luminance > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  }
  const hue = max === norm.red ? ((norm.green - norm.blue) / (max - min) + (norm.green < norm.blue ? 6 : 0)) * 60 : max === norm.green ? ((norm.blue - norm.red) / (max - min) + 2) * 60 : ((norm.red - norm.green) / (max - min) + 4) * 60;
  const a = sanitizeAlpha(alpha);
  if (a && a !== 1)
    return {
      h: Math.round(hue),
      s: Math.round(saturation * 100),
      l: Math.round(luminance * 100),
      a
    };
  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(luminance * 100)
  };
}
function rgbToHsls(red, green, blue, alpha) {
  const { h, s, l, a } = rgbToHsl(red, green, blue, alpha);
  if (a !== 1)
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// colors/convert/hsl.ts
function hslToRGB(hue, saturation, lightness, alpha) {
  const a = sanitizeAlpha(alpha);
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
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
      a
    };
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
function hslToRGBs(hue, saturation, lightness, alpha) {
  const { r, g, b, a } = hslToRGB(hue, saturation, lightness, alpha);
  if (a && a !== 1)
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  return `rgb(${r}, ${g}, ${b})`;
}
function hslToHex(hue, saturation, lightness, alpha) {
  const { r, g, b } = hslToRGB(hue, saturation, lightness);
  return rgbToHex(r, g, b, alpha);
}

// colors/named.colors.ts
var NamedValues = /* @__PURE__ */ ((NamedValues2) => {
  NamedValues2["AliceBlue"] = "#F0F8FF";
  NamedValues2["AntiqueWhite"] = "#FAEBD7";
  NamedValues2["Aqua"] = "#00FFFF";
  NamedValues2["Aquamarine"] = "#7FFFD4";
  NamedValues2["Azure"] = "#F0FFFF";
  NamedValues2["Beige"] = "#F5F5DC";
  NamedValues2["Bisque"] = "#FFE4C4";
  NamedValues2["Black"] = "#000000";
  NamedValues2["BlanchedAlmond"] = "#FFEBCD";
  NamedValues2["Blue"] = "#0000FF";
  NamedValues2["BlueViolet"] = "#8A2BE2";
  NamedValues2["Brown"] = "#A52A2A";
  NamedValues2["BurlyWood"] = "#DEB887";
  NamedValues2["CadetBlue"] = "#5F9EA0";
  NamedValues2["Chartreuse"] = "#7FFF00";
  NamedValues2["Chocolate"] = "#D2691E";
  NamedValues2["Coral"] = "#FF7F50";
  NamedValues2["CornflowerBlue"] = "#6495ED";
  NamedValues2["Cornsilk"] = "#FFF8DC";
  NamedValues2["Crimson"] = "#DC143C";
  NamedValues2["Cyan"] = "#00FFFF";
  NamedValues2["DarkBlue"] = "#00008B";
  NamedValues2["DarkCyan"] = "#008B8B";
  NamedValues2["DarkGoldenRod"] = "#B8860B";
  NamedValues2["DarkGray"] = "#A9A9A9";
  NamedValues2["DarkGreen"] = "#006400";
  NamedValues2["DarkKhaki"] = "#BDB76B";
  NamedValues2["DarkMagenta"] = "#8B008B";
  NamedValues2["DarkOliveGreen"] = "#556B2F";
  NamedValues2["DarkOrange"] = "#FF8C00";
  NamedValues2["DarkOrchid"] = "#9932CC";
  NamedValues2["DarkRed"] = "#8B0000";
  NamedValues2["DarkSalmon"] = "#E9967A";
  NamedValues2["DarkSeaGreen"] = "#8FBC8F";
  NamedValues2["DarkSlateBlue"] = "#483D8B";
  NamedValues2["DarkSlateGray"] = "#2F4F4F";
  NamedValues2["DarkTurquoise"] = "#00CED1";
  NamedValues2["DarkViolet"] = "#9400D3";
  NamedValues2["DeepPink"] = "#FF1493";
  NamedValues2["DeepSkyBlue"] = "#00BFFF";
  NamedValues2["DimGray"] = "#696969";
  NamedValues2["DodgerBlue"] = "#1E90FF";
  NamedValues2["FireBrick"] = "#B22222";
  NamedValues2["FloralWhite"] = "#FFFAF0";
  NamedValues2["ForestGreen"] = "#228B22";
  NamedValues2["Fuchsia"] = "#FF00FF";
  NamedValues2["Gainsboro"] = "#DCDCDC";
  NamedValues2["GhostWhite"] = "#F8F8FF";
  NamedValues2["Gold"] = "#FFD700";
  NamedValues2["GoldenRod"] = "#DAA520";
  NamedValues2["Gray"] = "#808080";
  NamedValues2["Green"] = "#008000";
  NamedValues2["GreenYellow"] = "#ADFF2F";
  NamedValues2["HoneyDew"] = "#F0FFF0";
  NamedValues2["HotPink"] = "#FF69B4";
  NamedValues2["IndianRed"] = "#CD5C5C";
  NamedValues2["Indigo"] = "#4B0082";
  NamedValues2["Ivory"] = "#FFFFF0";
  NamedValues2["Khaki"] = "#F0E68C";
  NamedValues2["Lavender"] = "#E6E6FA";
  NamedValues2["LavenderBlush"] = "#FFF0F5";
  NamedValues2["LawnGreen"] = "#7CFC00";
  NamedValues2["LemonChiffon"] = "#FFFACD";
  NamedValues2["LightBlue"] = "#ADD8E6";
  NamedValues2["LightCoral"] = "#F08080";
  NamedValues2["LightCyan"] = "#E0FFFF";
  NamedValues2["LightGoldenRodYellow"] = "#FAFAD2";
  NamedValues2["LightGray"] = "#D3D3D3";
  NamedValues2["LightGreen"] = "#90EE90";
  NamedValues2["LightPink"] = "#FFB6C1";
  NamedValues2["LightSalmon"] = "#FFA07A";
  NamedValues2["LightSeaGreen"] = "#20B2AA";
  NamedValues2["LightSkyBlue"] = "#87CEFA";
  NamedValues2["LightSlateGray"] = "#778899";
  NamedValues2["LightSteelBlue"] = "#B0C4DE";
  NamedValues2["LightYellow"] = "#FFFFE0";
  NamedValues2["Lime"] = "#00FF00";
  NamedValues2["LimeGreen"] = "#32CD32";
  NamedValues2["Linen"] = "#FAF0E6";
  NamedValues2["Maroon"] = "#800000";
  NamedValues2["MediumAquaMarine"] = "#66CDAA";
  NamedValues2["MediumBlue"] = "#0000CD";
  NamedValues2["MediumOrchid"] = "#BA55D3";
  NamedValues2["MediumPurple"] = "#9370DB";
  NamedValues2["MediumSeaGreen"] = "#3CB371";
  NamedValues2["MediumSlateBlue"] = "#7B68EE";
  NamedValues2["MediumSpringGreen"] = "#00FA9A";
  NamedValues2["MediumTurquoise"] = "#48D1CC";
  NamedValues2["MediumVioletRed"] = "#C71585";
  NamedValues2["MidnightBlue"] = "#191970";
  NamedValues2["MintCream"] = "#F5FFFA";
  NamedValues2["MistyRose"] = "#FFE4E1";
  NamedValues2["Moccasin"] = "#FFE4B5";
  NamedValues2["NavajoWhite"] = "#FFDEAD";
  NamedValues2["Navy"] = "#000080";
  NamedValues2["OldLace"] = "#FDF5E6";
  NamedValues2["Olive"] = "#808000";
  NamedValues2["OliveDrab"] = "#6B8E23";
  NamedValues2["Orange"] = "#FFA500";
  NamedValues2["OrangeRed"] = "#FF4500";
  NamedValues2["Orchid"] = "#DA70D6";
  NamedValues2["PaleGoldenRod"] = "#EEE8AA";
  NamedValues2["PaleGreen"] = "#98FB98";
  NamedValues2["PaleTurquoise"] = "#AFEEEE";
  NamedValues2["PaleVioletRed"] = "#DB7093";
  NamedValues2["PapayaWhip"] = "#FFEFD5";
  NamedValues2["PeachPuff"] = "#FFDAB9";
  NamedValues2["Peru"] = "#CD853F";
  NamedValues2["Pink"] = "#FFC0CB";
  NamedValues2["Plum"] = "#DDA0DD";
  NamedValues2["PowderBlue"] = "#B0E0E6";
  NamedValues2["Purple"] = "#800080";
  NamedValues2["RebeccaPurple"] = "#663399";
  NamedValues2["Red"] = "#FF0000";
  NamedValues2["RosyBrown"] = "#BC8F8F";
  NamedValues2["RoyalBlue"] = "#4169E1";
  NamedValues2["SaddleBrown"] = "#8B4513";
  NamedValues2["Salmon"] = "#FA8072";
  NamedValues2["SandyBrown"] = "#F4A460";
  NamedValues2["SeaGreen"] = "#2E8B57";
  NamedValues2["SeaShell"] = "#FFF5EE";
  NamedValues2["Sienna"] = "#A0522D";
  NamedValues2["Silver"] = "#C0C0C0";
  NamedValues2["SkyBlue"] = "#87CEEB";
  NamedValues2["SlateBlue"] = "#6A5ACD";
  NamedValues2["SlateGray"] = "#708090";
  NamedValues2["Snow"] = "#FFFAFA";
  NamedValues2["SpringGreen"] = "#00FF7F";
  NamedValues2["SteelBlue"] = "#4682B4";
  NamedValues2["Tan"] = "#D2B48C";
  NamedValues2["Teal"] = "#008080";
  NamedValues2["Thistle"] = "#D8BFD8";
  NamedValues2["Tomato"] = "#FF6347";
  NamedValues2["Turquoise"] = "#40E0D0";
  NamedValues2["Violet"] = "#EE82EE";
  NamedValues2["Wheat"] = "#F5DEB3";
  NamedValues2["White"] = "#FFFFFF";
  NamedValues2["WhiteSmoke"] = "#F5F5F5";
  NamedValues2["Yellow"] = "#FFFF00";
  return NamedValues2;
})(NamedValues || {});

// colors/convert/named.ts
function namedToHex(color, alpha) {
  const named = NamedValues[color];
  const a = sanitizeAlpha(alpha);
  const hexA = decimalToHex(Math.round(a * 255));
  if (alpha && hexA !== "FF")
    return `${named}${hexA}`;
  return named;
}
function namedToRGB(color, alpha) {
  const named = NamedValues[color];
  const a = sanitizeAlpha(alpha);
  if (a !== 1)
    return __spreadProps(__spreadValues({}, hexToRGB(named)), { a });
  return __spreadValues({}, hexToRGB(named));
}
function namedToRGBs(color, alpha) {
  const named = namedToRGB(color, alpha);
  if (named.a && named.a !== 1)
    return `rgba(${named.r}, ${named.g}, ${named.b}, ${named.a})`;
  return `rgb(${named.r}, ${named.g}, ${named.b})`;
}
function namedToHSL(color, alpha) {
  const named = NamedValues[color];
  const a = sanitizeAlpha(alpha);
  if (a !== 1)
    return __spreadProps(__spreadValues({}, hexToHSL(named)), { a });
  return __spreadValues({}, hexToHSL(named));
}
function namedToHSLs(color, alpha) {
  const named = namedToHSL(color, alpha);
  if (named.a && named.a !== 1)
    return `hsla(${named.h}, ${named.s}%, ${named.l}%, ${named.a})`;
  return `hsl(${named.h}, ${named.s}%, ${named.l}%)`;
}

// colors/manipulate/tintAndShade.ts
function getTint(hex, tint, alpha) {
  const { r, g, b, a } = hexToRGB(hex, alpha);
  const tinted = [r, g, b].map((c) => Math.round(c + (255 - c) * tint / 100));
  if (a && a !== 1) {
    return `rgba(${tinted[0]}, ${tinted[1]}, ${tinted[2]}, ${a})`;
  }
  return rgbToHex(
    tinted[0],
    tinted[1],
    tinted[2]
  );
}
function getShade(hex, shade, alpha) {
  const { r, g, b, a } = hexToRGB(hex, alpha);
  const shaded = [r, g, b].map((c) => Math.round(c * (100 - shade) / 100));
  if (a && a !== 1) {
    return `rgba(${shaded[0]}, ${shaded[1]}, ${shaded[2]}, ${a})`;
  }
  return rgbToHex(
    shaded[0],
    shaded[1],
    shaded[2]
  );
}
export {
  getShade,
  getTint,
  hexToHSL,
  hexToHSLs,
  hexToRGB,
  hexToRGBs,
  hslToHex,
  hslToRGB,
  hslToRGBs,
  namedToHSL,
  namedToHSLs,
  namedToHex,
  namedToRGB,
  namedToRGBs,
  rgbToHex,
  rgbToHsl,
  rgbToHsls
};
