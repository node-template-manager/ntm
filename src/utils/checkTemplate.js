const fse = require('fs-extra')
const path = require('path')


/**
 * Check if template given exists
 * @param {string} name template's name
 * @returns true if existis / false if not
 */
const checkTemplate = (name) => {
  try {
    // template's JSON file should in this path
    const file = path.join(__dirname, `../templates/${name}/${name}.json`)

    // check if JSON file exists
    return fse.pathExistsSync(file)
  } catch (error) {
    throw error
  }

}


module.exports = {
  checkTemplate,
}