
import { resolve } from 'path'    ;
import   fs        from 'fs-extra';

const { writeJsFile } = useFiles();

export const publicMultiSiteProperties = [
    'multiSiteCode',
    'name',
    'description',
    'baseHost'
];

export const publicSiteProperties = [
    'siteCode',
    'multiSiteCode',
    'name',
    'description',
    'host',
    'published',
    'logo',
    'defaultLocale',
    'locales',
    'country',
    'countries'
];

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

export async function readAllConfigs(event){
    const d  = freshImport(resolve(`server/efs/config/dev.js`)).then((data)=> data.default);
    const s  = freshImport(resolve(`server/efs/config/stg.js`)).then((data)=> data.default);
    //const prod = importJsFile(resolve(`server/efs/config/prod/index.js`)).then((data)=> data.default);

    const [dev,stg] = await Promise.all([d,s]);

    setResponseStatus(event, 200);
    return { dev, stg }
}

export async function readAllConfigsPublic(event){
    // const d  = freshImport(resolve(`server/efs/config/dev.js`)).then((data)=> data.default);
    // const s  = freshImport(resolve(`server/efs/config/stg.js`)).then((data)=> data.default);
    //const prod = importJsFile(resolve(`server/efs/config/prod/index.js`)).then((data)=> data.default);

    const {dev,stg} = await readAllConfigs(event).then(({ dev, stg })=> [mapPublicMultiSite(dev), mapPublicMultiSite(stg)]);

    setResponseStatus(event, 200);
    return { dev, stg }
}

function mapPublicMultiSite(multiSite){
    const config = mapPublicMultiSiteConfig(multiSite.config)
    const sites  = mapPublicMultiSiteSites(multiSite.sites);
}

function mapPublicMultiSiteConfig(config){
    const entries = Object.entries(config).filter(([key])=> publicMultiSiteProperties.includes(key));

    return Object.fromEntries(entries);
}

function mapPublicMultiSiteSites(sites){
    const privateEntries = [];

    for (const [siteCode, site] of Object.entries(sites))
        privateEntries.push([siteCode, mapPublicMultiSiteSite(site)])

    return Object.fromEntries(privateEntries);
}

function mapPublicMultiSiteSite(site){
    const entries = Object.entries(site).filter(([key])=> publicSiteProperties.includes(key));

    return Object.fromEntries(entries);
}