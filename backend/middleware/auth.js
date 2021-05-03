const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  const username = req.header('username')
  console.log(username);

  if (!accessToken ) return res.status(401).json({ message: "User not logged in!" });

  try {
    const validToken = verify(accessToken, 'RANDOM_TOKEN_SECRET');
    req.user = validToken;
  
    
    if (validToken) {
      return next();
    }
  } catch(err)  {
    return res.json({error:err });
  }
};

module.exports = { validateToken };