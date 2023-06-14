let config = {
    user: '<your-database-username>',
    password: '<your-database-password>',
    server: '<your-server-name>.database.windows.net',
    database: '<your-database-name>',
    table1: '<your-table-name>',
    table2: '<your-table-name>',
    options: {
        encrypt: true, // Required for Azure SQL Database
        trustServerCertificate: true // Required if your database is using a self-signed certificate
    }
};

module.exports = config;