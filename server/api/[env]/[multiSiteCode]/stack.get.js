
export default defineEventHandler(async (event) => {
    const { isAnon, isAdmin } = event.context.user;

    if(isAnon || !isAdmin)
        throw createError({ statusCode: 401, statusMessage: 'Not Authorized', })

    try{
        const env         = getRouterParam(event, 'env')

        
        const ctx = await getMultiSiteContext(event)


        const stack =  await getStack({env, ...ctx});

        setResponseStatus(event, 200);

        console.log('-----------', stack)
        return  stack;
    }
    catch(e){
        console.error(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to get page i18n MissingServices',
        }); 
    }
    
})