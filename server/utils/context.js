import { URL, fileURLToPath } from 'url';
import { resolve } from 'path';

const __rootDirname =  fileURLToPath(new URL('../..', import.meta.url));

export const getMultiSiteContext = async (event)=>{
    const runTimeConfig = useRuntimeConfig(event);
    const env         = getRouterParam(event, 'env')
    const multiSiteCode = getRouterParam(event, 'multiSiteCode')

    const aMultiSite = await readMultiSite({env, multiSiteCode})
    aMultiSite.runTimeConfig = runTimeConfig;


    return aMultiSite;
}

export const getComposerContext = ({runTimeConfig, config}) => {
    const { isLocalHost } = runTimeConfig.public;
    const { runTime, multiSiteCode } = config;

    const localPath = resolve(__rootDirname,`server/efs/${runTime.env}/${multiSiteCode}` )

    return isLocalHost? localPath : `/opt/${runTime.env}/${multiSiteCode}`;
}

export const getDrupalContext = (ctx)=> `${getComposerContext(ctx)}/web`;
export const getDrupalSitesContext = (ctx)=> `${getComposerContext(ctx)}/web/sites`;
export const getDrupalSiteContext = (ctx)=> `${getComposerContext(ctx)}/web/sites/${ctx.siteCode}`;
export const getTempContext = (ctx)=> `${getComposerContext(ctx)}/temp`;

export const getDrushConfigContext = (ctx)=> `${getComposerContext(ctx)}/web/drush/sites`;

export const getNuxtServerContext = (ctx)=> `${getComposerContext(ctx)}/web/drush/sites`;