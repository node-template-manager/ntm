#!/usr/bin/env node


const yargs = require("yargs");
const { init } = require("./commands/init");

yargs
  .scriptName("ntm")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    })
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .command('init [template] [projectPath]', 'create a node project with a template', (yargs) => {
    yargs.positional(
      'template', {
      type: 'string',
      default: 'default',
      describe: 'the template name'
    }).positional('projectPath', {
      type: 'string',
      default: '.',
      describe: 'project root folder'
    })
  }, function (argv) {
    init(argv)
  })
  .help()
  .argv