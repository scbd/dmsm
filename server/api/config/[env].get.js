import { resolve }     from 'path';
const { importJsFile, freshImport } = useFiles();

export default cachedEventHandler(async (event) => {
    const isAnon  = event?.context?.user?.anonymous;
    const isAdmin = event?.context?.user?.roles?.includes('Administrator');

    if(isAnon || !isAdmin)
        throw createError({ statusCode: 401, statusMessage: 'Not Authorized', })

    try{
        const env        = getRouterParam(event, 'env')
        const configName = resolve(`server/efs/config/${env}.js`);
        
        return  (await freshImport(configName)).default
    }
    catch(e){
        console.error(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to get page i18n MissingServices',
        }); 
    }
    
}
,{
    maxAge: 1
})