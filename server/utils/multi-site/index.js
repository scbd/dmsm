
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
    console.log('writeDrushFiles done');
    console.log(``)
    console.log(``)
    await writeSitesPhpTemplate(multiSiteCtx);
    console.log('writeSitesPhpTemplate done');
    console.log(``)
    console.log(``)
    await writeSiteSettingsPhp(multiSiteCtx);
    console.log('writeSiteSettingsPhp done');
    console.log(``)
    console.log(``)
    await writeCommonSettingsPhpTemplate(multiSiteCtx);
    console.log('writeCommonSettingsPhpTemplate done');
    console.log(``)
    console.log(``)
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

        const killCache = false//env === 'prod'? false : true;
        writeSiteSettingsPhpTemplate(multiSiteCtx,{ siteCode, killCache, dataBaseName})
    }
}