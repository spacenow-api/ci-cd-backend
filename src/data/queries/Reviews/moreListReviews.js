// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';

import ReviewsType from '../../types/ReviewsType';

// Sequelize models
import { Reviews, Listing } from '../../models';

const moreListReviews = {

    type: new List(ReviewsType),

    args: {
        listId: { type: new NonNull(IntType) },
        offset: { type: IntType},
    },

    async resolve({ request, response }, { listId, hostId, offset }) {
        const limit = 1;
        const getListData = await Listing.findOne({
            where: {
                id: listId
            }
        });
        if(getListData) {
            return await Reviews.findAll({
                where: {
                    listId,
                    userId: getListData.userId
                },
                limit,
                offset
            });
        }
    },
};

export default moreListReviews;

/**
query MoreListReviews($listId: Int!, $offset: Int){
    moreListReviews(listId: $listId, offset: $offset){
        id
        reservationId
        listId
        authorId
        userId
        reviewContent
        rating
        parentId
        automated
        createdAt
        status
    }
}
**/