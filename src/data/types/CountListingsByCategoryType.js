import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const CountListingsByCategoryType = new ObjectType({
  name: "CountListingsByCategory",
  fields: {
    roomType: {
      type: StringType
    },
    count: {
      type: IntType
    },
  }
});

export default CountListingsByCategoryType;