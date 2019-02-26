import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import intl from './queries/intl';
import userLogin from './queries/userLogin';
import userLogout from './queries/userLogout';
import userRegister from './queries/userRegister';
import userAccount from './queries/userAccount';
import userEditProfile from './queries/userEditProfile';
import showUserProfile from './queries/showUserProfile';
import locationItem from './queries/locationItem';
import createListing from './queries/createListing';
import showListing from './queries/showListing';
import showListingSteps from './queries/showListingSteps';
import ManageListingSteps from './queries/ManageListingSteps';
import getListingSettings from './queries/getListingSettings';
import getListSettings from "./queries/getListSettings";
import getCategories from "./queries/getCategories";
import updateListing from './queries/updateListing';
import updateListingStep2 from './queries/updateListingStep2';
import updateListingStep3 from './queries/updateListingStep3';
import DateAvailability from './queries/DateAvailability';
import getListingSpecSettings from './queries/getListingSpecSettings';
import GetAddressComponents from './queries/GetAddressComponents';
import getCountries from './queries/getCountries';
import getBanner from './queries/getBanner';
import getRecommend from './queries/getRecommend';
import ChangePassword from './queries/ChangePassword';
import getUserVerifiedInfo from './queries/getUserVerifiedInfo';
import updateUserVerifiedInfo from './queries/updateUserVerifiedInfo';
import UploadProfilePicture from './queries/UploadProfilePicture';
import RemoveProfilePicture from './queries/RemoveProfilePicture';
import getImageBanner from './queries/getImageBanner';
import GetListViews from './queries/GetListViews';
import GetMostViewedListing from './queries/GetMostViewedListing';
import EmailVerification from './queries/EmailVerification';
import ResendConfirmEmail from './queries/ResendConfirmEmail'; 

// Forgot Password
import sendForgotPassword from './mutations/ForgotPassword/SendForgotPassword'; 
import forgotPasswordVerification from './queries/ForgotPassword/ForgotPasswordVerification'; 
import changeForgotPassword from './mutations/ForgotPassword/ChangeForgotPassword'; 

// Payout
import getPaymentMethods from './queries/Payout/getPaymentMethods';
import addPayout from './mutations/Payout/addPayout';
import removePayout from './mutations/Payout/removePayout';
import setDefaultPayout from './mutations/Payout/setDefaultPayout';
import getPayouts from './queries/Payout/getPayouts';

// Payment/Booking
import createReservation from './mutations/Payment/createReservation';

// Reservation
import getItinerary from './queries/Reservation/getItinerary';
import getAllReservation from './queries/Reservation/getAllReservation';
import getAllReservationAdmin from './queries/Reservation/getAllReservationAdmin';
import getPayoutStatus from './queries/Reservation/getPayoutStatus';
import updateReservation from './mutations/Reservation/updateReservation';
import getPaymentData from './queries/Reservation/getPaymentData';
import cancelReservationData from './queries/Reservation/cancelReservationData';
import cancelReservation from './mutations/Reservation/cancelReservation';
import viewReservationAdmin from './queries/Reservation/viewReservationAdmin'

// Transaction History
import getTransactionHistory from './queries/TransactionHistory/getTransactionHistory';
import updatePayoutForReservation from './mutations/TransactionHistory/updatePayoutForReservation';

//Articles
import getArticle from "./queries/getArticle";
import getAllArticles from "./queries/getAllArticles";

// Message System
import CreateThreadItems from './mutations/CreateThreadItems';
import GetAllThreads from './queries/GetAllThreads';
import getThread from './queries/getThread';
import sendMessage from './mutations/SendMessage';
import getUnreadThreads from './queries/getUnreadThreads';
import getUnreadCount from './queries/getUnreadCount';
import readMessage from './mutations/ReadMessage';
import getAllThreadItems from './queries/Messages/getAllThreadItems';

// Remove Listing
import RemoveListing from './mutations/Listing/RemoveListing';

// Currency
import getCurrencies from './queries/getCurrencies';
import Currency from './queries/Currency';
import StoreCurrencyRates from './queries/StoreCurrencyRates';
import getBaseCurrency from './queries/getBaseCurrency';
import managePaymentCurrency from './mutations/Currency/managePaymentCurrency'

// Manage Listing
import ManageListings from './queries/ManageListings';
import managePublish from './mutations/Listing/ManagePublish';

