-- create a type to income and expense transactions
DROP TYPE IF EXISTS transaction_type;
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

-- create user table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMPTZ used for time zone
    deleted_at TIMESTAMP NULL DEFAULT NULL -- soft delete
);

-- create category table
CREATE TABLE IF NOT EXISTS category (
    id_category SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type transaction_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    id_users INT NOT NULL,
    FOREIGN KEY (id_users) REFERENCES users(id) 
);

-- create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id_transaction SERIAL PRIMARY KEY,
    id_user INT NOT NULL,  
    id_category INT NOT NULL,  
    description VARCHAR(255),  
    value DECIMAL(10, 2) NOT NULL,  
    type transaction_type NOT NULL,  
    date_transaction DATE NOT NULL, 
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_category) REFERENCES category(id_category)
);