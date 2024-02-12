

export const getComposerContext = ({env, multiSiteCode}) => `/opt/${env}/${multiSiteCode}`;

export const getDrupalContext = (ctx)=> `${getComposerContext(ctx)}/web`;

export const getTempContext = (ctx)=> `${getComposerContext(ctx)}/temp`;

export const getDrushConfigContext = (ctx)=> `${getComposerContext(ctx)}/web/drush/sites`;

export const getNuxtServerContext = (ctx)=> `${getComposerContext(ctx)}/web/drush/sites`;