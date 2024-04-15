const { TEMPLATES } = require('../config/init/templates')
const path = require('path')
const { creator, writeTemplatesFile } = require("../utils/creator")
const fse = require('fs-extra')
const { ERRORS } = require('../constants/constants')
const { readJSONFile } = require('../utils/files.utils')



const create = (argv) => {
  try {
    const { name } = argv

    // template's name must not exists
    if (TEMPLATES.includes(name)) {
      throw Error("TEMP_EXIST")
    }

    writeTemplatesFile(name)

    const newTemplatePath = path.join(__dirname, `../templates/${name}`)

    const createTemplatePah = path.join(__dirname, `../config/create/create.json`)

    const templateData = readJSONFile(createTemplatePah)


    creator(templateData.template, newTemplatePath, name)


  } catch (error) {
    console.log('ntm create error -> ', ERRORS[error.message] ?? error.message)
  }
}




module.exports = {
  create
}