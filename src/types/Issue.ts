export type IssuePriority = {
    value: number | string,
    label?: string,
    color?: string,
    bgColor?: string
}

export type IssueStatus = {
    value: number | string,
    label?: string,
    color?: string,
    bgColor?: string
}

export type Issue = {
    name: string,
    description?: string,
    metadata: IssueMetadata,
    local: IssueLocalData
}

export type IssueLocalData = {
    path: string // Path to issue file
}

export type IssueMetadata = {
    id: string,
    priority?: IssuePriority,
    status?: IssueStatus
}