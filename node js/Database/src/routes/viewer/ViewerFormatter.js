const FormateViewerObj = (viewerObj) => {
    const obj = {};
    obj.id = viewerObj.id;
    obj.name = viewerObj.username;
    obj.email = viewerObj.email;
   

    return obj;
};

module.exports = {
    FormateViewerObj
};