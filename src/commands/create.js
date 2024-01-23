const { checkTemplate } = require("../utils/checkTemplate")
const path = require('path')



const create = (argv) => {
  try {
    const { name } = argv

    // template's name must not exists
    if(checkTemplate){
      throw Error("name already exists")
    }

    const newTemplatePath = path.join(__dirname, `../templates/${template}/`)



  } catch (error) {
    console.log('ntm create error -> ', error.message)
  }
}

module.exports = {
  create
}