let config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    table1: process.env.TABLE1_NAME,
    table2: process.env.TABLE2_NAME,
    options: {
        encrypt: true, // Required for Azure SQL Database
        trustServerCertificate: true // Required if your database is using a self-signed certificate
    }
};

module.exports = config;