import ShowListingType from '../types/ShowListingType';
import {ListViews, Listing, UserListingSteps, ListPhotos} from '../../data/models';
import sequelize from '../sequelize';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType
} from 'graphql';

const GetMostViewedListing = {
  type: new List(ShowListingType),

  args: {
    country: { type: StringType },
    state: { type: StringType },
    city: { type: StringType }
  },

  async resolve({ request }, { country, state, city }) {

    let where = {};

    if (country !== '')
        where = Object.assign({}, where, { country: country });

    if (state !== '')
        where = Object.assign({}, where, { state: state });

    if (city !== '')
        where = Object.assign({}, where, { city: city });

    where = Object.assign({}, where, { isPublished: true });

    return await Listing.findAll({
      where: where,
      // include: [
      //   {
      //     model: ListViews,
      //     attributes: [],
      //     as: "listViews",
      //     required: true,
      //     duplicating: false
      //   }
      // ],
      // order: [
      //   [sequelize.fn("count", sequelize.col("listViews.listId")), "DESC"]
      // ],
      // group: ["listViews.listId"],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 10,
      offset: 0,
    });
  }
};

export default GetMostViewedListing;