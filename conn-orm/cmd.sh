npx sequelize-cli model:generate --name Products --attributes name:string,quantityInStock:integer,unitPrice:decimal
npx sequelize-cli migration:generate --name create-products-table
npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name dummy-products
npx sequelize-cli db:seed:all