const readline = require('readline');
const { COMPONENTS_CONFIG } = require("../config/rct/rctConstants")
const { findFolder } = require('../utils/folders');
const { createFolder } = require('../utils/creator.min');
const path = require('path')
const fse = require('fs-extra')

const rct = (argv) => {
  try {
    const { action } = argv

    createComponent()
  } catch (error) {

  }
}


function askString(phrase) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(phrase, (name) => {
      rl.close();
      resolve(name);
    });
  });
}



const createComponent = () => {
  try {
    const { dest, root } = COMPONENTS_CONFIG

    // ask for the component name
    askString("Introduce the name of your component")
      .then((name) => {
        const currentPath = process.cwd()

        const rootDirectory = findFolder(currentPath, root)

        if (!rootDirectory) {
          throw Error(`${root} folder doesn't exist`)
        }

        //look for dest folder. if doesn't exist, create it
        let destPath = findFolder(rootDirectory, dest)
        if (!destPath) {
          // create destination folder
          createFolder(dest, rootDirectory, null)
          // looks again for it
          destPath = findFolder(rootDirectory, dest)
        }

        /*
         - insert files & folders inside it
         */

        const createTemplatePah = path.join(__dirname, `../config/rct/rct.json`)

        const templateData = readJSONFile(createTemplatePah)

        
        const jsxFile = fse.readFileSync(path.join(__dirname, '../config/rct/files/rct.jsx'))
        const cssFile = fse.readFileSync(path.join(__dirname, '../config/rct/files/rct.css'))


        fse.writeFileSync(`${destPath}/${name}.jsx`, jsxFile)
        fse.writeFileSync(`${destPath}/${name}.css`, cssFile)


      })
      .catch((error) => {
        console.log(error.message)
      })

      

  } catch (error) {
    console.log(error.message)
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
  rct
}