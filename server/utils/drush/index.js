import { pathExistsSync, ensureDirSync, moveSync } from 'fs-extra';
import { execSync } from 'child_process';


export const drushCommand = ({ env, multiSiteCode }) => `/opt/${env}/${multiSiteCode}/vendor/bin/drush`

export const drushSqlDump = (ctx) => {

    const { siteCode }     = ctx;
    const { dateTime }     = getTimeParams(ctx);
    const relativeSavePath = `dumps/${siteCode}/${siteCode}-${dateTime}.sql`;
    const savePath         = `${getDrupalContext(ctx)}/dumps/${siteCode}/${siteCode}-${dateTime}.sql`;
    const command          = `${drushCommand(ctx)} @${siteCode} sql:dump --structure-tables-list=cache,cache_*,watchdog --gzip --result-file="${relativeSavePath}"`;

    ensureDirSync();

    execSync(command);

    if(!pathExistsSync(savePath)) throw new Error(`util/drush/index.drushSqlDump: Failed to create ${savePath}`);

    moveSync(savePath, getTempContext(ctx));

}


