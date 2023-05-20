const getAccount = (req, res, sequelize, bcrypt) => {
  const { id } = req.params;
  sequelize
    .query(
      `
        SELECT
            email AS "email",
            first_name AS "first_name"
        FROM users
        WHERE id = ${id};`
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unable to get data");
    });
};

const updateAccount = (req, res, sequelize, bcrypt) => {
  const { id, email, password, newPassword, first_name } = req.body;
  if (!email || !password || !first_name) {
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
            id = ${id};
    `
    )
    .then((data) => {
      console.log("data", data[0][0]);
      const isValid = bcrypt.compareSync(password, data[0][0].password);
      if (isValid) {
        const hash = bcrypt.hashSync(newPassword);
        sequelize
          .query(
            `
                UPDATE users
                SET email = '${email}', password = '${hash}', first_name = '${first_name}'
                WHERE id = ${id};
                RETURNING *;
            `
          )
          .then((user) => {
            console.log("user", user);
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to update user"));
      } else {
        res.status(400).json("wrong credentials");
        console.log("failed password test");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  getAccount,
  updateAccount,
};