import getListingCalendars from './queries/Listing/getListingCalendars';
import deleteCalendar from './mutations/Listing/DeleteImportCalendar';
import getBlockedDates from './queries/Listing/getBlockedDates';
import blockImportedDates from './mutations/Listing/BlockImportedDates';

// Search Listing
import SearchListing from './queries/SearchListing';

// List Photos
import CreateListPhotos from './mutations/CreateListing/CreateListPhotos';
import RemoveListPhotos from './mutations/CreateListing/RemoveListPhotos';
import ShowListPhotos from './queries/ShowListPhotos';

import UserListing from './queries/UserListing';
import getListMeta from './queries/Listing/getListMeta';

import getProfile from './queries/UserProfile';

import getSearchSettings from './queries/getSearchSettings';

import UpdateListViews from './queries/UpdateListViews';

// Payment Settings - For now, it's PayPal
import getPaymentInfo from './queries/getPaymentInfo';

// For Site Admin

// User Management
import deleteUser from './mutations/UserManagement/deleteUser';

// Listing Management
import addRecommend from './mutations/SiteAdmin/ListingManagement/addRecommend';
import removeRecommend from './mutations/SiteAdmin/ListingManagement/removeRecommend';
import adminRemoveListing from './mutations/SiteAdmin/ListingManagement/adminRemoveListing';

// Currency Management
import currencyManagement from './mutations/SiteAdmin/CurrencyManagement/currencyManagement';
import baseCurrency from './mutations/SiteAdmin/CurrencyManagement/baseCurrency';

// Logo
import uploadLogo from './mutations/SiteAdmin/Logo/uploadLogo';
import removeLogo from './mutations/SiteAdmin/Logo/removeLogo';
import getLogo from './queries/siteadmin/getLogo';


import adminUserLogin from './queries/siteadmin/adminUserLogin';
import changeAdminUser from './mutations/SiteAdmin/changeAdminUser';

import userManagement from './queries/siteadmin/userManagement';
import editUser from './queries/siteadmin/editUser';
import updateUser from './queries/siteadmin/updateUser';
import siteSettings from './queries/siteadmin/siteSettings';
import updateSiteSettings from './queries/siteadmin/updateSiteSettings';
import getAdminListingSettings from './queries/siteadmin/getAdminListingSettings';

import addListSettings from './queries/siteadmin/addListSettings';
import updateListSettings from './queries/siteadmin/updateListSettings';
import deleteListSettings from './queries/siteadmin/deleteListSettings';

import getAllListings from './queries/siteadmin/getAllListings';
import updatePaymentSettings from './queries/siteadmin/updatePaymentSettings';
import updateSearchSettings from './queries/siteadmin/updateSearchSettings';
import updateBannerSettings from './queries/siteadmin/updateBannerSettings';

import getUserDashboard from './queries/siteadmin/getUserDashboard';
import getListingDashboard from './queries/siteadmin/getListingDashboard';
import updateImageBanner from './queries/siteadmin/updateImageBanner';
import uploadImageBanner from './queries/siteadmin/uploadImageBanner';
import removeImageBanner from './queries/siteadmin/removeImageBanner';
import getReservationDashboard from './queries/siteadmin/getReservationDashboard';


// Service Fees
import updateServiceFees from './mutations/ServiceFees/updateServiceFees';
import getServiceFees from './queries/ServiceFees/getServiceFees';

// Cancellation
import getAllCancellation from './queries/Cancellation/getAllCancellation';
import getSpecificCancellation from './queries/Cancellation/getSpecificCancellation';





// Reviews
import userReviews from './queries/Reviews/userReviews';
import pendingReviews from './queries/Reviews/pendingReviews';
import writeReview from './mutations/Reviews/writeReview';
import writeReviewData from './queries/Reviews/writeReviewData';
import moreListReviews from './queries/Reviews/moreListReviews';




//document 
import uploadDocument from './mutations/Document/uploadDocument'; 
import CreateDocumentList from './mutations/DocumentList/CreateDocumentList';
import RemoveDocumentList from './mutations/DocumentList/RemoveDocumentList';
import ShowDocumentList from './queries/DocumentList/ShowDocumentList';
import getAllDocument from './queries/siteadmin/Document/getAllDocument';
import showAllDocument from './queries/siteadmin/Document/showAllDocument';
import DocumentManagement from './mutations/SiteAdmin/DocumentVerification/DocumentManagement';


