import CategoriesType from "../types/CategoriesType";

import models, { ListSettings } from "../../data/models";
import { Listing } from "../../data/models";

import sequelize from "../sequelize";

import {
  GraphQLList as List,
  GraphQLInt as IntType,
} from "graphql";

const getCategories = {

  type: new List(CategoriesType),

  async resolve({ request }) {

    
    let roomTypeQuery = sequelize.query(`SELECT ListSettings.*, COUNT(roomType) as rt FROM ListSettings LEFT JOIN Listing ON ListSettings.id = Listing.roomType WHERE isEnable = 1 AND typeId = 1 GROUP BY roomType ORDER BY rt DESC`);

    const getResults = await ListSettings.findAll({
      where: {
        isEnable: true,
        typeId: 1
      },
      include: [{
        model: Listing,
        as: 'listing'
      }]
    });

    if (!getResults) {
      return {
        status: "failed"
      };
    }

    return getResults;

  }
};

export default getCategories;
