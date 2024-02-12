import { ensureFileSync } from 'fs-extra';


export const writeSiteDrushConfigFile = (ctx, siteCode) => {

    const fileName = `${getDrushConfigContext(ctx)}/${siteCode}.site.yml`;
    const cwd = `/opt/${env}/${multiSiteCode}`;
    const data = `export default { env: '${env}', multiSiteCode: '${multiSiteCode}' }`;
   // const fileName = `/opt/${env}/${multiSiteCode}/drush.js`;

    return writeJsFile({ fileName, data });
}


export const installDrushOnMultiSite = ({ env, multiSiteCode }) => {

    if(!pathExistsSync(`/opt/${env}/${multiSiteCode}`)) 
        throw new Error(`util/drush/install.installDrushOnMultiSite: MultiSite not found ${cwd}`);

    const cwd    = `/opt/${env}/${multiSiteCode}`;
    const result = spawnSync('composer', [ 'require', 'drush/drush' ], { cwd });

    if (result.error)        throw result.error;
    if (result.status !== 0) throw new Error(`util/drush/install.installDrushOnMultiSite: Failed  ${result.status}`);

    return result;
}
