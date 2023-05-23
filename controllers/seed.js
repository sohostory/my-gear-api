const handleSeed = (req, res, sequelize, bcrypt) => {
  const hash1 = bcrypt.hashSync("password1");
  const hash2 = bcrypt.hashSync("password2");

  sequelize
    .query(
      `
        -- Drop tables if they exist
        DROP TABLE IF EXISTS Equipment;
        DROP TABLE IF EXISTS Users;
        DROP TABLE IF EXISTS Store;
        DROP TABLE IF EXISTS Insurance;
        DROP TABLE IF EXISTS Type;
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
            location text,
            user_id integer REFERENCES Users(id)
        );
        
        -- Create the Insurance table
        CREATE TABLE Insurance (
            id serial PRIMARY KEY,
            name text NOT NULL,
            contact_person text,
            phone_number text,
            email text,
            user_id integer REFERENCES Users(id)
        );
        
        -- Create the Type table
        CREATE TABLE Type (
            id serial PRIMARY KEY,
            name text NOT NULL,
            user_id integer REFERENCES Users(id)
        );
        
        -- Create the Brand table
        CREATE TABLE Brand (
            id serial PRIMARY KEY,
            name text NOT NULL,
            user_id integer REFERENCES Users(id)
        );
        
        -- Create the Equipment table
        CREATE TABLE Equipment (
            id serial PRIMARY KEY,
            model text NOT NULL,
            serial_number text,
            purchase_date date,
            price numeric(10,2),
            depreciation numeric(5,2),
            warranty_expire_date date,
            store_id integer REFERENCES Store(id),
            insurance_id integer REFERENCES Insurance(id),
            type_id integer REFERENCES Type(id),
            brand_id integer REFERENCES Brand(id),
            user_id integer REFERENCES Users(id)
        );
        
        -- Insert sample data for User 1
        INSERT INTO Users (email, password, first_name) VALUES
            ('john@example.com', '${hash1}', 'John');
        
        -- Insert sample data for User 1's stores
        INSERT INTO Store (name, location, user_id) VALUES
            ('B&H Photo Video', 'New York, NY', 1),
            ('Adorama', 'New York, NY', 1),
            ('KEH Camera', 'Smyrna, GA', 1);
        
        -- Insert sample data for User 1's insurance companies
        INSERT INTO Insurance (name, contact_person, phone_number, email, user_id) VALUES
            ('Photographers Insurance Co.', 'Sarah Johnson', '555-1234', 'sarah@photographersinsuranceco.com', 1),
            ('SecureLens Insurance', 'Michael Smith', '555-5678', 'michael@securelens.com', 1),
            ('CameraInsure', 'Emily Brown', '555-9012', 'emily@camerainsure.com', 1);
        
        -- Insert sample data for User 1's equipment types
        INSERT INTO Type (name, user_id) VALUES
            ('Camera Body', 1),
            ('Lens', 1),
            ('Tripod', 1);
        
        -- Insert sample data for User 1's equipment brands
        INSERT INTO Brand (name, user_id) VALUES
            ('Canon', 1),
            ('Nikon', 1),
            ('Sony', 1);
        
        -- Insert sample data for User 1's equipment
        INSERT INTO Equipment (model, serial_number, purchase_date, price, depreciation, warranty_expire_date, store_id, insurance_id, type_id, brand_id, user_id) VALUES
            -- Camera bodies
            ('EOS 5D Mark IV', 'C12345', '2022-05-15', 2499.99, 0.2, '2024-05-15', 1, 1, 1, 1, 1),
            ('D850', 'N67890', '2022-06-01', 2999.99, 0.18, '2024-06-01', 2, 2, 1, 2, 1),
            ('Alpha a7 III', 'S54321', '2022-07-10', 1999.99, 0.15, '2024-07-10', 1, 3, 1, 3, 1),
            ('EOS R6', 'C24680', '2022-08-20', 2499.99, 0.2, '2024-08-20', 1, 1, 1, 1, 1),
            ('Z7 II', 'N13579', '2022-09-05', 2999.99, 0.18, '2024-09-05', 2, 2, 1, 2, 1),

            -- Lenses
            ('EF 24-70mm f/2.8L II USM', 'C98765', '2022-05-20', 1599.99, 0.15, '2024-05-20', 1, 1, 2, 1, 1),
            ('AF-S Nikkor 70-200mm f/2.8E FL ED VR', 'N54321', '2022-06-10', 2199.99, 0.18, '2024-06-10', 2, 2, 2, 2, 1),
            ('FE 24-70mm f/2.8 GM', 'S24680', '2022-07-25', 1999.99, 0.15, '2024-07-25', 1, 3, 2, 3, 1),
            ('EF 50mm f/1.4 USM', 'C13579', '2022-08-05', 349.99, 0.1, '2024-08-05', 1, 1, 2, 1, 1),
            ('AF-S Nikkor 85mm f/1.4G', 'N97531', '2022-09-15', 1599.99, 0.15, '2024-09-15', 2, 2, 2, 2, 1),

            -- Tripods
            ('MT190XPRO4 Aluminum Tripod', 'M75319', '2022-06-15', 239.99, 0.1, '2024-06-15', 2, 2, 3, 1, 1),
            ('Alta Pro 263AB 100 Aluminum Tripod', 'V97531', '2022-07-05', 179.99, 0.1, '2024-07-05', 1, 3, 3, 2, 1),
            ('GT2542 Mountaineer Series 2 Carbon Fiber Tripod', 'G13579', '2022-08-10', 899.99, 0.2, '2024-08-10', 1, 1, 3, 3, 1),
            ('Befree Advanced Carbon Fiber Travel Tripod', 'M24680', '2022-09-20', 349.99, 0.15, '2024-09-20', 2, 2, 3, 1, 1);     
      
            -- Insert sample data for User 2
            INSERT INTO Users (email, password, first_name) VALUES
                ('emily@example.com', '${hash2}', 'Emily');
            
            -- Insert sample data for User 2's stores
            INSERT INTO Store (name, location, user_id) VALUES
                ('Camera World', 'Los Angeles, CA', 2),
                ('Lens Paradise', 'San Francisco, CA', 2),
                ('Photo Gear Emporium', 'Chicago, IL', 2);
            
            -- Insert sample data for User 2's insurance companies
            INSERT INTO Insurance (name, contact_person, phone_number, email, user_id) VALUES
                ('Photographers Insurance Co.', 'Sarah Johnson', '555-1234', 'sarah@photographersinsuranceco.com', 2),
                ('SecureLens Insurance', 'Michael Smith', '555-5678', 'michael@securelens.com', 2),
                ('CameraInsure', 'Emily Brown', '555-9012', 'emily@camerainsure.com', 2);
            
            -- Insert sample data for User 2's equipment types
            INSERT INTO Type (name, user_id) VALUES
                ('Camera Body', 2),
                ('Lens', 2),
                ('Tripod', 2);
            
            -- Insert sample data for User 2's brands
            INSERT INTO Brand (name, user_id) VALUES
                ('Canon', 2),
                ('Nikon', 2),
                ('Sony', 2),
                ('Tamron', 2);
                
            -- Insert sample data for User 2's equipment
            INSERT INTO Equipment (model, serial_number, purchase_date, price, depreciation, warranty_expire_date, store_id, insurance_id, type_id, brand_id, user_id) VALUES
                -- Camera bodies
                ('Alpha a7 III', 'S98765', '2022-05-15', 1999.99, 0.2, '2024-05-15', 1, 1, 1, 3, 2),
                ('Z6 II', 'N67890', '2022-06-01', 1999.99, 0.18, '2024-06-01', 2, 2, 1, 2, 2),
                ('EOS RP', 'C54321', '2022-07-10', 999.99, 0.15, '2024-07-10', 1, 3, 1, 1, 2),
            
                -- Lenses
                ('EF 24-70mm f/2.8L II USM', 'C98765', '2022-05-20', 1599.99, 0.15, '2024-05-20', 1, 1, 2, 1, 2),
                ('AF-S Nikkor 70-200mm f/2.8E FL ED VR', 'N54321', '2022-06-10', 2199.99, 0.18, '2024-06-10', 2, 2, 2, 2, 2),
                ('28-75mm f/2.8 Di III RXD', 'T24680', '2022-07-25', 899.99, 0.15, '2024-07-25', 1, 3, 2, 4, 2);
            
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
