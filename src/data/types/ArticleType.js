import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List
} from "graphql";

import ArticleDataType from './ArticleDataType';
import { ArticleData } from "../../data/models";

const ArticleType = new ObjectType({
  name: "ArticleType",
  fields: {
    id: { type: StringType },
    title: { type: StringType },
    userId: { type: new NonNull(ID) },
    isPublished: { type: BooleanType },
    authorName: { type: StringType },
    authorPicture: { type: StringType },
    thumbnail: { type: StringType },
    description: { type: StringType },
    updatedAt: { type: StringType },
    articleData: {
      type: new List(ArticleDataType),
      async resolve(data) {
        return await ArticleData.findAll({
          where: {
            articleId: data.id
          },
          order: [
            ['order', 'ASC']
          ],
        });
      }
    }
  }
});

export default ArticleType;
