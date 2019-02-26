import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType
} from "graphql";

const ArticleDataType = new ObjectType({
  name: "ArticleDataType",
  fields: {
    id: { type: IntType },
    articleId: { type: IntType },
    subtitle: { type: StringType },
    content: { type: StringType },
    image: { type: StringType },
    quote: { type: StringType },
    order: { type: IntType },
  }
});

export default ArticleDataType;
