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

/**
 * Add a new template's name to TEMPLATES array
 * @param {*} element array name
 */
const writeTemplatesFile = (element) => {

  const filePath = path.join(__dirname, '../config/init/templates.js');

  fse.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Internal Error:', err);
      return;
    }

    // Find the position where should be placed TEMPLATES' array
    const beginArray = data.indexOf('const TEMPLATES = [');
    const endArray = data.indexOf(']', beginArray);

    // get content from array
    const arrayContent = data.slice(beginArray, endArray + 1);

    // remake array with the new element
    const newArrayContent = `${arrayContent.slice(0, -1)}, "${element}"]`;

    // replace old array with new one
    const newContent = data.replace(arrayContent, newArrayContent);

    // write new content in the file
    fse.writeFile(filePath, newContent, 'utf8', (err) => {
      if (err) {
        console.error('Internal Error:', err);
      }
    });
  });
}

module.exports = {
  creator,
  writeTemplatesFile
}