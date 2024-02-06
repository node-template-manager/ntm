const { TEMPLATES } = require("../config/init/templates")


const show = () => {
  console.log("Available templates:")
  TEMPLATES.forEach( temp => console.log(`-> ${temp}`))  
}


module.exports = {
  show
}