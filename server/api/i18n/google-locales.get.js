

export default cachedEventHandler(async (event) => {
    try{

        const l = await getGoogleSupportedLanguages();

        console.log(l)
        return  l
    }
    catch(e){
        console.error(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to get page i18n google supported langues',
        }); 
    }
    
}
,{
    maxAge: 60*60*24
})
