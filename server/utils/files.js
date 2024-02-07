import fs from 'fs-extra';
import path from 'path';
import   isPlainObject from 'lodash.isPlainObject';
import JSON5 from 'json5';

export function freshImport(name){
  const stats = fs.statSync(name);

  return import(`${name}?t=${stats.ctimeMs}`);
}

const fileExists = (fileName, context) => {
  const target = getTargetFile (fileName, context);

  return fs.existsSync(target);
};


const importJsFile = (fileName, context) => {
  const target = getTargetFile (fileName, context)

  return import(target)
};


const writeJsFile = (fileName, data) => {
  

  fs.ensureFileSync(fileName);

  const writeData = isPlainObject(data)? JSON5.stringify(data, null, 4) : data;

  const fileContents = `export default ${writeData}`;

  return fs.writeFileSync(fileName, fileContents);
};



export const useFiles =  () => ({ freshImport, fileExists, importJsFile, writeJsFile })

function getTargetFile (fileName, context) {
  return context? path.resolve(`${context}/${fileName}`) : fileName;
}