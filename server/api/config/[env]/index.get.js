export default defineEventHandler(async (event) => {
    try{
        const { isAnon, isAdmin } = event.context.user;

        setResponseStatus(event, 200);

        if(isAnon || !isAdmin) return readConfigPublic(event)

        return  readConfig(event)
    }
    catch(e){
        console.error(e);
        const env             = getRouterParam(event, 'env')

        throw createError({
            statusCode   : 500,
            statusMessage: `/api/config/${env} Failed to get config`,
        }); 
    }
    
})