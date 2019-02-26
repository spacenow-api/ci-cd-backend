import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql'; 

import UserVerifiedInfoType from './UserVerifiedInfoType';
import CancellationType from './CancellationType';
import ListCalendarType from './ListCalendarType';

import ReviewsType from './ReviewsType';
import {Cancellation, Reviews, ListCalendar, WishList, Listing } from '../models';

const Profile = new ObjectType({
  name: 'profile',
  fields: {
    profileId: {
      type: IntType,
    },
    firstName: {
      type: StringType,
    },
    lastName: {
      type: StringType,
    },
    displayName: {
      type: StringType,
    },
    dateOfBirth: {
      type: StringType,
    },
    picture: {
      type: StringType,
    },
    location: {
      type: StringType,
    },
    info: {
      type: StringType,
    },
    createdAt: {
      type: StringType,
    }
  }
});

const User = new ObjectType({
  name: 'user',
  fields: {
    email: {
      type: StringType,
      resolve (user) {
        return user.email;
      }
    },
    profile: {
      type: Profile,
      resolve (user) {
        return user.getProfile();
      }
    },
    verification: {
      type: UserVerifiedInfoType,
      resolve (user) {
        return user.getUserVerifiedInfo();
      }
    }
  }
});


const ListSettingsTypes = new ObjectType({
  name: 'listSettingsTypes',
  fields: {
    id: {type: IntType },
    typeName: { type: StringType },
    typeLabel: { type: StringType },
    step: { type: StringType },
    fieldType: { type: StringType },
    isEnable: { type: StringType },
    status: { type: StringType },
  },
});

