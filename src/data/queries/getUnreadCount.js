// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import UnreadCountType from '../types/UnreadCountType';
import {Threads, ThreadItems} from '../../data/models';

const getUnreadCount = {

    type: UnreadCountType,

    async resolve({request}) {
    	// Check if user already logged in
	    if(request.user && !request.user.admin) {

        // For Host
        const hostCount = await Threads.count({ 
          where: {        
            host: request.user.id            
          },
          include: [{
            model: ThreadItems,
            as: 'threadItems',
            require: true,
            where: {
              sentBy: {
                  $ne: request.user.id
              },
              isRead: false
            },
             order: [['isRead', 'ASC']] 
          }]
        });

        // For Travelling
        const guestCount = await Threads.count({ 
          where: {        
            guest: request.user.id            
          },
          include: [{
            model: ThreadItems,
            as: 'threadItems',
            require: true,
            where: {
              sentBy: {
                  $ne: request.user.id
              },
              isRead: false
            },
            order: [['isRead', 'ASC']] 
          }]
        });

        let total = hostCount + guestCount;
        
        return {
          hostCount,
          guestCount,
          total
        };

	    } else {
	    	return {
	          status: "notLoggedIn",
	        };
	    }
    }
};

export default getUnreadCount;