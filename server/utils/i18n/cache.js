import   fs            from 'fs-extra';
import   isPlainObject from 'lodash.isplainobject';
import { resolve }     from 'path';

const { importJsFile, writeFile } = useFiles();

export async function getCache({ lang, target, key }){
  const cache = await readCache(lang);

  if(!cache) return undefined;

  if(lang) return key? cache[key] : cache[target];

  const map = { [key||target]: {} }

  for (const locale in cache)
    map[key||target][`${locale}`]= key? cache[locale][key] : cache[locale][target];

  if(Object.keys(map).length) return map;

  return undefined;
}

export async function setCache({ locale, target, key, value }){
  
  if(!locale) throw new Error('server/util/i18n/cache.setCache: locale is required');
  if(!key && !target) throw new Error('server/util/i18n/cache.setCache: key or target is required');
  if(!value) throw new Error('server/util/i18n/cache.setCache: value is required');

  if(locale) ensureLanguage(locale);

  const cache = await readCache(locale);

  cache[key||target]= value;

  const fileName = resolve(`server/efs/i18n-cache/${locale}.js`);

  return writeFile({ fileName, data:cache, exportDefault:true })
}



function languageExists(lang){
  if(!lang) throw new Error('server/util/i18n/cache.languageExists: lang is required');

  const files = fs.readdirSync(resolve('server/efs/i18n-cache')).filter((fileName)=> fileName !== 'index.js')

  return files.includes(`${lang}.js`)
}

function ensureLanguage(lang){

  if(languageExists(lang)) return;

  const fileName = resolve(`server/efs/i18n-cache/${lang}.js`);
  const data = `export default {}`;

  return writeFile({ fileName, data });
}

export async function readCache(lang){
  try{
    const apiUrl = lang? resolve(`server/efs/i18n-cache/${lang}.js`) : resolve('server/efs/i18n-cache/index.js');

    return (await importJsFile(apiUrl)).default; 
  }catch(e){
    consola.warn(`server/utils/i18n/cache.readCache: ${lang} cache not found`)
    return undefined;
  }
}

// export const glossaryExists = (targetString, lang) => globals.glossaryData[lang] && globals.glossaryData[lang][targetString];

// export const getGlossary = async (targetString, lang) => {
//   globals.glossaryData = await importGlossaryData();
//   return glossaryExists(targetString, lang) ? globals.glossaryData[lang][targetString] : '';
// };

// export const setGlossary = (targetString, lang, translation) => {
//   try {
//     if (langExists(lang)) globals.glossaryData[lang][targetString] = translation;
//     else {
//       globals.glossaryData[lang] = {};
//       globals.glossaryData[lang][targetString] = translation;
//     }

//     return updateGlossary();
//   } catch (e) {
//     consola.error(e);
//   }
// };

// function langExists (lang) { return !!globals.glossaryData[lang]; }

// async function updateGlossary () {
//   const s3Params = {
//     Body: 'export default ' + JSON.stringify(globals.glossaryData),
//     Bucket: 'bioland-static',
//     Key: 'i18n.mjs'
//   };
//   // await versionGlossary()
//   const res = await S3.putObject(s3Params).promise();

//   return res;

// //   fs.copySync(resolve(__dirname,'./data.mjs'), resolve(__dirname,'./data-bk.mjs'))
// //   fs.writeFileSync(resolve(__dirname,'./data.mjs'), ` export default ${JSON.stringify(glossaryData)}`)
// }

// export async function importGlossaryData () {
//   if (globals.glossaryData) return globals.glossaryData;

//   const glossaryObj = await S3.getObject({ Bucket: 'bioland-static', Key: 'i18n.mjs' }).promise();

//   globals.tmpDir = `${tmpdir()}/i18n.mjs`;

//   fs.writeFileSync(globals.tmpDir, glossaryObj.Body);

//   globals.glossaryData = (await import(globals.tmpDir)).default;

//   return globals.glossaryData;
// }
