//@ts-check
import { world, system, CommandPermissionLevel, CustomCommandParamType, CustomCommandOrigin, CustomCommandStatus } from '@minecraft/server';
import config from './config.js';

/**
 * @param {CustomCommandOrigin} origin
 * @param {string} fakePlayerName
 * @param {string} message
 */

const aschat = function(origin, fakePlayerName, message){
    if(config.questionMark){
        fakePlayerName = "<" + fakePlayerName + "...?> ";
    }else{
        fakePlayerName = "<" + fakePlayerName + "> ";
    }

    world.sendMessage(fakePlayerName + message);
    return { status: CustomCommandStatus.Success }
};

system.beforeEvents.startup.subscribe((ev) => {
    /**
     * @type { CommandPermissionLevel }
     */
    let permission = CommandPermissionLevel.Any;

    if(config.premission === 1){
        permission = CommandPermissionLevel.GameDirectors
    }
    
    /**
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {import('@minecraft/server').CustomCommandParameter[]} mandatoryParameters 
     * @param {(origin: CustomCommandOrigin, ...args: any[]) => { status: CustomCommandStatus }} callback 
     */
    const registerCommand = function(name, description, mandatoryParameters, callback) {
        ev.customCommandRegistry.registerCommand(
            {
                name,
                description,
                mandatoryParameters,
                permissionLevel: permission,
            },
            callback
        );
    };

    registerCommand(
        "pyuagotto:as",
        "なりすましチャットをします",
        [
            {
                name: "playerName",
                type: CustomCommandParamType.String,
            },
            {
                name: "message",
                type: CustomCommandParamType.String,
            }
        ],
        aschat
    );
});