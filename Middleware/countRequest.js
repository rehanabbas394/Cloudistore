const fs = require("fs")

function countRequest(filename) {
    return(req,res,next)=>{
        const data = `\n${Date.now()}: ${req.ip} ${req.method}:${req.path}\n`;

        fs.appendFile(filename,data,(err)=>{
            if(err){
                console.error(`Error writing to log file: ${err.message}`);
            }
            next()
        })
    }
}

module.exports = countRequest 
