import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import UserVerifiedInfo from './UserVerifiedInfo';
import EmailToken from './EmailToken';
import Reviews from './Reviews';
import ForgotPassword from './ForgotPassword';

//Payment
import PaymentMethods from './PaymentMethods';
import Payout from './Payout';

// Payment Transaction and Booking
import Reservation from './Reservation';
import Transaction from './Transaction';
import TransactionHistory from './TransactionHistory';

// Listing
import Listing from './Listing';
import ListingData from './ListingData';
import UserAmenities from './UserAmenities';
import UserSafetyAmenities from './UserSafetyAmenities';
import UserSpaces from './UserSpaces';
import UserListingSteps from './UserListingSteps';
import UserListingData from './UserListingData';
import UserHouseRules from './UserHouseRules';
import ListPhotos from './ListPhotos';
import ListBlockedDates from './ListBlockedDates';
import Currencies from './Currencies';
import CurrencyRates from './CurrencyRates';
import Country from './Country';
import Article from "./Article";
import ArticleData from "./ArticleData";
import Banner from './Banner';
import ImageBanner from './ImageBanner';
import ListViews from './ListViews';
import Threads from './Threads';
import ThreadItems from './ThreadItems';
import Cancellation from './Cancellation';
import CancellationDetails from './CancellationDetails';
import ListCalendar from './ListCalendar';

// Site Admin
import AdminUser from './siteadmin/AdminUser';
import SiteSettings from './siteadmin/SiteSettings';
import ListSettings from './siteadmin/ListSettings';
import ListSettingsTypes from './siteadmin/ListSettingsTypes';
import PaymentSettings from './PaymentSettings';
import SearchSettings from './SearchSettings';
import Recommend from './Recommend';
import ServiceFees from './ServiceFees';

//Idverification
import DocumentVerification from './DocumentVerification';

// Wish List
import WishListGroup from './WishListGroup';
import WishList from './WishList';


// Reservation ~~ Transaction

Reservation.hasMany(Transaction, {
  foreignKey: 'reservationId',
  as: 'transaction',
  onUpdate: 'cascade',
  onDelete: 'cascade',
}); 

