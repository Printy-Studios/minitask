/** @import { Issue } from "../types/Issue.js" */

//Core
import * as fs from 'fs';
import * as path from 'path';
import yamlFront from 'yaml-front-matter';

import Logger from './Logger.js';
import customPathOrDefault from './customPathOrDefault.js';
import tell from '../../common/utils/tell.js';

const logger = new Logger(true, 'Log');

/**
 * Parse issue from given file and return it
 * 
 * @param filename file name of issue with extension
 * @param { string } [custom_dir]  (optional) custom directory. If not specified, issues-path specified in config is used
 * 
 * @returns { Issue } 
 */
export default function getIssueFromFile(filename, custom_dir) {

    logger.log('Getting issue from file ' + filename);

    let target_path = customPathOrDefault(custom_dir);    
    
    let fullPath = path.join(target_path, filename);
    const foundFile = fs.existsSync(fullPath);

    if(!foundFile) {
        fullPath = path.join(target_path, 'done', filename);
        const foundFileInDone = fs.existsSync(fullPath);
        if(!foundFileInDone) {
            throw 'Could not find issue ' + filename;
        }
    }
    

    const issue_str = fs.readFileSync(fullPath, { encoding: 'utf-8'});

    /**
     * @type { object }
     */
    const issue_raw_json = yamlFront.safeLoadFront(issue_str, { contentKeyName: 'description'});

    let name = (issue_raw_json.description).match(/# .*(\r\n|\r|\n)/g)[0];
    name = name.replace(/(\r\n|\r|\n)/, '');

    issue_raw_json.description = issue_raw_json.description.replace(/# .*(\r\n|\r|\n)/, '');

    const issue = {
        name: name,
        description: issue_raw_json.description,
        metadata: {
            id: issue_raw_json.id,
            priority: issue_raw_json.priority,
            status: issue_raw_json.status,
        },
        local: {
            path: fullPath
        }
    };

    return issue;
}