import Handlebars from 'handlebars';
import {   ensureFileSync } from 'fs-extra';
import { writeFileSync, readFileSync } from 'fs';


export const getDrushSiteYmlTemplate = () => {
    const HB   = Handlebars.create();
    const file = readFileSync('server/efs/config/templates/drush.site.yml', 'utf8').toString();

    return HB.compile(file);
}

export const writeDrushSiteYmlTemplate = (ctx, interpolationData) => {
    const compiledTemplate = getDrushSiteYmlTemplate()(interpolationData);
    const context          = getDrushConfigContext(ctx);
    const fileName         = `${context}/${interpolationData.siteCode}.site.yml`;

    ensureFileSync(fileName);
    
    return writeFileSync(fileName, compiledTemplate);
}


