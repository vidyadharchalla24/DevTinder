
const authAdmin = (req,res,next)=>{
    console.log("Admin middleware");
    const token = "abc";
    const isAdminAuthenticated = token === "abc";
    if(!isAdminAuthenticated){
        res.status(401).send("Unauthorized request!!");
    }
    next();
};

const authUser = (req,res,next)=>{
    console.log("User middleware");
    const token = "abc";
    const isAdminAuthenticated = token === "abc";
    if(!isAdminAuthenticated){
        res.status(401).send("Unauthorized request!!");
    }
    next();
};

module.exports = {
  authAdmin,
  authUser 
}