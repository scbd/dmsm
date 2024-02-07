import { v2 } from '@google-cloud/translate';
import consola from 'consola';

export const unLocales =['ar', 'es', 'fr', 'ru', 'zh']
export const localesInUse = ["en","zh","ms","my","km","lo","fil","th","vi","ar","es","fr","ru","pt","bn","nl","de","dz","tn","it","am","id","ky","ko","mn","ne","ur","sr","ta","ss","sw"].filter((l)=> ![ "en","fil", "dz", "tn", "ss" ].includes(l));

const GT = new v2.Translate({ key: process.env.G_I18N_KEY });

export async function getSupportedLocales () {
  const gCodes = (await GT.getLanguages())[0].map(({ code }) => code);


  return getDrupalLangCodes().filter((c) => {
    return gCodes.includes(c);
  });
}

export async function getMissingServices () {
  const gCodes = (await GT.getLanguages())[0].map(({ code }) => code);


  return localesInUse.filter((c) => !gCodes.includes(c));
}

function getDrupalLangCodes () { return Object.keys(getLangsMap()); }

const getLangsMap = () => ({
  af: ['Afrikaans', 'Afrikaans'],
  am: ['Amharic', '\u12a0\u121b\u122d\u129b'],
  ar: ['Arabic', '\u0627\u0644\u0639\u0631\u0628\u064a\u0629', 'rtl'],
  ast: ['Asturian', 'Asturianu'],
  az: ['Azerbaijani', 'Az\u0259rbaycanca'],
  be: ['Belarusian', '\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f'],
  bg: ['Bulgarian', '\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438'],
  bn: ['Bengali', '\u09ac\u09be\u0982\u09b2\u09be'],
  bo: ['Tibetan', '\u0f56\u0f7c\u0f51\u0f0b\u0f66\u0f90\u0f51\u0f0b'],
  bs: ['Bosnian', 'Bosanski'],
  ca: ['Catalan', 'Catal\u00e0'],
  cs: ['Czech', '\u010ce\u0161tina'],
  cy: ['Welsh', 'Cymraeg'],
  da: ['Danish', 'Dansk'],
  de: ['German', 'Deutsch'],
  dz: ['Dzongkha', '\u0f62\u0fab\u0f7c\u0f44\u0f0b\u0f41'],
  el: ['Greek', '\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac'],
  en: ['English', 'English'],
  'en-x-simple': ['Simple English', 'Simple English'],
  eo: ['Esperanto', 'Esperanto'],
  es: ['Spanish', 'Espa\u00f1ol'],
  et: ['Estonian', 'Eesti'],
  eu: ['Basque', 'Euskera'],
  fa: ['Persian, Farsi', '\u0641\u0627\u0631\u0633\u06cc', 'rtl'],
  fi: ['Finnish', 'Suomi'],
  fil: ['Filipino', 'Filipino'],
  fo: ['Faeroese', 'F\u00f8royskt'],
  fr: ['French', 'Fran\u00e7ais'],
  fy: ['Frisian, Western', 'Frysk'],
  ga: ['Irish', 'Gaeilge'],
  gd: ['Scots Gaelic', 'G\u00e0idhlig'],
  gl: ['Galician', 'Galego'],
  'gsw-berne': ['Swiss German', 'Schwyzerd\u00fctsch'],
  gu: ['Gujarati', '\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0'],
  he: ['Hebrew', '\u05e2\u05d1\u05e8\u05d9\u05ea', 'rtl'],
  hi: ['Hindi', '\u0939\u093f\u0928\u094d\u0926\u0940'],
  hr: ['Croatian', 'Hrvatski'],
  ht: ['Haitian Creole', 'Krey\u00f2l ayisyen'],
  hu: ['Hungarian', 'Magyar'],
  hy: ['Armenian', '\u0540\u0561\u0575\u0565\u0580\u0565\u0576'],
  id: ['Indonesian', 'Bahasa Indonesia'],
  is: ['Icelandic', '\u00cdslenska'],
  it: ['Italian', 'Italiano'],
  ja: ['Japanese', '\u65e5\u672c\u8a9e'],
  jv: ['Javanese', 'Basa Java'],
  ka: ['Georgian', '\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8 \u10d4\u10dc\u10d0'],
  kk: ['Kazakh', '\u049a\u0430\u0437\u0430\u049b'],
  km: ['Khmer', '\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a'],
  kn: ['Kannada', '\u0c95\u0ca8\u0ccd\u0ca8\u0ca1'],
  ko: ['Korean', '\ud55c\uad6d\uc5b4'],
  ku: ['Kurdish', 'Kurd\u00ee'],
  ky: ['Kyrgyz', '\u041a\u044b\u0440\u0433\u044b\u0437\u0447\u0430'],
  lo: ['Lao', '\u0e9e\u0eb2\u0eaa\u0eb2\u0ea5\u0eb2\u0ea7'],
  lt: ['Lithuanian', 'Lietuvi\u0173'],
  lv: ['Latvian', 'Latvie\u0161u'],
  mg: ['Malagasy', 'Malagasy'],
  mk: ['Macedonian', '\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438'],
  ml: ['Malayalam', '\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02'],
  mn: ['Mongolian', '\u043c\u043e\u043d\u0433\u043e\u043b'],
  mr: ['Marathi', '\u092e\u0930\u093e\u0920\u0940'],
  ms: ['Bahasa Malaysia', '\u0628\u0647\u0627\u0633 \u0645\u0644\u0627\u064a\u0648'],
  my: ['Burmese', '\u1017\u1019\u102c\u1005\u1000\u102c\u1038'],
  ne: ['Nepali', '\u0928\u0947\u092a\u093e\u0932\u0940'],
  nl: ['Dutch', 'Nederlands'],
  nb: ['Norwegian Bokm\u00e5l', 'Norsk, bokm\u00e5l'],
  nn: ['Norwegian Nynorsk', 'Norsk, nynorsk'],
  oc: ['Occitan', 'Occitan'],
  pa: ['Punjabi', '\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40'],
  pl: ['Polish', 'Polski'],
  'pt-pt': ['Portuguese, Portugal', 'Portugu\u00eas, Portugal'],
  'pt-br': ['Portuguese, Brazil', 'Portugu\u00eas, Brasil'],
  ro: ['Romanian', 'Rom\u00e2n\u0103'],
  ru: ['Russian', '\u0420\u0443\u0441\u0441\u043a\u0438\u0439'],
  sco: ['Scots', 'Scots'],
  se: ['Northern Sami', 'S\u00e1mi'],
  si: ['Sinhala', '\u0dc3\u0dd2\u0d82\u0dc4\u0dbd'],
  sk: ['Slovak', 'Sloven\u010dina'],
  sl: ['Slovenian', 'Sloven\u0161\u010dina'],
  sq: ['Albanian', 'Shqip'],
  sr: ['Serbian', '\u0421\u0440\u043f\u0441\u043a\u0438'],
  sv: ['Swedish', 'Svenska'],
  sw: ['Swahili', 'Kiswahili'],
  ta: ['Tamil', '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd'],
  'ta-lk': ['Tamil, Sri Lanka', '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd, \u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8'],
  te: ['Telugu', '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41'],
  th: ['Thai', '\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22'],
  tr: ['Turkish', 'T\u00fcrk\u00e7e'],
  tyv: ['Tuvan', '\u0422\u044b\u0432\u0430 \u0434\u044b\u043b'],
  ug: ['Uyghur', '\u0626\u06c7\u064a\u063a\u06c7\u0631\u0686\u06d5', 'rtl'],
  uk: ['Ukrainian', '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430'],
  ur: ['Urdu', '\u0627\u0631\u062f\u0648', 'rtl'],
  vi: ['Vietnamese', 'Ti\u1ebfng Vi\u1ec7t'],
  'xx-lolspeak': ['Lolspeak', 'Lolspeak'],
  'zh-hans': ['Chinese, Simplified', '\u7b80\u4f53\u4e2d\u6587'],
  'zh-hant': ['Chinese, Traditional', '\u7e41\u9ad4\u4e2d\u6587'],
  'zh': ['Chinese, Simplified', '\u7b80\u4f53\u4e2d\u6587'],
});