const ListSettings = new ObjectType({
  name: 'listSettings',
  fields: {
    id: {type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
    settingsType: {
      type: ListSettingsTypes,
      resolve (listSettings) {
        return listSettings.getListSettingsTypes();
      }
    },
  }
});

const UserAmenities = new ObjectType({
  name: 'userAmenities',
  fields: {
    amenitiesId: {
      type: StringType,
      resolve (userAmenities) {
        return userAmenities.amenitiesId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve (userAmenities) {
        return userAmenities.getListSettings();
      }
    },
  }
});

const UserSafetyAmenities = new ObjectType({
  name: 'userSafetyAmenities',
  fields: {
    safetyAmenitiesId: {
      type: StringType,
      resolve (userSafetyAmenities) {
        return userSafetyAmenities.safetyAmenitiesId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve (userSafetyAmenities) {
        return userSafetyAmenities.getListSettings();
      }
    },
  }
});

// Spaces
const UserSpaces = new ObjectType({
  name: 'userSpaces',
  fields: {
    spacesId: {
      type: StringType,
      resolve (userSpaces) {
        return userSpaces.spacesId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve (userSpaces) {
        return userSpaces.getListSettings();
      }
    },
  }
});

// House Rules
const UserHouseRules = new ObjectType({
  name: 'userHouseRules',
  fields: {
    id: {
      type: IntType,
    },
    houseRulesId: {
      type: StringType,
      resolve (userHouseRules) {
        return userHouseRules.houseRulesId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve (userHouseRules) {
        return userHouseRules.getListSettings();
      }
    },
  }
});

// List Blocked Dates
const ListBlockedDates = new ObjectType({
  name: 'listBlockedDates',
  fields: {
    blockedDates: {
      type: StringType,
      resolve (listBlockedDates) {
        return listBlockedDates.blockedDates;
      }
    },
    reservationId: {
      type: IntType,
      resolve (listBlockedDates) {
        return listBlockedDates.reservationId;
      }
    }
  }
});

// Listing More Data
const ListingData = new ObjectType({
  name: "listingData",
  fields: {
    bookingNoticeTime: { type: StringType },
    checkInStart: { type: StringType },
    checkInEnd: { type: StringType },
    maxDaysNotice: { type: StringType },
    minNight: { type: IntType },
    maxNight: { type: IntType },
    priceType: { type: StringType },
    basePrice: { type: IntType },
    cleaningPrice: { type: IntType },
    currency: { type: StringType },
    halfDayDiscount: { type: IntType },
    dailyDiscount: { type: IntType },
    priceType: {type: StringType}, //added Camila
    weeklyDiscount: { type: IntType },
    monthlyDiscount: { type: IntType },
    cancellationPolicy: { type: IntType },
    cancellation: {
      type: CancellationType,
      resolve(listingData) {
        return Cancellation.findOne({
          where: {
            id: listingData.cancellationPolicy,
            isEnable: true
          }
        });
      }
    }
  }
});

// User Listing Data
const UserListingData = new ObjectType({
  name: 'userListingData',
  fields: {
    id: {
      type: IntType,
      resolve (userListingData) {
        return userListingData.id;
      }
    },
    settingsId: {
      type: IntType,
      resolve (userListingData) {
        return userListingData.settingsId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve (userListingData) {
        return userListingData.getListSettings();
      }
    },
  }

});

// Listing Steps
const UserListingSteps = new ObjectType({
  name: 'userListingSteps',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    step1: { type: StringType },
    step2: { type: StringType },
    step3: { type: StringType },
    currentStep: { type: IntType },
    status: { type: StringType },
  },
});

// Recommended Listing
const Recommend = new ObjectType({
  name: 'recommend',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    status: { type: StringType },
  },
});

// Listing Photos
const ListPhotos = new ObjectType({
  name: 'listPhotos',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    name: { type: StringType },
    type: { type: StringType },
    status: { type: StringType },
  },
});



const ShowListingType = new ObjectType({
  name: "ShowListing",
  fields: {
    id: { type: IntType },
    userId: { type: StringType },
    title: { type: StringType },
    description: { type: StringType },
    bedrooms: { type: StringType },
    residenceType: { type: StringType },
    buildingSize: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    coverPhoto: { type: IntType },
    isMultiPerGuest: { type: BooleanType },
    listPhotos: {
      type: new List(ListPhotos),
      resolve(listing) {
        return listing.getListPhotos();
        //return listing.getById(listing.coverPhoto)
      }
    },
    isMapTouched: { type: BooleanType },
    bookingType: { type: StringType },
    isPublished: { type: BooleanType },
    isReady: { type: BooleanType },
    status: { type: StringType },
    updatedAt: { type: StringType },
    createdAt: { type: StringType },
    count: { type: IntType },
    user: {
      type: User,
      resolve(listing) {
        return listing.getUser();
      }
    },
    userAmenities: {
      type: new List(UserAmenities),
      resolve(listing) {
        return listing.getUserAmenities();
      }
    },
    userSafetyAmenities: {
      type: new List(UserSafetyAmenities),
      resolve(listing) {
        return listing.getUserSafetyAmenities();
      }
    },
    userSpaces: {
      type: new List(UserSpaces),
      resolve(listing) {
        return listing.getUserSpaces();
      }
    },
    settingsData: {
      type: new List(UserListingData),
      resolve(listing) {
        return listing.getUserListingData();
      }
    },
    houseRules: {
      type: new List(UserHouseRules),
      resolve(listing) {
        return listing.getUserHouseRules();
      }
    },
    listingData: {
      type: ListingData,
      resolve(listing) {
        return listing.getListingData();
      }
    },
    blockedDates: {
      type: new List(ListBlockedDates),
      async resolve(listing) {
        return await listing.getListBlockedDates();
      }
    },
    listingSteps: {
      type: UserListingSteps,
      resolve(listing) {
        return listing.getUserListingSteps();
      }
    },
    recommend: {
      type: Recommend,
      resolve(listing) {
        return listing.getRecommend();
      }
    },
    reviewsCount: {
      type: IntType,
      async resolve(listing) {
        return await Reviews.count({
          where: {
            listId: listing.id,
            userId: listing.userId
          }
        });
      }
    },
    reviewsStarRating: {
      type: IntType,
      async resolve(listing) {
        return await Reviews.sum("rating", {
          where: {
            listId: listing.id,
            userId: listing.userId
          }
        });
      }
    },
    reviews: {
      type: new List(ReviewsType),
      async resolve(listing) {
        return await Reviews.findAll({
          where: {
            listId: listing.id,
            userId: listing.userId
          },
          limit: 1
        });
      }
    },
    calendars: {
      type: new List(ListCalendarType),
      async resolve(listing) {
        return await ListCalendar.findAll({
          where: {
            listId: listing.id
          }
        });
      }
    },
    wishListStatus: {
      type: BooleanType,
      async resolve(listing, {}, request) {
        let userId = request && request.user ? request.user.id : undefined;
        let count = await WishList.count({
          where: {
            listId: listing.id,
            userId
          }
        });

        return count ? true : false;
      }
    },
    isListOwner: {
      type: BooleanType,
      async resolve(listing, {}, request) {
        let userId = request && request.user ? request.user.id : undefined;
        let count = await Listing.count({
          where: {
            id: listing.id,
            userId
          }
        });

        return count ? true : false;
      }
    }
  }
});

export default ShowListingType;
