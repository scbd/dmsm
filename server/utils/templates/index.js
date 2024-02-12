import   Handlebars                     from 'handlebars';
import { ensureFileSync }               from 'fs-extra'  ;
import { writeFileSync , readFileSync } from 'fs'        ;


export function getStackYml(interpolationData){
    const HB   = Handlebars.create();
    const file = readFileSync('server/efs/config/templates/drupal-stack.yml', 'utf8').toString();

    return HB.compile(file)(interpolationData);
}
export const getCommonSettingsPhp = (interpolationData) => {
    const HB   = Handlebars.create();
    const file = readFileSync('server/efs/config/templates/settings.common.php', 'utf8').toString();

    return HB.compile(file)(interpolationData);
}
//database.userName, database.password, database.host, database.port, database.name
export const writeCommonSettingsPhpTemplate = (ctx) => {

    const compiledTemplate = getCommonSettingsPhp(ctx.config);
    const context          = getDrupalSitesContext(ctx);


    const fileName         = `${context}/_common/settings.common.php`;

    ensureFileSync(fileName);
    
    return writeFileSync(fileName, compiledTemplate);
}
export const getSiteSettingsPhp = (interpolationData) => {
    const HB   = Handlebars.create();
    const file = readFileSync('server/efs/config/templates/settings.php', 'utf8').toString();

    return HB.compile(file)(interpolationData);
}

//dataBaseName, killCache
export const writeSiteSettingsPhpTemplate = (ctx, interpolationData) => {
    const { siteCode }     = interpolationData;
    const compiledTemplate = getSiteSettingsPhp(interpolationData);
    const context          = getDrupalSiteContext({...ctx, siteCode});


    const fileName         = `${context}/settings.php`;

    ensureFileSync(fileName);
    
    return writeFileSync(fileName, compiledTemplate);
}

export const getDrushSiteYmlTemplate = (interpolationData) => {
    const HB   = Handlebars.create();
    const file = readFileSync('server/efs/config/templates/drush.site.yml', 'utf8').toString();

    return HB.compile(file)(interpolationData);
}

// siteCode, host, root
export const writeDrushSiteYmlTemplate = (ctx, interpolationData) => {

    const compiledTemplate = getDrushSiteYmlTemplate(interpolationData);
    const context          = getDrushConfigContext(ctx);


    const fileName         = `${context}/${interpolationData.siteCode}.site.yml`;

    ensureFileSync(fileName);
    
    return writeFileSync(fileName, compiledTemplate);
}


export const writeSitesPhpTemplate = (multiSiteCtx) => {
    let fileData = `<?php\n`;

    const { sites }    = multiSiteCtx;

    for (const [siteCode, site] of Object.entries(sites)){
        if(siteCode === 'meta')continue;

        if(!site.runTime)continue;

        const { host } = site.runTime;

        fileData += `$sites["${host}"] = "${siteCode}";\n`

    }

    const context          = getDrupalSitesContext(multiSiteCtx);
    const fileName         = `${context}/sites.php`;

    ensureFileSync(fileName);

    return  writeFileSync(fileName, fileData);
}