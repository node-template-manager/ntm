const { execSync } = require('child_process')


const createDepends = (dependsData, kind = "common") => {
  for (let key in dependsData) {
    if (kind === 'dev') {
      execSync(`npm install -D ${key}@${dependsData[key]}`, { stdio: 'inherit' })
    } else {
      execSync(`npm install ${key}@${dependsData[key]}`, { stdio: 'inherit' })
    }
  }
}

module.exports = {
  createDepends,
}