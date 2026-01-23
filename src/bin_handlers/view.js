/** @import { IssueParsers, IssueRenderers, ParseIssueDescriptionFunction, PrintIssueDescriptionFunction } from '../types/Plugin.js' */

//Functions
import printIssue from '#functions/printIssue.js'
import plugins from '#functions/plugins.js'
import getIssueFromFile from '#functions/getIssueFromFile.js'
import getIssueFilename from '../functions/getIssueFilename.js';
import tell from '../../common/utils/tell.js';

/**
 * Print a description of an issue
 * 
 * @param { string } description - the description of the issue
 * @param { ParseIssueDescriptionFunction[] } parsers - parsers to parse the description
 * before printing it
 */
const printIssueDescription = (description, parsers = []) => {
    for(const parser of parsers) {
        description = parser(description);
    }
    tell(description);
}

export const command = 'view <selector>' //Currently only supports ID selector

export const handler = async (argv) => {

    //plugins.loadConstants #TODO

    const issueFilename = getIssueFilename(argv.selector);

    const issue = await getIssueFromFile(issueFilename) //Update to be able to use selectors other than ID

    /**
     * @type { IssueRenderers }
     */
    const renderers = {
        description: printIssueDescription
    }

    if( plugins.functions.printIssueDescription ) {
        renderers.description = plugins.functions.printIssueDescription
    }

    /**
     * @type { IssueParsers }
     */
    const parsers = {
        description: plugins.functions.parseIssueDescription
    }

    printIssue(issue, renderers, parsers)

    // if (plugins.functions.saveIssueToFile) {
    //     plugins.functions.saveIssueToFile(config['issues-path'], new_issue)
    // } else {
    //     saveIssueToFile(config['issues-path'], new_issue)
    // }
}