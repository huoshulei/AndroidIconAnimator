import {default as tinycolor} from 'tinycolor2';

export const ColorUtil = {
  parseAndroidColor(val) {
    val = (val || '').replace(/^\s*#?|\s*$/g, '');
    let dict = {r: 0, g: 0, b: 0, a: 255};

    if (val.length == 3) {
      dict.r = parseInt(val.substring(0, 1), 16) * 17;
      dict.g = parseInt(val.substring(1, 2), 16) * 17;
      dict.b = parseInt(val.substring(2, 3), 16) * 17;
    } else if (val.length == 4) {
      dict.a = parseInt(val.substring(0, 1), 16) * 17;
      dict.r = parseInt(val.substring(1, 2), 16) * 17;
      dict.g = parseInt(val.substring(2, 3), 16) * 17;
      dict.b = parseInt(val.substring(3, 4), 16) * 17;
    } else if (val.length == 6) {
      dict.r = parseInt(val.substring(0, 2), 16);
      dict.g = parseInt(val.substring(2, 4), 16);
      dict.b = parseInt(val.substring(4, 6), 16);
    } else if (val.length == 8) {
      dict.a = parseInt(val.substring(0, 2), 16);
      dict.r = parseInt(val.substring(2, 4), 16);
      dict.g = parseInt(val.substring(4, 6), 16);
      dict.b = parseInt(val.substring(6, 8), 16);
    }

    return dict;
  },

  toAndroidString(dict) {
    let str = '#';
    if (dict.a != 255) {
      str += ((dict.a < 16) ? '0' : '') + dict.a.toString(16);
    }

    str += ((dict.r < 16) ? '0' : '') + dict.r.toString(16)
        + ((dict.g < 16) ? '0' : '') + dict.g.toString(16)
        + ((dict.b < 16) ? '0' : '') + dict.b.toString(16);
    return str;
  },

  svgToAndroidColor(color, opacity) {
    if (color == 'none') {
      return null;
    }

    color = tinycolor(color);
    if (opacity) {
      color.setAlpha(opacity);
    }

    return color.toHex8String();
  },

  androidToCssColor(androidColor, multAlpha) {
    multAlpha = (multAlpha === undefined) ? 1 : multAlpha;
    if (!androidColor) {
      return 'transparent';
    }

    let d = ColorUtil.parseAndroidColor(androidColor);
    return `rgba(${d.r},${d.g},${d.b},${(d.a * multAlpha / 255).toFixed(2)})`;
  }
};