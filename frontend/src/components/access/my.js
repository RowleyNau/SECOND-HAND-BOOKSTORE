// const pg = require('pg');

// const config = {
//     host: localhost,
//     // Do not hard code your username and password.
//     // Consider using Node environment variables.
//     user: 'postgres',     
//     password: viiv136,
//     database: 'postgres',
//     port: 5432,
//     ssl: true
// };

// // REACT_APP_API_URL='http://localhost:5000/'
// // PORT = 5000
// // DB_NAME = postgres
// // DB_USER = postgres
// // DB_PASSWORD = viiv136
// // DB_HOST = localhost
// // DB_PORT = 5432
// // SECRET_KEY = BB_104567

// const client = new pg.Client(config);

// client.connect(err => {
//     if (err) throw err;
//     else {
//         queryDatabase();
//     }
// });

// export function queryDatabase(LastName, Name,  MiddleName, Phone, Mail, Password) {
//     const query = `
//         INSERT INTO clients (LastName, Name,  MiddleName, Phone, Mail, Password) VALUES (`+LastName+`, `+Name+`, `+MiddleName+`, `+Phone+`, `+Mail+`, `+Password+`);`;

//     client
//         .query(query)
//         .then(() => {
//             console.log('Table created successfully!');
//             client.end(console.log('Closed client connection'));
//         })
//         .catch(err => console.log(err))
//         .then(() => {
//             console.log('Finished execution, exiting now');
//             process.exit();
//         });
// }