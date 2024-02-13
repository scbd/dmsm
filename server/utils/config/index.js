
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
    'countries',
    'runTime',
    'env'

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

export async function readAllConfigs(event){
    const d  = freshImport(resolve(`server/efs/config/dev.js`)).then((data)=> mapRunTime(data.default, 'dev'));
    const s  = freshImport(resolve(`server/efs/config/stg.js`)).then((data)=> mapRunTime(data.default,'stg'));
    //const prod = importJsFile(resolve(`server/efs/config/prod/index.js`)).then((data)=> data.default);

    const [dev,stg] = await Promise.all([d,s]);

    // setResponseStatus(event, 200);
    return { dev, stg }
}

export async function readAllConfigsPublic(event){

    const [dev,stg] = await readAllConfigs(event).then(({ dev, stg })=> [mapPublicMultiSite(mapRunTime(dev,'dev')), mapPublicMultiSite(mapRunTime(stg, 'stg'))]);

    // setResponseStatus(event, 200);
    return { dev, stg }
}

export async function readConfigPublic(event){
        const env        = getRouterParam(event, 'env')
        const configName = resolve(`server/efs/config/${env}.js`);


        return  mapPublicMultiSite(mapRunTime((await freshImport(configName)).default,env)) 
}

export async function readConfig(event){
    const env        = getRouterParam(event, 'env')
    const configName = resolve(`server/efs/config/${env}.js`);


    return  mapRunTime((await freshImport(configName)).default,env)
}

export async function readMultiSitePublic(event){
    const env        = getRouterParam(event, 'env')
    const multiSiteCode   = getRouterParam(event, 'multiSiteCode')
    const configName = resolve(`server/efs/config/${env}.js`);

    const config = mapPublicMultiSite(mapRunTime((await freshImport(configName)).default,env)) 

    return  config[multiSiteCode]
}

export async function readMultiSite(event){
    const env        = getRouterParam(event, 'env')
    const multiSiteCode   = getRouterParam(event, 'multiSiteCode')
    const configName = resolve(`server/efs/config/${env}.js`);

    const config = mapRunTime((await freshImport(configName)).default,env)

    return  config[multiSiteCode]
}
export async function readSitePublic(event){
    const env             = getRouterParam(event, 'env')
    const multiSiteCode   = getRouterParam(event, 'multiSiteCode')
    const siteCode        = getRouterParam(event, 'siteCode')
    const configName      = resolve(`server/efs/config/${env}.js`);

    const config = mapPublicMultiSite(mapRunTime((await freshImport(configName)).default,env)) 


    return  config[multiSiteCode].sites[siteCode]
}

export async function readSite(event){
    const env             = getRouterParam(event, 'env')
    const multiSiteCode   = getRouterParam(event, 'multiSiteCode')
    const siteCode        = getRouterParam(event, 'siteCode')
    const configName      = resolve(`server/efs/config/${env}.js`);

    const config = mapRunTime((await freshImport(configName)).default,env)


    return  config[multiSiteCode].sites[siteCode]
}


function mapPublicMultiSite(multiSites){
    const newMultiSites = {};
    for (const [key, multiSite] of Object.entries(multiSites)){

        const config = mapPublicMultiSiteConfig(multiSite.config)
        const sites  = mapPublicMultiSiteSites(multiSite.sites);

        newMultiSites[key] = { config, sites, meta: multiSite.meta}
    }
    return newMultiSites
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

    const publicSite = Object.fromEntries(entries)
    if(!site?.runTime )return publicSite;

    publicSite.runTime =  Object.fromEntries(Object.entries(publicSite.runTime).filter(([key])=> publicSiteProperties.includes(key)));

    return publicSite;
}

function mapRunTime(multiSites, env){

    const newMultiSites = {};
    for (const [key, multiSite] of Object.entries(multiSites)){
        if(key === 'meta') continue;

        const config = mapRunTimeMultiSiteConfig(multiSite.config, env);
        const sites  = mapRunTimeMultiSiteSites(multiSite.sites, config);

        newMultiSites[key] = { ...multiSite,config, sites }
    }
    return newMultiSites
}

function mapRunTimeMultiSiteConfig(config, env){
    const { multiSiteCode} = config
    const   root           = `/opt/${env}/${multiSiteCode}`;
    const   drupalRoot     = `${root}/web`;

    config.runTime = { root, env, drupalRoot };

    return config;
}

function mapRunTimeMultiSiteSites(sites, multiSiteConfig){
    const runTimeEntries = [];

    for (const [siteCode, site] of Object.entries(sites))
        runTimeEntries.push([siteCode, mapRunTimeMultiSiteSite(site, multiSiteConfig)])

    return Object.fromEntries(runTimeEntries);
}

function mapRunTimeMultiSiteSite(site, multiSiteConfig){
    const { root,drupalRoot, env } = multiSiteConfig.runTime;
    const { multiSiteCode, baseHost,  defaultSmtpCredentials} = multiSiteConfig
    const { countries:passedCountries, country, siteCode, host: existingHost, smtpCredentials:siteSmtpCredentials } = site;

    const host            = existingHost || `${siteCode}.${baseHost}`;
    const siteRoot        = `${drupalRoot}/sites/${siteCode}`;
    const dataBaseName    = `${multiSiteCode}_${siteCode}`;
    const smtpCredentials = siteSmtpCredentials || defaultSmtpCredentials;

    const countries = (passedCountries?.length? Array.from(new Set([...passedCountries, (country|'')])) : [country]).filter(x => x);

    site.runTime = { countries, root, drupalRoot, env, siteRoot, host, multiSiteCode, dataBaseName, smtpCredentials };

    return site;
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