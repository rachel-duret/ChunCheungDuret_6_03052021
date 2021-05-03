const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  const username = req.header('username')
  console.log(username);

  if (!accessToken ) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, 'RANDOM_TOKEN_SECRET');
    req.user = validToken;
   console.log(req.user);
    
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };