import ArticleType from "../types/ArticleType";
import { Article } from "../../data/models";

import { GraphQLList as List } from "graphql";

const getAllArticles = {
  type: new List(ArticleType),

  async resolve({ request }) {
    const getArticle = await Article.findAll({
      where: {
        isPublished: true
      }
    });
    return getArticle;
  }
};

export default getAllArticles;
