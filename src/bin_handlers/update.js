// Core
import path from 'path';

// Util
import customPathOrDefault from '#functions/customPathOrDefault.js';
import getIssueFilename from '#functions/getIssueFilename.js';
import getIssueFromFile from '#functions/getIssueFromFile.js';
import saveIssueToFile from '#functions/saveIssueToFile.js';
import tell from '../../common/utils/tell.js';


export const command = 'update <selector>';

export const builder = {
    status: {
        default: undefined,
        type: 'string'
    }
}

/**
 * @param {*} argv 
 */

export const handler = async (argv) => {
    const issueFilename = getIssueFilename(argv.selector);
    const prevIssue = getIssueFromFile(issueFilename);
    const issue = { ...prevIssue };
    // console.log(argv);
    issue.metadata.status = argv.status || issue.metadata.status;

    console.log(issue.metadata);

    /**
     * If issue status changed to 'done',
     * move issue to the /done folder
     */
    const moveToDone = 
        prevIssue.metadata.status !== 'done' && 
        issue.metadata.status === 'done';

    const issuePath = customPathOrDefault() + (issue.metadata.status === 'done' ? "/done" : "");

    // console.log(issuePath);

    saveIssueToFile(issuePath, issue);
    tell('Issue saved');
}
