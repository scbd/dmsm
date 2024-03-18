import { v2 } from '@google-cloud/translate';


const GT = new v2.Translate({ key: process.env.G_I18N_KEY });

export const translate = async ({ key, target, locale }) => {
  const lang   = mapLang(locale);
  const exists = await getCache({ lang: locale,  key, target })

  if (exists)
console.log('exists: ',exists)
  if (exists) return exists;

  const [ value ] = await GT.translate(target||key, locale);


  await setCache({ locale:lang,  key, target, value });

  return value;
};



function mapLang (code) {
  if (!['fil', 'zh-hans'].includes(code)) return code;

  if (code === 'fil') return 'tl';
  if (code === 'zh-hans') return 'zh';

  return code;
}

function isUnLocale (locale) {
  return ['ar', 'es', 'en', 'fr', 'ru', 'zh'].includes(locale.toLowercase(0));
}
