const getData = (req, res, sequelize) => {
  const { id } = req.params;
  sequelize
    .query(
      `
      SELECT
        type.name AS "Type",
        brand.name AS "Brand",
        "model" AS "Model",
        "serial_number" AS "Serial Number",
        "price" AS "Purchase Price",
        Round((price * (1-depreciation)), 2) AS "Current Value",
        "purchase_date" AS "Purchase Date",
        "warranty_expire_date" AS "Warranty Expire Date",
        store.name AS "Store Name",
        insurance.name AS "Insurance Company"
  
      FROM users
          JOIN equipment ON users.id = equipment.user_id
          JOIN store ON equipment.store_id = store.id
          JOIN insurance ON equipment.insurance_id = insurance.id
          JOIN type ON equipment.equipment_type_id = type.id
          JOIN brand ON equipment.brand_id = brand.id
          
      WHERE
          users.id = ${id};`

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

module.exports = {
  getData,
};
