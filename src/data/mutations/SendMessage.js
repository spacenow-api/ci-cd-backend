// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ThreadItemsType from '../types/ThreadItemsType';

// Sequelize models
import { ThreadItems } from '../../data/models';

const sendMessage = {

  type: ThreadItemsType,

  args: {
    threadId: { type: new NonNull(IntType)},
    content: { type: StringType },
    type: { type: StringType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    personCapacity: { type: IntType },
    reservationId: { type: IntType },
  },

  async resolve({ request, response }, {
    threadId,
    content,
    type,
    startDate,
    endDate,
    personCapacity,
    reservationId
  }) {

    // Check if user already logged in
    if(request.user && !request.user.admin) {

        const userId = request.user.id;
        
        // Create a thread item
        const threadItems = await ThreadItems.create({
          threadId,
          sentBy: userId,
          content,
          type,
          startDate,
          endDate,
          personCapacity,
          reservationId
        });
        if(threadItems){
          return threadItems;
        } else {
          return {
            status: 'failed to create thread items'
          }
        }

    } else {
        return {
          status: "notLoggedIn",
        };
    }
  },
};

export default sendMessage;
