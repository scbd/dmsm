

import { resolve } from 'path';

const { writeJsFile } = useFiles();

export default defineEventHandler(async (event) => {

    const { isAnon, isAdmin } = event?.context?.user || {};

    if(isAnon || !isAdmin)
        throw createError({ statusCode: 401, statusMessage: 'Not Authorized', })

    try{
        const body       = await readBody(event);
        const env        = getRouterParam(event, 'env')
        const configName = resolve(`server/efs/config/${env}.js`);
        
        writeConfig(event);

        return  body
    }
    catch(e){
        console.error(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to get page i18n MissingServices',
        }); 
    }
    
})
