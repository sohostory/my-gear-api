const handleSeed = (req, res, sequelize) => {
  sequelize
    .query(
      `
        -- Drop tables if they exist
        DROP TABLE IF EXISTS Equipment;
        DROP TABLE IF EXISTS Users;
        DROP TABLE IF EXISTS Store;
        DROP TABLE IF EXISTS InsuranceCompany;
        DROP TABLE IF EXISTS EquipmentType;
        DROP TABLE IF EXISTS Brand;

        -- Create the Users table
        CREATE TABLE Users (
            id serial PRIMARY KEY,
            email text UNIQUE,
            password text,
            first_name text
        );
        
        -- Create the Store table
        CREATE TABLE Store (
            id serial PRIMARY KEY,
            name text NOT NULL,
            location text
        );
        
        -- Create the InsuranceCompany table
        CREATE TABLE InsuranceCompany (
            id serial PRIMARY KEY,
            name text NOT NULL,
            contact_person text,
            phone_number text,
            email text
        );
        
        -- Create the EquipmentType table
        CREATE TABLE EquipmentType (
            id serial PRIMARY KEY,
            name text NOT NULL
        );
        
        -- Create the Brand table
        CREATE TABLE Brand (
            id serial PRIMARY KEY,
            name text NOT NULL
        );
        
        -- Create the Equipment table
        CREATE TABLE Equipment (
            id serial PRIMARY KEY,
            name text NOT NULL,
            model text,
            serial_number text,
            purchase_date date,
            price numeric(10,2),
            depreciation numeric(5,2),
            warranty_expire_date date,
            store_id integer REFERENCES Store(id),
            insurance_company_id integer REFERENCES InsuranceCompany(id),
            equipment_type_id integer REFERENCES EquipmentType(id),
            brand_id integer REFERENCES Brand(id),
            user_id integer REFERENCES Users(id)
        );
        
        -- Insert sample data into the Users table
        INSERT INTO Users (email, password, first_name)
        VALUES
            ('john@example.com', '$2a$10$CIzBNt9/9ntA41XPXu2uPOQcCYx7oUpk5qnaJxYRLCA9sEaspubCW', 'John'),
            ('jane@example.com', 'hashed_password_2', 'Jane');
        
        -- Insert sample data into the Store table
        INSERT INTO Store (name, location)
        VALUES
            ('Camera World', 'New York'),
            ('Lens Emporium', 'Los Angeles'),
            ('Tripod Universe', 'Chicago');
        
        -- Insert sample data into the InsuranceCompany table
        INSERT INTO InsuranceCompany (name, contact_person, phone_number, email)
        VALUES
            ('InsuranceCo A', 'John Smith', '555-1234', 'johnsmith@example.com'),
            ('InsuranceCo B', 'Jane Doe', '555-5678', 'janedoe@example.com');
        
        -- Insert sample data into the EquipmentType table
        INSERT INTO EquipmentType (name)
        VALUES
            ('Camera'),
            ('Lens'),
            ('Tripod');
        
        -- Insert sample data into the Brand table
        INSERT INTO Brand (name)
        VALUES
            ('Nikon'),
            ('Canon'),
            ('Sony'),
            ('Sigma'),
            ('Manfrotto');
        
        -- Insert sample data into the Equipment table
        INSERT INTO Equipment (name, model, serial_number, purchase_date, price, depreciation, warranty_expire_date, store_id, insurance_company_id, equipment_type_id, brand_id, user_id)
        VALUES
            ('Nikon D750', 'D750', 'SN24680', '2022-05-10', 1499.99, 0.2, '2024-05-09', 1, 1, 1, 2, 1),
            ('Canon EF 70-200mm f/2.8L IS III USM', '70-200mm f/2.8L IS III', 'SN13579', '2022-06-15', 2099.99, 0.3, '2024-06-14', 2, 2, 2, 1, 1),
            ('Sony A7 III', 'A7 III', 'SN75309', '2022-07-20', 1999.99, 0.25, '2024-07-19', 1, 1, 1, 3, 2),
            ('Sigma 35mm f/1.4 DG HSM Art', '35mm f/1.4 Art', 'SN97531', '2022-08-25', 799.99, 0.15, '2024-08-24', 3, 2, 2, 4, 2),
            ('Manfrotto BeFree Compact Aluminum Travel Tripod', 'BeFree Compact', 'SN65432', '2022-09-30', 169.99, 0.1, '2024-09-29', 1, 2, 3, 5, 1);         
      `
    )
    .then(() => {
      console.log("DB seeded successfully");
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  handleSeed,
};
