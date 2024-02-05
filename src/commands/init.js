const path = require('path')
const fse = require('fs-extra')
const { execSync } = require('child_process')
const { creator } = require('../utils/creator')
const { createDepends } = require('../utils/createDepends')
const { TEMPLATES } = require('../config/init/templates')
const { ERRORS } = require('../constants/constants')


const init = (argv) => {

  try {
    const { template, projectPath } = argv

    // if template doesn't exist, throw error
    if (!TEMPLATES.includes(template)) {
      throw Error("TEMP_UNFOUND")
    }

    console.log('Has elegido la plantilla ', template)

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

    console.log("Proyecto iniciado con éxito :)")
  } catch (error) {
    console.error('ntm init error -> ', ERRORS[error.message] ?? error.message)
    if (error.message === "TEMP_UNFOUND") {
      console.log("\nAvailable templates: ")
      TEMPLATES.forEach(value => console.log(`-> ${value}`))
    }
  }
}

const readJSONFile = (path) => {
  try {
    const content = fse.readFileSync(path, 'utf-8')
    const data = JSON.parse(content)
    return data
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error.message);
    return null;
  }
}




module.exports = {
  init,
}