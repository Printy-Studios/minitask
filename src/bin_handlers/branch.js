/**
 * A command template file 
 */

import Logger from '#functions/Logger.js';
import getIssueFilename from '../functions/getIssueFilename.js';
import getIssueFromFile from '../functions/getIssueFromFile.js';
import { exec } from 'child_process';
import tell from '../../common/utils/tell.js';

const logger = new Logger(true, 'Log');

export const command = 'branch <selector>'

export const describe = 'Create a git branch for selected issue';

/**
 * 
 * @param {{
 *  selector: string
 * }} argv 
 */
export const handler = (argv) => {

    const issueFilename = getIssueFilename(argv.selector);
    const issue = getIssueFromFile(issueFilename);

    exec('git switch -c ' + issue.metadata.id, (err, stdout, stderr) => {
        if(err){
            console.error(stderr);
            return;
        }
        tell('Created branch ' + issue.metadata.id);
    });
}