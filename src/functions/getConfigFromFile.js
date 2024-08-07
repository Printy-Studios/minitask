/** @import { MinitaskConfig } from '../types/Config.js' */

import * as path from 'path';
import url from 'url';

import findFileUp from '#utils/findFileUp.js';

import { minitask_config_schema } from '#constants/schema.js';

//Util
import Logger from './Logger.js';

//Functions
import JSONValidator, { JSONSchemaEntryResponse } from './JSONValidator.js';

const logger = new Logger(true, 'Log');

/**
 * Find the config file and convert it to an object
 * 
 * @throws if file is not found or config schema
 * 
 * @returns { Promise<MinitaskConfig> } Pormise resolving to a MinitaskConfig object
 * 
 */
export default async function getConfigFromFile() {

    const INIT_CWD = /** @type { string } */ (process.env.INIT_CWD);

    const config_file_json = findFileUp('minitask.json', (INIT_CWD), true, 5);
    const config_file_js = findFileUp('minitask.js', INIT_CWD, false, 5);


    let file_path;
    let config;

    /* 
        Load either .js or .json, whichever is found(.js checked first). 
        Throw error if neither are found 
    */
    if ( config_file_js ) {
        
        config = (await import(url.pathToFileURL(path.join(config_file_js.path, 'minitask.js')).href)).default
        file_path = config_file_js.path
        logger.log('Found minitask.js config file at ' + file_path)
    } else {
        //.json config is deprecated
        //config = JSON.parse(config_file_json.str)
        //file_path = config_file_json.path
        //logger.log('Found minitask.json config file at ' + file_path)
        throw new Error('Could not find minitask config file')
    }


    //Validate config schema
    logger.log('Validating config schema')

    const validation_response = JSONValidator.validate(config, minitask_config_schema)

    //If validation failed, parse response and throw it
    if (validation_response !== JSONSchemaEntryResponse.SUCCESS) {
        let err_message = ''
        const entry_name = validation_response[0].entry_name
        switch (validation_response[0].response) {
            case JSONSchemaEntryResponse.REQUIRED: {
                err_message = `${entry_name} is required`
                break
            }
            case JSONSchemaEntryResponse.TYPE: {
                err_message = `${entry_name} is of wrong type`
                break
            }
            case JSONSchemaEntryResponse.UNSPECIFIED: {
                err_message = `unknown property ${entry_name}`
                break
            }
        }
        throw new Error('Invalid minitask config: ' + err_message)
    }

    config['issues-path'] = path.resolve(file_path, config['issues-path'])

    return config;
}