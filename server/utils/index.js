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
