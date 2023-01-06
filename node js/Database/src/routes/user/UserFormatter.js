const FormateUserObj = (userObj) => {
    const obj = {};
    obj.id = userObj.id;
    obj.name = userObj.username;
    obj.email = userObj.email;
   

    return obj;
};

module.exports = {
    FormateUserObj
};