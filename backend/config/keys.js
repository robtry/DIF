if(process.env.NODE_ENV === "production"){
	console.log("Connecting from production")
	module.exports = require('./keys_prod');
}else{
	console.log("Connecting from dev");
	module.exports = require('./keys_dev');
}