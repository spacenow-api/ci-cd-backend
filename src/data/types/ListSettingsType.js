import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType
} from "graphql";

const ListSettingsType = new ObjectType({
  name: "listSettingsType",
  description: "Represents listing field values for the frontend",
  fields: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    otherItemName: { type: StringType },
    description: { type: StringType },
    photo: { type: StringType },
    photoType: { type: StringType },
    isEnable: { type: StringType },
    isMultiPerGuest: { type: BooleanType }
  }
});

export default ListSettingsType;
