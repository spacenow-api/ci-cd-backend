import UserDashboardType from '../../types/siteadmin/UserDashboardType';
import { User } from '../../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const getUserDashboard = {

  type: UserDashboardType,

  async resolve({ request }) {

    const totalCount = await User.count();

    const todayCount = await User.count({
       where: { 
        createdAt: {
          $lt: new Date(),
          $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
      },
    });

    const monthCount = await User.count({
       where: { 
        createdAt: {
          $lt: new Date(),
          $gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
        }
      },
    });

    return {
      totalCount,
      todayCount,
      monthCount
    };
    
  },
};

export default getUserDashboard;
