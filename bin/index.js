#!/usr/bin/env node

const yargs = require("yargs"); // easy handling of CLI parameters


const distance = require('../modules'); //importing the module that contains calculation logid

const options = yargs.option('s', {
                        alias: 'start',
                        describe: 'Source City',
                        type: 'string' ,
                        demandOption: true //marking as mandatory parameter
                    })
                    // --transportation-method
                    .option('t', {
                        alias: 'transportation-method',
                        describe: 'Means of Transport',
                        type: 'string',
                        demandOption: true, //marking as mandatory parameter
                        choices: Object.keys(distance.vehicletypes) //Enforcing validation on Means of tranport
                    })
                    .option('e', {
                        alias: 'end',
                        describe: 'Destination City',
                        type: 'string',
                        demandOption: true //marking as mandatory parameter
                    }).usage('Usage: $0 --start [string] --end [String]').argv;

distance.findDistance(options);