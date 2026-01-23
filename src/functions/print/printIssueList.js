import tell from '../../../common/utils/tell.js';

/**
 * Print a list of issues
 * @param { string[] } issueNames - an array of issue names to print
 * 
 * @returns { void }
 */
export default function printIssueList(issueNames) {
    for(let i = 0; i < issueNames.length; i++) {
        tell(i, issueNames[i]);
        //console.log(issueName);
    }
}