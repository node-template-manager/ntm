const { TEMPLATES } = require('../config/init/templates')
const path = require('path')
const { creator } = require("../utils/creator")
const fse = require('fs-extra')
const { ERRORS } = require('../constants/constants')



const create = (argv) => {
  try {
    const { name } = argv

    // template's name must not exists
    if(TEMPLATES.includes(name)){
      throw Error("TEMP_EXIST")
    }

    const newTemplatePath = path.join(__dirname, `../templates/${name}`)

    const createTemplatePah = path.join(__dirname, `../config/create/create.json`)

    const templateData = readJSONFile(createTemplatePah)


    creator(templateData.template, newTemplatePath, name)


  } catch (error) {
    console.log('ntm create error -> ', ERRORS[error.message] ?? error.message)
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
  create
}