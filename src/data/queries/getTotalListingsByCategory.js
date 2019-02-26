import GetCountListingsByCategoriesType from "../types/GetCountListingsByCategoriesType";
import { Listing } from "../../data/models";

import {
    GraphQLList as List,
} from 'graphql';

const getTotalListingsByCategory = {
  type: new List(GetCountListingsByCategoriesType),
  async resolve({ request }) {
    return await Listing.findAll({ group: "roomType" });
  }
};

export default getTotalListingsByCategory;