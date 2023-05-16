const getData = (req, res, sequelize) => {
  const { id } = req.params;
  sequelize
    .query(
      `
      SELECT
      equipment.name,
      "model",
      "serial_number",
      "purchase_date",
      "price",
      "depreciation",
      "warranty_expire_date",
      store.name,
      insurance.name,
      equipmenttype.name,
      brand.name
      
      
  
  FROM users
      JOIN equipment ON users.id = equipment.user_id
      JOIN store ON equipment.store_id = store.id
      JOIN insurancecompany AS insurance ON equipment.insurance_company_id = insurance.id
      JOIN equipmenttype ON equipment.equipment_type_id = equipmenttype.id
      JOIN brand ON equipment.brand_id = brand.id
      
  
  WHERE
      users.id = ${id};`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
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
