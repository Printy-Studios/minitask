# mini-task
**mini-task** is a file based issue tracker CLI. The intent of this program is to
provide a way for small teams to manage their issues easily, without having to leave their project's environment.

**Features:**

 - **File based** - all issues are stored as human-readable markdown files and
 can be edited/viewed without the CLI
 - **CLI** - the CLI can be used to quickly browse tasks, view, edit, create, delete them.
 - **Offline support** - since all the tasks are stored on your computer as readable files,
 you can view and manage them even while offline.
 - **Lightweight** - mini-task was intended to be light and fast from the very start.
 It offers only the basic functions needed to manage issues. But if you want something more...
 - **Extensible** - to counter its simplicity, mini-task is designed to be extensible

## Setup

To use **mini-task**, you first need to install it either **globally** or into your project

**globally**:
```
npm i -g mini-task
```

**project**:
```
npm i mini-task
```

Next, you have to create a new mini-task project. This can be done by running `minitask init` or by creating a `minitask.js` file and populating it with options (see [config.md](./docs/config.md) for list of options).

`minitask init` will run you through an interactive questionnaire to help you set up your project. If you want to skip the questionnaire and just initialize a project with the default settings, run `minitask init -y`.

Now you have your mini-task project set up, you can start creating issues. See the sections below on how to do that

## Using the CLI

