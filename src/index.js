#!/usr/bin/env node


const yargs = require("yargs");
const { init } = require("./commands/init");
const { create } = require("./commands/create");
const { rct } = require("./commands/rct");

yargs
  .scriptName("ntm")
  .usage('$0 <cmd> [args]')
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
  .command('create <name>', 'create an empty template', (yargs) => {
    yargs.positional(
      'name', {
      type: 'string',
      describe: 'template name'
    }
    )
  }, function (argv) {
    create(argv)
  })
  .command(['react', 'rct <action>'], 'make an action for React projects', (yargs) => {
    yargs.positional(
      'action', {
        type: 'string',
        describe: 'action to do',
        choices: [
          'component',
          'route',
          'hook'
        ]
      }
    )
  }, function(argv){
    rct(argv)
  })
  .help()
  .argv