/**
 * Delete an issue
 */

import Logger from '#functions/Logger.js';
import deleteFile from '../functions/deleteFile.js';
import getIssueFilename from '../functions/getIssueFilename.js';
import getIssueFromFile from '../functions/getIssueFromFile.js';
import tell from '../../common/utils/tell.js';

const logger = new Logger(true, 'Log');

export const command = 'delete <selector>'

export const describe = 'Delete an issue';

/**
 * 
 * @param { {
 *  selector: string
 * } } argv 
 */
export const handler = (argv) => {
    
    const filename = getIssueFilename(argv.selector);
    const issue = getIssueFromFile(filename);

    deleteFile(issue.local.path);

    tell("Deleted " + issue.name);

}