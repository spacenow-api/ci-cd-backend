import ArticleType from "../types/ArticleType";
import { Article } from "../../data/models";

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull
 } from "graphql";

const getArticle = {
  type: ArticleType,

  args: {
    articleId: { type: IntType }
  },
  
  async resolve({ request }, { articleId }) {
    const articleData = await Article.findOne({
      where: {
        id: articleId,
      }
    });
    return articleData;
  }
};

export default getArticle;
