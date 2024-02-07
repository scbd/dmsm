

export default cachedEventHandler(async (event) => {
    try{

        return  localesInUse
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
    maxAge: 60*60*24
})