// Wish List
import getAllWishListGroup from './queries/WishList/getAllWishListGroup';
import CreateWishListGroup from './mutations/WishList/CreateWishListGroup';
import getWishListGroup from './queries/WishList/getWishListGroup';
import UpdateWishListGroup from './mutations/WishList/UpdateWishListGroup';
import DeleteWishListGroup from './mutations/WishList/DeleteWishListGroup';
import CreateWishLists from './mutations/WishList/CreateWishLists';

// Similar Listings
import getSimilarListing from './queries/SimilarListings/getSimilarListing';

const schema = new Schema({
  query: new ObjectType({
    name: "Query",
    fields: {
      me,
      news,
      intl,
      userLogin,
      userLogout,
      userRegister,
      userAccount,
      userEditProfile,
      userManagement,
      editUser,
      updateUser,
      showUserProfile,
      adminUserLogin,
      siteSettings,
      updateSiteSettings,
      locationItem,
      createListing,
      showListing,
      updateListing,
      showListingSteps,
      addListSettings,
      updateListSettings,
      deleteListSettings,
      getListingSettings,
      getListSettings,
      getCategories,
      UserListing,
      getProfile,
      getAdminListingSettings,
      updateListingStep2,
      updateListingStep3,
      ManageListingSteps,
      ShowListPhotos,
      DateAvailability,
      getListingSpecSettings,
      getCurrencies,
      Currency,
      ManageListings,
      getAllListings,
      SearchListing,
      getBaseCurrency,
      getPaymentInfo,
      updatePaymentSettings,
      StoreCurrencyRates,
      updateSearchSettings,
      getSearchSettings,
      GetAddressComponents,
      getLogo,
      getCountries,
      getBanner,
      updateBannerSettings,
      getRecommend,
      getUserDashboard,
      getListingDashboard,
      getUserVerifiedInfo,
      getImageBanner,
      GetListViews,
      GetMostViewedListing,
      EmailVerification,
      ResendConfirmEmail,
      getAllArticles,
      getArticle,
      GetAllThreads,
      getThread,
      getUnreadThreads,
      getUnreadCount,
      getPaymentMethods,
      getPayouts,
      getItinerary,
      getAllReservation,
      getAllReservationAdmin,
      getPayoutStatus,
      getTransactionHistory,
      getServiceFees,
      getPaymentData,
      getAllThreadItems,
      getAllCancellation,
      getSpecificCancellation,
      cancelReservationData,
      userReviews,
      pendingReviews,
      writeReviewData,
      moreListReviews,
      forgotPasswordVerification,
      getListingCalendars,
      getBlockedDates,
      getListMeta,
      getAllWishListGroup,
      getWishListGroup,
      viewReservationAdmin,
      getSimilarListing,
      getReservationDashboard,

      ShowDocumentList,
      getAllDocument,
      showAllDocument
    }
  }),
  mutation: new ObjectType({
    name: "Mutation",
    fields: {
      addRecommend,
      removeRecommend,
      ChangePassword,
      updateUserVerifiedInfo,
      UploadProfilePicture,
      RemoveProfilePicture,
      updateImageBanner,
      uploadImageBanner,
      removeImageBanner,
      UpdateListViews,
      CreateThreadItems,
      sendMessage,
      readMessage,
      addPayout,
      removePayout,
      setDefaultPayout,
      createReservation,
      updatePayoutForReservation,
      updateServiceFees,
      updateReservation,
      managePaymentCurrency,
      RemoveListing,
      deleteUser,
      adminRemoveListing,
      currencyManagement,
      baseCurrency,
      uploadLogo,
      removeLogo,
      CreateListPhotos,
      RemoveListPhotos,
      cancelReservation,
      writeReview,
      sendForgotPassword,
      changeForgotPassword,
      managePublish,
      changeAdminUser,
      deleteCalendar,
      blockImportedDates,
      CreateWishListGroup,
      UpdateWishListGroup,
      DeleteWishListGroup,
      CreateWishLists,
      uploadDocument,
      CreateDocumentList,
      RemoveDocumentList,
      DocumentManagement
    }
  })
});

export default schema;
