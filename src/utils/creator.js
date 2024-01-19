const fsa = require('fs-extra')
const path = require('path')

const creator = (templData, projectPath, template = null) => {

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

const createFolder = (key, projectPath, content = null, template = null) => {
  try {
    // create main folder
    fsa.mkdirSync(`${projectPath}/${key}`)

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
    console.log(error)
  }

}

const createFile = (key, projectPath) => {
  fsa.writeFileSync(`${projectPath}/${key}`, 'holiwis')
}

const copyFile = (key, projectPath, template) => {
  const srcFile = path.join(__dirname, `../templates/${template}/files/${key}`)
  fsa.copyFileSync(srcFile, `${projectPath}/${key}`)
}


module.exports = {
  creator,
}