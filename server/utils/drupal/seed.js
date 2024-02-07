import clone from 'lodash.clonedeep';

export async function translateAllContentTerms(ctx){
    const { dbBatch } = useDB();

    const newTerms =[]
    const terms = await getAllContentTaxonomy(ctx);
    for (const locale of ['zh']) {
        const termsClone = clone(terms);


        for (const term of termsClone) {

            term.name                       = await translate({ target: term.name, locale})
            term.langcode                   = 'zh-hans';
            term.default_langcode           = 0; 
            term.content_translation_source = 'en';

            newTerms.push(term);
        }
        
    }

    const guery = `INSERT INTO taxonomy_term_field_data (tid, revision_id, vid, langcode, status, name, weight, changed, default_langcode, revision_translation_affected, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_created ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = cleanContentTaxonomyTermValues(newTerms);
    const resp = await dbBatch(ctx, 'bl2_seed', guery, values);

    const guery2 = `INSERT INTO taxonomy_term_field_revision (tid, revision_id, langcode, status, name, changed, default_langcode, revision_translation_affected, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_created ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values2 = cleanContentTaxonomyRevisionValues(newTerms);
    const resp2 = await dbBatch(ctx, 'bl2_seed', guery2, values2);

    return resp2//resp;
}

export async function getAllMenusEnglish(ctx){
    const { dbGet } = useDB();

    const queryText = 'SELECT id, revision_id, bundle, langcode, title, description, menu_name, link__uri, link__title, CAST(link__options as char) as link__options, external, rediscover, weight, expanded, enabled, parent, changed, default_langcode, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_status, content_translation_created, revision_translation_affected FROM `menu_link_content_data` WHERE langcode = ? ORDER BY `id`,`langcode`;';
    const queryVars = ['en'];

    const response = await dbGet(ctx, 'bl2_seed', queryText, queryVars);

    return response
}

export async function translateAllMenus(ctx){
    const { dbBatch } = useDB();

    const newMenus = []
    const menus    = await getAllMenusEnglish(ctx);
    for (const locale of unLocales) {
        const isZh       = locale === 'zh';
        const menusClone = clone(menus);

        for (const menu of menusClone) {

            menu.title                      = await translate({ target: menu.title, locale});
            if(menu.description)
                menu.description            = await translate({ target: menu.description, locale});

            menu.langcode                   = isZh? 'zh-hans': locale;
            menu.default_langcode           = 0; 
            menu.content_translation_source = 'en';
            menu.content_translation_uid    = 0;
            menu.content_translation_created = Math.round(new Date().getTime()/1000);

            newMenus.push(menu);
        }
    }
    // const guery = `INSERT INTO menu_link_content_data(id, revision_id, bundle, langcode, title, description, menu_name, link__uri, link__title, link__options, external, rediscover, weight, expanded, enabled, parent, changed, default_langcode, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_status, content_translation_created, revision_translation_affected) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // const values = cleanMenuValues(newMenus);
    // const resp = await dbBatch(ctx, 'bl2_seed', guery, values);

    const guery2 = `INSERT INTO menu_link_content_field_revision (id, revision_id, langcode, title, description, link__uri, link__title, link__options, external, enabled, changed, default_langcode, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_status, content_translation_created, revision_translation_affected ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values2 = cleanMenuRevisionValues(newMenus);
    const resp2 = await dbBatch(ctx, 'bl2_seed', guery2, values2);


    return resp2;
}
//Math.round(new Date().getTime()/1000);


function cleanMenuValues(values){
    return values.map(({ id, revision_id, bundle, langcode, title, description, menu_name, link__uri, link__title, link__options, external, rediscover, weight, expanded, enabled, parent, changed, default_langcode, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_status, content_translation_created, revision_translation_affected })=>{ return [id, revision_id, bundle, langcode, title, description, menu_name, link__uri, link__title, link__options, external, rediscover, weight, expanded, enabled, parent, changed, default_langcode, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_status, content_translation_created, revision_translation_affected] });
}

function cleanMenuRevisionValues(values){
    return values.map(({id, revision_id, langcode, title, description, link__uri, link__title, link__options, external, enabled, changed, default_langcode, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_status, content_translation_created, revision_translation_affected })=>{ return [id, revision_id, langcode, title, description, link__uri, link__title, link__options, external, enabled, changed, default_langcode, content_translation_source, content_translation_outdated, content_translation_uid, content_translation_status, content_translation_created, revision_translation_affected] });
}

