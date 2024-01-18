const fsa = require('fs-extra')

const creator = (templData, path) => {

  for (let key in templData) {
    if (templData[key].type === "folder" && Object.keys(templData[key].content).length > 0) {
      createFolder(key, path, templData[key].content)
    } else if (templData[key].type === "folder" && Object.keys(templData[key].content).length <= 0) {
      createFolder(key, path)

    }

    if (templData[key].type === "file") {
      createFile(key, path)
    }
  }
}

const createFolder = (key, path, content = null) => {
  try {
    // create main folder
    fsa.mkdirSync(`${path}/${key}`)

    if (content !== null) {
      for (let conKey in content) {
        if (content[conKey].type === "folder" && Object.keys(content[conKey].content).length > 0) {
          createFolder(conKey, `${path}/${key}`, content[conKey].content)
        } else if (content[conKey].type === "folder" && Object.keys(content[conKey].content).length <= 0) {
          createFolder(conKey, `${path}/${key}`)
        }

        if (content[conKey].type === "file") {
          createFile(conKey, `${path}/${key}`)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }

}

const createFile = (key, path) => {
  fsa.writeFileSync(`${path}/${key}`, 'holiwis')
}


module.exports = {
  creator,
}