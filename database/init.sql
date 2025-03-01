-- create a type to income and expense transactions
DROP TYPE IF EXISTS transaction_type;
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

-- create user table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- TIMESTAMPTZ used for time zone
);

-- create category table
CREATE TABLE IF NOT EXISTS categorys (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    delete_at TIMESTAMP NULL DEFAULT NULL, -- soft delete
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id) 
);

-- create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    id_user INT NOT NULL,  
    id_category INT NULL,  
    description VARCHAR(255),  
    value DECIMAL(10, 2) NOT NULL,
    type transaction_type NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    date_transaction DATE NOT NULL, 
    delete_at TIMESTAMP NULL DEFAULT NULL, -- soft delete
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_category) REFERENCES categorys(id) ON DELETE SET NULL
);