const fse = require('fs-extra')
const path = require('path')

/**
 * Find a the path of a folder given
 * @param {*} currentPath 
 * @param {*} folder 
 * @returns folder path if exists
 */
const findFolder = (currentPath, folder) => {
  const origin = path.join(currentPath, folder);

  if (fse.existsSync(origin) && fse.statSync(origin).isDirectory()) {
    return origin;
  }

  const folderPath = path.dirname(currentPath);
  if (folderPath === currentPath) {
    return false
  }

  return findFolder(folderPath, folder);
};



module.exports = {
  findFolder
}