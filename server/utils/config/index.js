
import { resolve }     from 'path';
import fs from 'fs-extra';
const { writeJsFile } = useFiles();

export async function writeConfig(event){
    const body       = await readBody(event);
    const env        = getRouterParam(event, 'env')
    const configName = resolve(`server/efs/config/${env}.js`);

    const { hash } = body?.meta || {};

    if(body?.meta?.hash) delete body.meta.hash;

    if(!body.meta)  body.meta = {};

    body.meta.hash = makeHash(body);
    createVersion(env);
    writeJsFile(configName, body);
}

function createVersion(env){
    const versionNumber = countVersions(env) + 1;
    const from          = resolve(`server/efs/config/${env}.js`);
    const to            = resolve(`server/efs/config/versions/${env}/${versionNumber}.js`);

    fs.copySync(from, to, { preserveTimestamps: true });
}

function countVersions(env){

    const dir = resolve(`server/efs/config/versions/${env}`);

    fs.ensureDirSync(dir);

    return fs.readdirSync(dir).length;
}