const fse = require('fs-extra')

const readJSONFile = (path) => {
  try {
    const content = fse.readFileSync(path, 'utf-8')
    const data = JSON.parse(content)
    return data
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    return null;
  }
}

module.exports = {
  readJSONFile
}