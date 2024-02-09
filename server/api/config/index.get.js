import { resolve }     from 'path';

export default cachedEventHandler(async (event) => {
    // installDrushOnMultiSite();
    // const config = useRuntimeConfig(event)
    // console.log('================', config)
    const isAnon  = event?.context?.user?.anonymous;
    const isAdmin = event?.context?.user?.roles?.includes('Administrator');

    if(isAnon || !isAdmin)
        throw createError({ statusCode: 401, statusMessage: 'Not Authorized', })

    try{

        // console.log('================', event.context.user)
        const d  = freshImport(resolve(`server/efs/config/dev.js`)).then((data)=> data.default);
        const s  = freshImport(resolve(`server/efs/config/stg.js`)).then((data)=> data.default);
        //const prod = importJsFile(resolve(`server/efs/config/prod/index.js`)).then((data)=> data.default);

        const [dev,stg] = await Promise.all([d,s]);
        setResponseStatus(event, 200)
        return  { dev, stg }
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