mini-task has two ways how you can use it - with an interactive CLI or through direct commands. If you want to use the interactive CLI, simply run `minitask`, otherwise see the [Commands section](#commands) to see how to run individual commands.

mini-task uses [marked-terminal](https://www.npmjs.com/package/marked-terminal) for rendering the markdown of the issue descriptions. The rendering logic comes as a plugin that is installed by default. You can alter the style of the rendered markdown through user settings by using `minitask settings` or editing the configuration file. If you would like to write your own renderer/parser, please refer to [plugins.md](./docs/plugins.md)

## Commands

`minitask` - Run the interactive CLI.

`minitask init -y` - Initialize a new mini-task project by answering a few questions. `-y` to skip the questions and initialize with default settings.

`minitask new [name] <description> --status|s --priority|p --tags|-t --id --assignee` -
Create a new issue.

`minitask edit [id|name|description] --name --description --status --priority --tags --id --assignee` - 
Edit an existing issue, selecting by either `id`, `name` or `description`. Using `id` or `name` will do an exclusive search (selector must match exactly) , while using `description` will use an inclusive search (selector must match only part of text)

`minitask delete [id|name|description] -all` - Delete an existing issue, selecting by either `id`, `name` or `description`.  Using `id` or `name` will do an exclusive search (selector must match exactly) , while using `description` will use an inclusive search (selector must match only part of text). If multiple issue are found, the action is cancelled unless the `-all` flag has been specified.

`minitask list [preset-name] --status --priority --tags --id --name --description --assignee --sortby --sortorder` - List issues with the ability to filter and sort. It's possible to create filter/sort presets and default filters/sort in `minitask.js`.

`minitask view [id|name|description]` - View issue, selecting by either `id`, `name` or `description`.

## File-based storage

All issues are stored as Markdown files. This allows an issue to be easily viewed/edited/created without the need for the CLI. The issue's metadata is stored as [front matter](https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/?utm_content=cmp-true), except for the title and description. A typical issue file will look something like this:

```md
---

status: 'doing'
priority: 2
tags: [ "api", "movies" ]
assignee: "JorensM"

---

# Create `POST` handler for the `api/movies` endpoint

We currently have `GET` set up on `api/movies`, but we would like for it to be possible to also add new movies through `POST`

## Request format

The request body should have the following properties: 

 - `name`       - *required* - name of the movie
 - `date`       - *required* - release date of the movie
 - `genre`      - *required* - genre of movie
 - `description - *optional* - description of the movie

## Response format

The response should return with the status code appropriate for the outcome of the call, and also return the following data:

 - `message` - the message describing the status of the call, or an error message in case of an error
```

As you can see the file is a regular, readable Markdown file. At the very top you have the front matter that defines the metadata of the issue, also in a human-readable format.

mini-task can be extended to support other file formats as well!

## mini-task.json|js

The `minitask.js` file specifies the project scoped settings.

A typical configuration looks like this:

```
{
    "issues-path": "./issues"
    "tags": {
      "bug": "chalk.red",
      "feature": "chalk.yellow",
      "improvement": "chalk.blue",
      "api": "chalk.white",
      "movies": "chalk.white",
      "design": "chalk.white"
    },
    "statuses": {
      "backlog": "chalk.gray",
      "todo": "chalk.white",
      "done": "chalk.green",
      "doing": "chalk.yellow"
    },
    "assignees": [
      "JorensM",
      "John Doe"
    ],
    "list-presets": [
      "backlog": {
        "status": "backlog"
        "sortby": "priority"
        "sortorder": "desc"
      }
      "movies": {
        "status": "todo",
        "sortby": "priority",
        "sortorder: "desc"
      }
    ]
    "plugins": {
      "markdown-renderer": {
        "enabled": true,
        "heading": "#fcba03",
        "code": "#849680"
      }
    }
}
```

### Properties

 -  `issues-path`    - **required** - defines the path for the folder where the issue files will be stored
 -  `tags` - defines the tags to be used when creating/editing issues. Should be formatted like so:
    ```
      "tags": {
        "name": "color"
        "name": "color"
      }
    ```
    You can omit the color and just pass `true`
 -  `statuses` - defines the statuses to be used when creating/editing issues. Follows same format as `tags`
 -  `assignees` - defines the possible assignees to an issue, follows same format as `tags`
 -  `list-presets` - defines the presets for when using `minitask list`. Should follow the following format:
    ```
      "list-presets": {
        "preset-name": {
          "arg1": "value",
          "arg2": "value"
        } 
      }
    ```
    Where `arg#` is the name of the `list` command's arg

## minitask-user.json

`minitask-user.json` holds settings for the user using the CLI. They are global and persist between projects. It resides in `C:/AppData/minitask`. By default this file is not created, and you must create it yourself either manually or by running `minitask init-user`. Alternatively, the file gets created if you update a user setting from `minitask settings`.

## Plugins

minitask has fairly extensive support for plugins. Things that you can do with the plugin include:

 * Altering the output, such as -
   * Menu elements such as titles and options
   * Issue elements such as description, name, priority etc.
 * Altering the functions that handle text output, i.e the functions such as `tell()` and `log()`
 * Altering the functions that handle input
 * Adding additional metadata to issues

minitask has several native plugins developed by the minitask team itself, these are:
 * markdown-renderer - style your makrdown descriptions with custom colors, underlines etc.
 * txt-format - use `.txt` format instead of `.md` for storing issues

## Developing a plugin

Developing a plugin is pretty easy. A basic plugin will have at least the following 2 files:
  * `index.json` - plugin config and metadata
  * `index.ts|js` - plugin code and exports that will be imported by minitask

### `index.json`

This file holds metadata and configuration for the plugin, required is only a single property - `id` - that should be a unique string identifying your plugin and should match the folder name of the plugin

### `index.ts|js`

This is the entry file of your plugin. This file will be imported by minitask when loading plugins, so you must export all the functions/variables that interact with minitask here.

**The export format**

The exports in `index.ts|js` must follow a specific format. You can export an object called `functions` for the functions, and an object called `constants` for the constants. Both are optional. In the respective objects, you can store functions/variables matching the name of a minitask plugin function/variable that will be called by minitask. For example you can have a `functions` object like this: 

```
  export const functions = {
    parseIssueDescription: (description: string) => {...}
    parseIssueName: (name: string) => {...}
  }
```

`parseIssue___()` functions are used to alter the respective issue data before they are output to the console. So when you add them to the `functions` export, they will be called by minitask at appropriate times, and minitask will output your altered versions of the text

That's the basic gist of it. You can visit [the Plugins API](#) for reference of all available functions and constants

## Project development

### Setup

If you want to work on the project: 
 1. Clone the repo
 2. run `npm install` to install dependencies
 3. run `npm run build` to build project
 3. run `npm run minitask` to run minitask
