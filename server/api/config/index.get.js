import { resolve }     from 'path';

export default defineEventHandler(async (event) => {
    // const config = useRuntimeConfig();

    // console.log('------------', config)
    const { isAnon, isAdmin } = event.context.user;

    try{
        if(isAnon || !isAdmin) return readAllConfigsPublic(event);

        return  readAllConfigs(event)
    }
    catch(e){
        console.error(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to get config',
        }); 
    }
    
}
)
