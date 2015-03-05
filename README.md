MEAN Stack Relational ![Mean Stack Build Status](https://travis-ci.org/jpotts18/mean-stack-relational.png)
=====================
The main idea for this repository is shamelessly stolen from [http://mean.io](http://mean.io). It says:

> MEAN is a boilerplate that provides a nice starting point for [MySQL], Express, Node.js, and AngularJS based applications. It is designed to give you quick and organized way to start developing of MEAN based web apps with useful modules like sequelize and passport pre-bundled and configured. We mainly try to take care of the connection points between existing popular frameworks and solve common integration problems.


The MongoDB ORM, [Mongoose](http://mongoosejs.com/), has been replaced with [Sequelize](http://sequelizejs.com/). Switching from mongoose to sequelize allows developers easy access to MySQL, MariaDB, SQLite or PostgreSQL databases by mapping database entries to objects and vice versa.

[Addy Osmani's Blog](http://addyosmani.com/blog/full-stack-javascript-with-mean-and-yeoman/) explains SQL databases, being strongly typed in nature are great at enforcing a level of consistency, ensuring many kinds of bad data simply don’t get recorded. By using SQL databases MEAN Stack Relational favors reliability over the performance gains of NoSQL databases.

# Getting Started

Alright now the fun begins. First clone or download the repo to your computer. 

1. Clone the repository ```git clone git@github.com:jpotts18/mean-stack-relational.git```.
1. Go into the repository ```cd mean-stack-relational/```.
1. Install dependencies with NPM ```npm install```.
1. Plug in your private and public keys for working with FB and Twitter into ```/config/env/development.js```.
1. Wire up the database connection found in ```/config/env/development.js```.
1. Initialize Grunt task runner ```grunt```.
1. Make something awesome!

Thats all! Now go and open up your browser at [http://localhost:3000](http://localhost:3000), and tweet [@jpotts18](http://twitter.com/jpotts18) to say thanks!


## Prerequisites
- Node.js - Download and Install Node.js. You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
- MySQL - Download and Install MySQL - Make sure it's running on the default port (3306).

### Tool Prerequisites
- NPM - Node.js package manager, should be installed when you install node.js. NPM (Node Package Manager) will look at the [package.json](https://github.com/jpotts18/mean-stack-relational/blob/master/package.json) file in the root of the project and download all of the necessary dependencies and put them in a folder called ```node_modules```

- Bower - Web package manager, installing Bower is simple when you have npm:
``` npm install -g bower ```

### NPM Modules Used
- [Passport](http://passportjs.org/) - Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more. 
- [Express](http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.
- [Sequelize](http://sequelizejs.com/) - The Sequelize library provides easy access to MySQL, MariaDB, SQLite or PostgreSQL databases by mapping database entries to objects and vice versa. To put it in a nutshell, it's an ORM (Object-Relational-Mapper). The library is written entirely in JavaScript and can be used in the Node.JS environment. 

### Generating sequelize models
- [DBConvert for MySQL & PostgreSQL](https://dbconvert.com/convert-mysql-to-postgresql-pro.php) - Is a reliable database converter performing data migration from MySQL to PostgreSQL and in opposite way. 
- [sequelize-pg-generator](https://www.npmjs.com/package/sequelize-pg-generator) - This module is for auto generating Sequelize model from PostgreSQL databases. It reverse engineers your database and generates separate model files for each table.

Convert RentedSchema_v2.sql (MySQL) schema and apply it to postgresql DB using [DBConvert for MySQL & PostgreSQL trial](https://dbconvert.com/convert-mysql-to-postgresql-pro.php) or one of the other methods listed in [Converting from other Databases to PostgreSQL](https://wiki.postgresql.org/wiki/Converting_from_other_Databases_to_PostgreSQL). Make sure that column names are camelCase, like they were in mySQL.

NOTE: when converting to PostgreSQL it might be necessarry to shorten some index names due to PostreSql index name length limitation. In our case i did following changes:

apartment_complex_floor_plan_PRIMARY_apartment_complex_floor_plan
apartment_complex_transportation_PRIMARY_apartment_complex_transportation
apartment_complex_transportation_PRIMARY_apartment_complex_transportation

renamed to:

apartment_complex_floor_plan_PRIMARY
apartment_complex_transportation_PRIMARY
apartment_complex_transportation_PRIMARY

Once we have schema applied to PG, Use [sequelize-pg-generator](https://www.npmjs.com/package/sequelize-pg-generator) to connect to PG database and generate javascript models (use config file and make sure to set useSchemaName to false while generating models). All models will be generated correctly.
CLI command: spgen -c <path to config file>
config file is located at server/models/config/config.js

Note: it's possible that some models will have to be extended manually. So far it's just rentedUser model which was manually added instance methods, save hooks etc (for salt, crypting etc..)

Note: when instatiating Sequelize, sequelize-pg-generator uses ‘postgre’ as default sql dialect.. If other DB is used instead of PG (i.e. MySQL) it have to be stated when instatiating Sequelize.

### Generation models on MAC (lowercase issue still not solved)
Use RazorSQL to convert MySql Rented database schema ( all tables ) into Postgres schema ... note that I haven't found a way to do this with views yet
Create a Postgres database Rented ( delete your old one first if applicable )
run the RentedSchemaPG_v.sql in sql window connected to Postgres Rented
cd Rented/server directory
spgen -d Rented -u -s Rented -o models
Note: when instatiating Sequelize, sequelize-pg-generator uses ‘postgre’ as default sql dialect.. If other DB is used instead of PG (i.e. MySQL) it have to be stated when instatiating Sequelize.

## Data model nuanaces
- Following a room means following a property
- Looking means a user is advertising themselves - looking for a roommate or looking for someone with a room to contact the user
- Update profile from dashboard takes the user in edit profile mode



## Applying PG schema to existing ( empty ) PG database Rented
 psql -d Rented -f RentedSchemaPG_v5.sql 
 
=======
## Inserting PG SQL schema on your local host
1. Open PG Admin
2. Delete existing local database 'rented'
3. Create a new database 'rented' (case sensitive)
4. Navigate to PG bin directory
Ex. /Library/PostgreSQL/9.4/bin/
5. Apply script to your local Postgres DB (using psql tool witch is located inside bin folder of pg installation)
Ex. psql -U postgres rented < /Users/vinitmodi/Rented/database_scripts/RentedSchemaPG_v6.sql
6. Tables will be inserted into the local 'rented' database 

Requires:
1. npm install as 2 new modules are added (pg, pg-hstore)
2. check that configuration inside server\config\environment/development.js matches you local pg configuration (db name, user, password)
Default is user: postgres and password: root

=======
## Inserting university tables on to your local host
1. Open PG Admin
2. Select university table
Located under rented/Schemas/public/tables/university
3. Click on puzzle box - new terminal window will open up
4. Copy sql code located at /database_scripts/universityData.sql
5. Paste in terminal window
6. Data is loaded in the tables
7. To view table Click on Rows/View Data/View Top 100 Rows