Reservation.hasMany(ListBlockedDates, {
  foreignKey: 'reservationId',
  as: 'listBlockedDates',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Transaction.belongsTo(Reservation, {
  foreignKey: 'reservationId',
  as: 'reservation',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

TransactionHistory.belongsTo(Reservation, {
  foreignKey: 'reservationId',
  as: 'reservation',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

Reservation.hasMany(TransactionHistory, {
  foreignKey: 'reservationId',
  as: 'transactionHistory',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Reservation.hasOne(CancellationDetails, {
  foreignKey: 'reservationId',
  as: 'cancellationDetails',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Reservation.hasMany(Reviews, {
  foreignKey: 'reservationId',
  as: 'reviews'
});

// USER - Releation with other Tables

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserVerifiedInfo, {
  foreignKey: 'userId',
  as: 'userVerifiedInfo',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasMany(EmailToken, {
  foreignKey: 'userId',
  as: 'emailToken',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasMany(ForgotPassword, {
  foreignKey: 'userId',
  as: 'forgotPassword',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasMany(Payout, {
  foreignKey: 'userId',
  as: 'payout',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasMany(Listing, {
  foreignKey: 'userId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(Reviews, {
  foreignKey: 'userId',
  as: 'reviews',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Reviews.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

/** User - Relation ends **/


// Listing - Relation with other tables

Listing.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasOne(UserListingSteps, {
  foreignKey: 'listId',
  as: 'userListingSteps',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(Threads, {
  foreignKey: 'listId',
  as: 'threads',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(ListPhotos, {
  foreignKey: 'listId',
  as: 'listPhotos',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(ListBlockedDates, {
  foreignKey: 'listId',
  as: 'listBlockedDates',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasOne(ListingData, {
  foreignKey: 'listId',
  as: 'listingData',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Amenities
Listing.hasMany(UserAmenities, {
  foreignKey: 'listId',
  as: 'userAmenities',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// HouseRules
Listing.hasMany(UserHouseRules, {
  foreignKey: 'listId',
  as: 'userHouseRules',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Safety Amenities
Listing.hasMany(UserSafetyAmenities, {
  foreignKey: 'listId',
  as: 'userSafetyAmenities',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Spaces
Listing.hasMany(UserSpaces, {
  foreignKey: 'listId',
  as: 'userSpaces',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(UserListingData, {
  foreignKey: 'listId',
  as: 'userListingData',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasOne(Recommend, {
  foreignKey: 'listId',
  as: 'recommend',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(ListViews, {
  foreignKey: 'listId',
  as: 'listViews',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

Listing.hasMany(ListCalendar, {
  foreignKey: 'listId',
  as: 'listCalendar',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

/** Listing Table Relation ends **/

UserProfile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

UserVerifiedInfo.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

EmailToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

ForgotPassword.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

Payout.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

UserListingSteps.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListCalendar.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListCalendar.hasMany(ListBlockedDates, {
  foreignKey: 'id',
  as: 'listBlockedDates',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

ListBlockedDates.belongsTo(ListCalendar, {
  foreignKey: 'calendarId',
  as: 'listCalendar',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

// Threads - Relation with other tables

Threads.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Threads.hasMany(ThreadItems, {
  foreignKey: 'threadId',
  as: 'threadItems',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

/** Threads - Relation ends **/

ThreadItems.belongsTo(Threads, {
  foreignKey: 'threadId',
  as: 'threads',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListPhotos.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
}); 

ListBlockedDates.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListingData.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserAmenities.belongsTo(ListSettings, {
  foreignKey: 'amenitiesId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserHouseRules.belongsTo(ListSettings, {
  foreignKey: 'houseRulesId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserSafetyAmenities.belongsTo(ListSettings, {
  foreignKey: 'safetyAmenitiesId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserSpaces.belongsTo(ListSettings, {
  foreignKey: 'spacesId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListSettings.belongsTo(ListSettingsTypes, {
  foreignKey: 'typeId',
  as: 'listSettingsTypes',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListSettingsTypes.hasMany(ListSettings, {
  foreignKey: 'typeId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserListingData.belongsTo(ListSettings, {
  foreignKey: 'settingsId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Recommend.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListViews.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});


WishListGroup.hasMany(WishList, {
  foreignKey: 'wishListGroupId',
  as: 'wishList',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

WishList.belongsTo(WishListGroup, {
  foreignKey: 'wishListGroupId',
  as: 'wishListGroup',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});



Listing.hasMany(WishList, {
  foreignKey: 'listId',
  as: 'wishList',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

WishList.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

Article.hasMany(ArticleData, {
  foreignKey: 'articleId',
  as: 'articleData',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ArticleData.belongsTo(Article, {
  foreignKey: 'articleId',
  as: 'article',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

/*User.hasMany(WishListGroup, {
  foreignKey: 'userId',
  as: 'wishListGroup',
  onUpdate: 'cascade',
  onDelete: 'cascade'
}); */

/*WishListGroup.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});*/

/*

WishList.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});*/

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export {
  User,
  UserLogin,
  UserClaim,
  UserProfile,
  Listing,
  AdminUser,
  SiteSettings,
  UserAmenities,
  UserSafetyAmenities,
  UserSpaces,
  UserListingSteps,
  ListSettings,
  ListSettingsTypes,
  UserListingData,
  UserHouseRules,
  ListingData,
  ListPhotos,
  ListBlockedDates,
  Currencies,
  PaymentSettings,
  CurrencyRates,
  SearchSettings,
  Country,
  Banner,
  Article,
  ArticleData,
  Recommend,
  UserVerifiedInfo,
  ImageBanner,
  ListViews,
  EmailToken,
  ForgotPassword,
  Threads,
  ThreadItems,
  PaymentMethods,
  Payout,
  Reservation, 
  Transaction,
  TransactionHistory,
  ServiceFees,
  Cancellation,
  CancellationDetails,
  Reviews,
  ListCalendar,
  WishListGroup,
  WishList,
  DocumentVerification
};
