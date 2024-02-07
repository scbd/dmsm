
// import {languageExists, ensureLanguage, readCache} from '../util/i18n/cache';
// cachedEventHandler
export default defineEventHandler(async (event) => {
    try{

        // const ctx  =  getContext(event)
        const allTerms = await getContentTerms({ localizedHost: 'https://seed.bl2.staging.cbd.int/es', locale:'en', flat: true, camelCase: true})

        //const terms = allTerms.map(mapTerms)
        // const excludedLocales = [...(await getMissingServices()), 'en']
        // for (const locale of localesInUse.filter((l)=> !excludedLocales.includes(l))) {

        //     for (const term of allTerms) {
        //         const { id, slug, name } = term
        //         const cache = await getCache({ lang:locale,  key: name.toLowerCase() })
        //         if(cache) continue;
    
        //         consola.warn(locale, await translate( { locale,  key: name.toLowerCase(), value: name.toLowerCase()}))
        //       //  await translate( { locale,  key: name.toLowerCase(), value: name.toLowerCase()})
        //     }
        // }
        const config = useRuntimeConfig(event)
        return 'hello' //translateAllMenus({config})//getAllMenusEnglish({config})
    }
    catch(e){
        console.error(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to get page data',
        }); 
    }
    
})
// ,{
//     maxAge: 0,
//     // varies:['Cookie'],
//     // getKey: (event) => {
//     //     const key = getRouterParam(event, 'key');
//     //     const path = getRouterParam(event, 'path');
//     //     return `${key}-${path}`;
//     // }
// })

function mapTerms(term){
    const { type, id, attributes } = term

    delete(attributes.revision_created)
    delete(attributes.path)
    
    delete(attributes.content_translation_source)
    delete(attributes.content_translation_outdated)
    delete(attributes.content_translation_created)
    delete(attributes.changed)
    delete(attributes.revision_translation_affected)
    delete(attributes.default_langcode)
    delete(attributes.description)
    delete(attributes.langcode)
    delete(attributes.drupal_internal__revision_id)
    delete(attributes.drupal_internal__tid)


    return { type, id, attributes }
}