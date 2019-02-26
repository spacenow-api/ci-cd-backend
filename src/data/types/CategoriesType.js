import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType
} from "graphql";

const CategoriesType = new ObjectType({
  name: "CategoriesType",
  description: "Represents category field values for the frontend",
  fields: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    otherItemName: { type: StringType },
    description: { type: StringType },
    photo: { type: StringType },
    photoType: { type: StringType },
    isEnable: { type: StringType }
  }
});

export default CategoriesType;
