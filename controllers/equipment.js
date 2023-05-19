const addEquipment = (req, res, sequelize) => {
  const {
    user_id,
    brand_id,
    model,
    serial_number,
    purchase_date,
    price,
    warranty_expire_date,
    store_id,
    insurance_id,
    type_id,
  } = req.body;
  console.log(req.body);
  sequelize
    .query(
      `
     INSERT INTO equipment (model, serial_number, purchase_date, price, depreciation, warranty_expire_date, store_id, insurance_id, type_id, brand_id, user_id)
            
     VALUES ('${model}', '${serial_number}', '${purchase_date}', '${price}', '0.2', '${warranty_expire_date}', '${store_id}', '${insurance_id}', '${type_id}', '${brand_id}', '${user_id}')`

      //   type: sequelize.QueryTypes.SELECT,
      // }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unable to get data");
    });
};

const getSelectData = (req, res, sequelize) => {
  const { table } = req.params;
  sequelize
    .query(
      `
        SELECT *
        FROM ${table};
      `
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unable to get data");
    });
};

module.exports = {
  addEquipment,
  getSelectData,
};
