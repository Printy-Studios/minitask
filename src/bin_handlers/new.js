/** @import { Issue } from '../types/Issue' */

//Core
import * as fs from 'fs'
import * as path from 'path'

//Functions
import Logger from '#functions/Logger.js'
import plugins from '#functions/plugins.js'

//Utils
import tell from '../../common/utils/tell.js'

//Constants
import config from '#constants/config.js'

const logger = new Logger(true, 'Log')

export const command = 'new <name> [description]';

export const describe = 'Create a new task';

/**
 * Convert a given string to its slug representation
 * 
 * @param { string } str - string to convert
 * @returns { string } slugified string
 */
const slugify = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
}

/**
 * Save an issue to a file
 * 
 * @param { string } _path - Full path to folder where file should be saved 
 * @param { Issue } issue - The issue object to parse and save.
 * 
 * @returns { void }
 */
const saveIssueToFile = (_path, issue) => {

    //String to be written to file
    let output_str = '---\n\n'

    //Add metadata
    for (const field in issue.metadata) {
        output_str += field + ': ' + issue.metadata[field] + '\n'
    }

    output_str += '\n---\n\n'

    //Add title
    output_str += '# ' + issue.name + '\n\n'

    //Add description
    output_str += issue.description || ''

    fs.writeFileSync(path.join(_path, issue.metadata.id + '.md'), output_str)
}

export const handler = async (argv) => {
    logger.log(argv, 'data')

    if (!argv.name) {
        tell('No name specified, running minitask in interactive mode(TODO)')
        return
    }

    const new_issue = {
        name: argv.name,
        description: argv.description,
        metadata: {
            id: argv.id || slugify(argv.name)
        }
    }

    if (!config) {
        tell('Could not find minitask config file')
        return
    }

    // If there is a custom save function from a plugin, use it instead.
    if (plugins.functions.saveIssueToFile) {
        plugins.functions.saveIssueToFile(config['issues-path'], new_issue)
    } else {
        saveIssueToFile(config['issues-path'], new_issue)
    }

    tell('created new issue!')

}