import slug from 'limax';
import camelCaseKeys from 'camelcase-keys';


export async function getContentTerms ({ localizedHost, locale='en', flat=true, camelCase=true }={  }) {
    const jsonIncludes  = flat? '?jsonapi_include=1' : '';
    const uri           = `${localizedHost}/jsonapi/taxonomy_term/tags${jsonIncludes}`;
    const method        = 'get';
    const headers       = { 'Content-Type': 'application/json' };


    const { data } = await $fetch(uri, { method, headers });


    return camelCase? data.map((data)=> ({ ...camelCaseKeys(data,  {deep: true}), slug: slug(data.name, { lang:  locale}) })) : data
};



export function cleanContentTaxonomyTermValues(values){
    return values.map(({ tid, revision_id, vid, langcode, status, name, weight, changed, default_langcode, revision_translation_affected, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_created })=>{ return [tid, revision_id, vid, langcode, status, name, weight, changed, default_langcode, revision_translation_affected, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_created] });
}
export function cleanContentTaxonomyRevisionValues(values){
    return values.map(({ tid, revision_id,  langcode, status, name,  changed, default_langcode, revision_translation_affected, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_created })=>{ return [tid, revision_id, langcode, status, name, changed, default_langcode, revision_translation_affected, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_created] });
}


export async function getAllContentTaxonomyEnglish(ctx){


    const { dbGet } = useDB();

    const queryText = 'SELECT * FROM `taxonomy_term_field_data` WHERE vid = ? AND langcode = ? ORDER BY `tid`,`langcode`;';
    
    const queryVars = ['tags', 'en'];
    const response = await dbGet(ctx, 'bl2_seed',queryText, queryVars);

    return response
}