"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
      },
      birthDate: { type: DataTypes.DATE, field: "birth_date" },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      points: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      tableName: "customers",
      timestamps: false,
    }
  );
  return Customer;
};
