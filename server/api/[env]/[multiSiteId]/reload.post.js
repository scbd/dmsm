
export default defineEventHandler(async (event) => {
    const { isAnon, isAdmin } = event.context.user;

    console.log({ isAnon, isAdmin })
    if(isAnon || !isAdmin)
        throw createError({ statusCode: 401, statusMessage: 'Not Authorized', })

    try{
        const env         = getRouterParam(event, 'env')
        const multiSiteId = getRouterParam(event, 'multiSiteId')
        
        setResponseStatus(event, 201);

        return  { env, multiSiteId };
    }
    catch(e){
        console.error(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to get page i18n MissingServices',
        }); 
    }
    
})