import { resolve }     from 'path';

export default cachedEventHandler(async (event) => {
    // writeDrushSiteYmlTemplate()

    // const config = useRuntimeConfig();

    // console.log('------------', config)
    const { isAnon, isAdmin } = event.context.user;

    // if(isAnon || !isAdmin)
    //     throw createError({ statusCode: 401, statusMessage: 'Not Authorized', })

    try{
        if(isAnon || !isAdmin) return readAllConfigsPublic(event);

        return  readAllConfigs(event)//{ dev, stg }
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
