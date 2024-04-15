const path = require('path')
const fse = require('fs-extra')
const { execSync } = require('child_process')
const { creator } = require('../utils/creator')
const { createDepends } = require('../utils/createDepends')
const { TEMPLATES } = require('../config/init/templates')
const { ERRORS } = require('../constants/constants')
const { readJSONFile } = require('../utils/files.utils')


const init = (argv) => {

  try {
    const { template, projectPath } = argv

    // if template doesn't exist, throw error
    if (!TEMPLATES.includes(template)) {
      throw Error("TEMP_UNFOUND")
    }

    console.log('You have choose template ', template)

    // execute npm init
    execSync('npm init -y')

    const templatePath = path.join(__dirname, `../templates/${template}/${template}.json`)

    const templateData = readJSONFile(templatePath)

    // create files & folders
    creator(templateData.project, projectPath, template)

    // create node dependencies
    createDepends(templateData.dependencies)

    // create node dev dependencies
    createDepends(templateData.devDependencies, kind = 'dev')

    console.log("Project initiated successfully :)")
  } catch (error) {
    console.error('ntm init error -> ', ERRORS[error.message] ?? error.message)
    if (error.message === "TEMP_UNFOUND") {
      console.log("\nAvailable templates: ")
      TEMPLATES.forEach(value => console.log(`-> ${value}`))
    }
  }
}





module.exports = {
  init,
}