const handleSignin = (req, res, sequelize, bcrypt) => {
  const { email, password } = req.body;
  //   console.log("password", password);
  console.log("request received");
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  sequelize
    .query(
      `
            SELECT
                id, email, password
            FROM
                users
            WHERE
                lower(email) = lower('${email}');
        `
    )
    .then((data) => {
      console.log("data", data[0][0]);
      //   console.log("return", data[0][0].password);
      //   passwordFromPost = data[0][0].password;
      //   console.log("pw", passwordFromPost);
      // //   const hash = bcrypt.hashSync("hello");
      // //   console.log("hash", hash);
      const isValid = bcrypt.compareSync(password, data[0][0].password);
      console.log(isValid);
      if (isValid) {
        return sequelize
          .query(
            `
                    SELECT id, email, first_name
                    FROM users
                    WHERE lower(email) = lower('${email}');
                `
          )
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin,
};
