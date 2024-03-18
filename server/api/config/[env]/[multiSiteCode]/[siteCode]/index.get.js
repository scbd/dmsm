

export default defineEventHandler(async (event) => {
    

    try{

        const { isAnon, isAdmin } = event.context.user;

        setResponseStatus(event, 200);

        if(isAnon || !isAdmin) return readSitePublic(event)

        return  readSite(event)
    }
    catch(e){
        console.error(e);
        const env             = getRouterParam(event, 'env')
        const multiSiteCode   = getRouterParam(event, 'multiSiteCode')
        const siteCode        = getRouterParam(event, 'siteCode')
        throw createError({
            statusCode: 500,
            statusMessage: `/api/config/${env}/${multiSiteCode}/${siteCode} Failed to get config`,
        }); 
    }
    
})
