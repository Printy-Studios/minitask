/** @import { MinitaskConfig } from '../types/Config' */

// Core
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

// Functions
import plugins from '#functions/plugins.js';

// Constants
import config, { loadConfig } from '#constants/config.js';

// Commands
import commands from '#bin_handlers/index.js';

// Initialize plugins
const init = async () => {
    await loadConfig();
    await plugins.init(/** @type { MinitaskConfig } */(config));
    await plugins.loadModules();
}

const start = async () => {
    await init();
    const args = yargs(hideBin(process.argv))
        .strict()
        .command(commands)//addCommands(yargs, commands).argv
        .parse();
}

start();




    
