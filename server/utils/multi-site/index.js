
/*
- write drush sites
- write sites.php

- write site/settings.php
- write settings.php

- write trafig config
- write stack template
*/
export async function  reload(multiSiteCtx){
    
    await writeDrushFiles(multiSiteCtx);
    await writeSitesPhpTemplate(multiSiteCtx);
    await writeSiteSettingsPhp(multiSiteCtx);
    await writeCommonSettingsPhpTemplate(multiSiteCtx);
}

export function getStack(multiSiteCtx){
    const { env, config }    = multiSiteCtx;
    return getStackYml({ env, ...config})
}

function writeDrushFiles(multiSiteCtx){
    const { sites }    = multiSiteCtx;

    for (const [siteCode, site] of Object.entries(sites)){
        if(siteCode === 'meta')continue;

        const { drupalRoot, host } = site.runTime;

        writeDrushSiteYmlTemplate(multiSiteCtx,{ siteCode, host, drupalRoot })
    }
}

function writeSiteSettingsPhp(multiSiteCtx){
    const { env, sites }    = multiSiteCtx;

    for (const [siteCode, site] of Object.entries(sites)){
        if(siteCode === 'meta')continue;
        const { drupalRoot, host, dataBaseName } = site.runTime;

        const killCache = env === 'prod'? false : true;
        writeSiteSettingsPhpTemplate(multiSiteCtx,{ siteCode, killCache, dataBaseName})
    }
}