import customPathOrDefault from './customPathOrDefault.js';
import fs from 'fs';
import path from 'path';
import listIssues from './listIssues.js';

export default function getIssueFilename(selector, customDir) {
    // let target_path = customPathOrDefault(customDir);    


    let issueId;
    
    // If selector is a number, find issue by index
    if(typeof selector === 'number') {
        const issues = listIssues(customDir);
        issueId = issues[selector];
    } else {
        issueId = selector;
    }

    const filename = issueId + '.md';

    return filename;
}