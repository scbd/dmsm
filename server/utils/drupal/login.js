import SA from 'superagent';

const $http   = {}//SA.agent()

export const useDrupalLogin = async (ctx) => {
    try{
        const { identifier, redirect }                          = ctx
        const { apiUser: name, apiUserPass: pass }    = useRuntimeConfig()
        const { baseHost, drupalMultisiteIdentifier } = useRuntimeConfig().public;

        const cacheId = `${drupalMultisiteIdentifier}-${identifier}`;

        if($http[cacheId]) return $http[cacheId]

        const saAgent = SA.agent()
        
        const host = redirect ? redirect : `${identifier}${baseHost}`;

        const uri  = `${host}/user/login?_format=json`

        //saAgent.query({ 'jsonapi_include': 1 });
        
        const { body } = await saAgent.post(uri)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ name, pass }));

        const { csrf_token } = body

        saAgent.set('X-CSRF-Token', csrf_token);
        $http[cacheId] = saAgent

        return $http[cacheId]
    }
    catch(e){
        consola.error('server/util/drupal/login.useDrupalLogin: ', e)
        return false
    }
}

