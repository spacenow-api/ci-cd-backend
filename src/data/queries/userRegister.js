// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import userRegisterType from '../types/userRegisterType';

// Authentication Utils
import jwt from 'jsonwebtoken';
import {auth} from '../../config';

// Sequelize models
import { User, UserLogin, UserClaim, UserProfile, AdminUser, UserVerifiedInfo, EmailToken } from '../../data/models';

// Helper
import {capitalizeFirstLetter} from '../../helpers/capitalizeFirstLetter';

const userRegister = {

  type: userRegisterType,

  args: {
    firstName: { type: StringType},
    lastName: { type: StringType},
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    dateOfBirth: { type: StringType}
  },

  async resolve({ request, response }, {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth
  }) {

    let loginName = 'email';
    let claimType = 'urn:email:access_token';
    let updatedFirstName = capitalizeFirstLetter(firstName);
    let updatedLastName = capitalizeFirstLetter(lastName);
    let displayName = updatedFirstName + ' ' + updatedLastName;

    // Check if user already logged in
    if(!request.user) {
      // Check if the user is already exists
      const checkUser = await User.findOne({
        attributes: ['id','email'],
        where: { email: email},
      });

      // If already exists throw an error
      if(checkUser) {
        return {
          status: "email",
        };
      } else {

        // Check email is used by admin users
        const getAdminUserId = await AdminUser.find({
            where: { email: email},
        });

        if(getAdminUserId) {
          return {
            status: 'email'
          };
        }
        
        // Create new User & Profile
        const createUser = await User.create({
          email: email,
          emailConfirmed: true,
          password: User.generateHash(password),
          type: loginName,
          profile: {
            displayName,
            firstName: updatedFirstName,
            lastName: updatedLastName,
            dateOfBirth,
          },
          userVerifiedInfo: {
            isEmailConfirmed: false
          },
          emailToken: {
            token: Date.now(),
            email 
          }
        }, {
          include: [
            { model: UserProfile, as: "profile" },
            { model: UserVerifiedInfo, as: 'userVerifiedInfo' },
            { model: EmailToken, as: 'emailToken' },
          ],
        });

        if(createUser) {
            const expiresIn = 60 * 60 * 24 * 180; // 180 days
            const token = jwt.sign({id: createUser.id, email: createUser.email}, auth.jwt.secret, { expiresIn });
            response.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
            const getToken = await EmailToken.findOne({ where: { userId: createUser.id }});
            return {
              emailToken: getToken.dataValues.token,
              status: "success",
            };
        } else {
            return {
              status: "failed",
            };
        }

      }
    } else {
        if(request.user.admin == true) {
          return {
            status: "adminLoggedIn",
          };
        } else {
          return {
            status: "loggedIn",
          };
        }
    }



  },
};

export default userRegister;
