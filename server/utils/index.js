import c from 'consola';
import isPlainObject from 'lodash.isplainobject';
import crypto from 'crypto';
import JSON5 from 'json5';

export const consola = c;

export function unique (array) {
    return Array.from(new Set(array.map((el) => { if (isPlainObject(el)) return JSON.stringify(el); else return el; }))).map(jsonParse);
  }
  
export  function jsonParse (el) { try { return JSON.parse(el); } catch (e) { return el; } }

export function makeHash (x) {

    const data = isPlainObject(x)? JSON5.stringify(x) : x;

    return crypto.createHash('sha1').update(data).digest('hex')
}

export function getTimeParams (ctx) {
  const now      = new Date();
  const year     = now.getFullYear();
  const month    = ('0' + (now.getMonth() + 1)).slice(-2);
  const day      = ('0' + now.getDate()).slice(-2);
  const hour     = now.getHours();
  const min      = now.getMinutes();
  const seconds  = now.getSeconds();
  const dateTime = `${year}-${month}-${day}-T-${hour}-${min}-${seconds}`;

  const S3_URL = `s3://biolands/env-${ctx.env}/${ctx.multiSiteCode}`;
  const S3_URL_YEAR_MONTH = `${S3_URL}/${year}-${month}`;

  return { S3_URL, S3_URL_YEAR_MONTH, dateTime };
}

