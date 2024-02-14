const bcrypt=require("bcrypt");
// const saltRounds=15;


function hashPassword(password){
    const salt=bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
}


function comparePassword(raw,hashPassword){
   return bcrypt.compareSync(raw,hashPassword);
}


module.exports={
    hashPassword,
    comparePassword
}


