const fse = require('fs-extra')
const path = require('path')

/**
 * Create files & folder from template's JSON configuration file
 * 
 * @param {JSON} templData description of template's files & project 
 * @param {string} projectPath project's path 
 * @param {string} template template's name
 */
const creator = (templData, projectPath, template = null) => {
  try {
    let isRoot = Object.keys(templData)[0] === "root"

    if (isRoot) {
      const rootPath = path.join(__dirname, '../templates')
      createFolder(template, rootPath, templData["root"].content, template)
    } else {

      for (let key in templData) {
        if (templData[key].type === "folder" && Object.keys(templData[key].content).length > 0) {
          createFolder(key, projectPath, templData[key].content, template)
        } else if (templData[key].type === "folder" && Object.keys(templData[key].content).length <= 0) {
          createFolder(key, projectPath, template)

        } else if (templData[key].type === "file" && !templData[key].isCreated) {
          createFile(key, projectPath)
        } else if (templData[key].type === "file" && templData[key].isCreated) {
          copyFile(key, projectPath, template)
        }
      }
    }



  } catch (error) {
    throw error
  }

}

/**
 * Create a folder and its file if content is not null
 * 
 * @param {string} key folder's name 
 * @param {string} projectPath folder's path
 * @param {JSON} content folder's content
 * @param {string} template template's name
 */
const createFolder = (key, projectPath, content = null, template = null) => {
  try {
    // create main folder
    fse.mkdirSync(`${projectPath}/${key}`)

    if (content !== null) {
      for (let conKey in content) {
        if (content[conKey].type === "folder" && Object.keys(content[conKey].content).length > 0) {
          createFolder(conKey, `${projectPath}/${key}`, content[conKey].content, template)
        } else if (content[conKey].type === "folder" && Object.keys(content[conKey].content).length <= 0) {
          createFolder(conKey, `${projectPath}/${key}`, template = template)
        }

        if (content[conKey].type === "file" && !content[conKey].isCreated) {
          createFile(conKey, `${projectPath}/${key}`)
        } else if (content[conKey].type === "file" && content[conKey].isCreated) {
          copyFile(conKey, `${projectPath}/${key}`, template)
        }
      }
    }
  } catch (error) {
    throw error
  }

}

/**
 * Create a new empty file
 * 
 * @param {string} key file's name
 * @param {string} projectPath file's path
 */
const createFile = (key, projectPath) => {
  try {
    fse.writeFileSync(`${projectPath}/${key}`, '# fill it please')
  } catch (error) {
    throw error
  }
}

/**
 * Copy a file to another route
 * 
 * @param {string} key file's name to copy 
 * @param {string} projectPath destination route
 * @param {string} template template's name given
 */
const copyFile = (key, projectPath, template) => {
  try {
    let srcFile = ""
    if (key === "root.json") {
      srcFile = path.join(__dirname, `../config/create/${key}`)
      key = template + '.json'
    } else {

      srcFile = path.join(__dirname, `../templates/${template}/files/${key}`)

    }

    fse.copyFileSync(srcFile, `${projectPath}/${key}`)
  } catch (error) {
    throw error
  }

}

const writeTemplatesFile = (element) => {

  const filePath = path.join(__dirname, '../config/init/templates.js');

  fse.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }

    // Busca la posición donde se encuentra el array TEMPLATES
    const inicioArray = data.indexOf('const TEMPLATES = [');
    const finArray = data.indexOf(']', inicioArray);

    // Extrae el contenido del array TEMPLATES
    const contenidoArray = data.slice(inicioArray, finArray + 1);

    // Construye el nuevo contenido del array con el nuevo elemento
    const nuevoContenidoArray = `${contenidoArray.slice(0, -1)}, "${element}"]`;

    // Reemplaza el antiguo contenido del array con el nuevo
    const nuevoContenido = data.replace(contenidoArray, nuevoContenidoArray);

    // Escribe el nuevo contenido en el archivo
    fse.writeFile(filePath, nuevoContenido, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
      } else {
        console.log('Elemento añadido con éxito al array TEMPLATES');
      }
    });
  });
}

module.exports = {
  creator,
  writeTemplatesFile
}