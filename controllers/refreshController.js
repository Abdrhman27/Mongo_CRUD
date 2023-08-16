const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefresh =  async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken});
    if(!foundUser) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,decoded) => {
        if(err || foundUser.user !== decoded.user) return res.sendStatus(403);
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign({"UserInfo": {"username": decoded.user, roles: roles}}, process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: "300s"});
        res.json({accessToken})
    });
}

module.exports = {handleRefresh};