import JSON5 from 'json5';
const { stringify, parse } = JSON5;

export const parseJSON = (jsonString) => {
    try {
        return parse(jsonString)
    } catch (error) {
        return undefined
    }
}

export const stringifyJSON = (object, replacer, space) => {
    try {
        return stringify(object, replacer, space)
    } catch (error) {
        return undefined
    }
}