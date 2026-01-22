import * as _new from './new.js'
import * as init from './init.js'
import * as view from './view.js';
import * as list from './list.js';
import * as update from './update.js';
import * as _delete from './delete.js';

/**
 * Handlers for commands
 * Each command has a dedicated handler with its own module,
 * At the least, a command handler should export a `command` string
 * and a `handler` function.
 * 
 * See more info at: https://github.com/yargs/yargs/blob/HEAD/docs/advanced.md#providing-a-command-module
 * 
 * TODO: Decouple command handling from Yargs.
 */

const commands = [
    _new,
    init,
    view,
    list,
    update,
    _delete
]

export default commands