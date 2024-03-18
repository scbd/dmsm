import fs from 'fs-extra';
import path from 'path';
import   isPlainObject from 'lodash.isplainobject';
import JSON5 from 'json5';
import { resolve } from 'path';
export function freshImport(name){ //memory leak
  const stats = fs.statSync(name);

  return import(`${name}?t=${stats.ctimeMs}`);
}

export function readJson5FileSync (fileName){

  if(!fs.existsSync(fileName)) return undefined;

  const data = fs.readFileSync(fileName, 'utf8');
  
  return parseJson5(data);
}

export async function readJson5File (fileName){
  return readJson5FileSync(fileName)
}

export function parseJson5( stringJson5){
  try {
    return JSON5.parse(stringJson5);
  }catch(e){
    console.log('server/util/files.parseJson5',e);
    return undefined;
  }
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

const writeFile = (fileName, data, isExport=false) => {
  
console.log('===============',fileName)
  fs.ensureFileSync(fileName);

  const writeData = isPlainObject(data)? JSON5.stringify(data, null, 4) : data;

  const fileContents = isExport? `export default ${writeData}` : writeData;

  return fs.writeFileSync(fileName, fileContents);
};

export const useFiles =  () => ({ freshImport, fileExists, importJsFile, writeJsFile, writeFile })

function getTargetFile (fileName, context) {
  return context? path.resolve(`${context}/${fileName}`) : fileName;
}