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

const getEquipment = (req, res, sequelize) => {
  const { serial } = req.params;
  sequelize
    .query(
      `
      SELECT
        type_id AS "type",
        brand_id AS "brand",
        "model" AS "model",
        "serial_number" AS "serial_number",
        "price" AS "price",
        depreciation AS "depreciation",
        "purchase_date" AS "date",
        "warranty_expire_date" AS "warranty",
        store_id AS "store",
        insurance_id AS "insurance"
  
      FROM users
          JOIN equipment ON users.id = equipment.user_id
          JOIN store ON equipment.store_id = store.id
          JOIN insurance ON equipment.insurance_id = insurance.id
          JOIN type ON equipment.type_id = type.id
          JOIN brand ON equipment.brand_id = brand.id
          
      WHERE
          serial_number = '${serial}';`

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

const editEquipment = (req, res, sequelize) => {
  const { serial } = req.params;
  const {
    brand,
    model,
    serial_number,
    date,
    price,
    depreciation,
    warranty,
    store,
    insurance,
    type,
  } = req.body;

  sequelize
    .query(
      `
        UPDATE equipment
        SET 
          model = '${model}', 
          serial_number = '${serial_number}', 
          purchase_date = '${date}', 
          price = '${price}', 
          warranty_expire_date = '${warranty}', 
          store_id = '${store}', 
          insurance_id = '${insurance}', 
          type_id = '${type}', 
          brand_id = '${brand}', 
          depreciation = '${depreciation}'
        WHERE serial_number = '${serial}';
        `
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unable to update data");
    });
};

const deleteEquipment = (req, res, sequelize) => {
  const { serial_number } = req.params;
  sequelize
    .query(
      `
        DELETE FROM equipment
        WHERE serial_number = '${serial_number}';
      `
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unable to delete data");
    });
};

module.exports = {
  addEquipment,
  getEquipment,
  editEquipment,
  deleteEquipment,
};
