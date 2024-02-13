export default defineEventHandler(async (event) => {

    try{
        const { isAnon, isAdmin } = event.context.user;

        setResponseStatus(event, 200);

        if(isAnon || !isAdmin) return readMultiSitePublic(event)

        return  readMultiSite(event)
    }
    catch(e){
        console.error(e);
        const env             = getRouterParam(event, 'env')
        const multiSiteCode   = getRouterParam(event, 'multiSiteCode')

        throw createError({
            statusCode: 500,
            statusMessage: `/api/config/${env}/${multiSiteCode} Failed to get config`,
        }); 
    }
    
})
