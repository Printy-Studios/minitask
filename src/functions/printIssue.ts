//Core
import * as chalk from 'chalk'

//Types
import { IssueRenderers } from 'types/Plugin'
import { 
    Issue, 
    IssuePriority, 
    IssueStatus 
} from 'types/Issue'

//const conditionalBg = (color: string | undefined | null) => color ? chalk.bgHex(color) : chalk
//const conditionalColor = (color: string | undefined | null) => color ? chalk.Color : chalk

const conditionalChalk = <T,>(value: T, chalkBuilder: (value: T) => chalk.Chalk): chalk.Chalk => 
    value ? chalkBuilder.call(chalk, value) : chalk
const conditionalBg = (color: string | undefined | null) => conditionalChalk<string>(color, chalk.bgHex)
const conditionalColor = (color: string | undefined | null) => conditionalChalk<string>(color, chalk.hex)

const printIssueID = (id: string) => {
    console.log(chalk.italic.whiteBright(id))
}

const printIssueName = (name: string) => {
    console.log(chalk.yellow.underline.bold(name))
}

const printIssueStatus = (status: IssueStatus) => {

}

const printIssuePriority = (priority: IssuePriority) => {
    
}

export default function printIssue(issue: Issue, renderers: IssueRenderers) {
    printIssueID(issue.metadata.id) //Pluggable
    console.log('')
    printIssueName(issue.name) //Pluggable
    console.log('')
    renderers.description(issue.description)
}