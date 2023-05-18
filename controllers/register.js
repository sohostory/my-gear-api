const handleRegister = (req, res, sequelize, bcrypt) => {
  const { email, password, first_name } = req.body;
  if (!email || !password || !first_name) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  console.log(email, password, first_name);
  sequelize
    .query(
      `
            INSERT INTO users (email, password, first_name)
            VALUES ('${email}', '${hash}', '${first_name}')
            RETURNING *;
        `
    )
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister,
};
