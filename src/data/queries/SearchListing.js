import searchListingType from '../types/searchListingType';
import { 
    Listing, 
    ListBlockedDates,
    UserListingSteps,
    ListPhotos,
} from '../../data/models';
import sequelize from '../sequelize';
import { convert } from '../../helpers/currencyConvertion';
import {convert_objects} from '../../helpers/mergeObjects';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const SearchListing = {

  type: searchListingType,

  args: {
    personCapacity: { type: IntType },
    dates: { type: StringType },
    currentPage: { type: IntType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    roomType: { type: new List(IntType)},
    bedrooms: { type: IntType },
    bathrooms: { type: IntType },
    beds: { type: IntType },
    amenities:  { type: new List(IntType)},
    spaces:  { type: new List(IntType)},
    houseRules:  { type: new List(IntType)},
    priceRange: { type: new List(IntType)},
    geography: { type: StringType },
    bookingType: { type: StringType },
    priceType: { type: StringType },
  },

  async resolve({ request }, { 
    personCapacity, 
    dates, 
    currentPage,
    lat,
    lng,
    roomType,
    bedrooms,
    bathrooms,
    beds,
    amenities,
    spaces,
    houseRules,
    priceRange,
    geography,
    bookingType,
    priceType
  }) {
    let filter = {};
    let limit = 10;
    let offset = 0;
    let attributesParam = ['id', 'title', 'personCapacity', 'city', 'state', 'lat', 'lng', 'beds', 'coverPhoto', 'bookingType', 'userId'];
    let havingParam = ['id > ?', 0];
    let publishedStatus = {}, personCapacityFilter = {}, datesFilter = {}, locationFilter = {};
    let roomTypeFilter ={}, bedroomsFilter = {}, bathroomsFilter = {}, bedsFilter = {};
    let amenitiesFilter ={}, spacesFilter = {}, houseRulesFilter = {}, priceRangeFilter = {}, geographyFilter = {};
    let bookingTypeFilter = {}, priceTypeFilter = {};

    if (bookingType && bookingType === 'instant'){
      bookingTypeFilter = {
        bookingType
      }
    } /*else {
      bookingTypeFilter = {
        bookingType: 'instant'
      }
    }*/

    if(geography != undefined){
      let geographyConverted;
      // Convert string to JSON object
      geographyConverted = await JSON.parse(geography);

      if('route' in geographyConverted) {
        geographyFilter = {
          $or: [
            {
              street: {
                $like: geographyConverted.route + '%'
              } 
            },
            {
              city: {
                $like: geographyConverted.locality + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.administrative_area_level_2  + '%'
              }
            }
          ]
        };
      } else if('street_address' in geographyConverted) {
        geographyFilter = {
          $or: [
            {
              street: {
                $like: geographyConverted.street_address + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.locality + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.administrative_area_level_2  + '%'
              }
            }
          ]
        };
      } else if('postal_code' in geographyConverted) {
         geographyFilter = {
          $or: [
            {
              zipcode: geographyConverted.postal_code
            },
            {
              city: {
                $like: geographyConverted.locality + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.administrative_area_level_2  + '%'
              }
            }
          ]
        };
      } else if('locality' in geographyConverted || 'administrative_area_level_2' in geographyConverted || 'political' in geographyConverted) {
         geographyFilter = {
          $or: [
            {
              city: {
                $like: geographyConverted.locality + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.administrative_area_level_2  + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.political  + '%'
              }
            }
          ]
        };
      } else if('administrative_area_level_1_short' in geographyConverted || 'administrative_area_level_1_long' in geographyConverted) {
         geographyFilter = {

          $or: [
            {
              state: geographyConverted.administrative_area_level_1_short
            },
            {
              state: {
                $like: geographyConverted.administrative_area_level_1_long  + '%'
              }
            }
          ]
        };
      } else if('country' in geographyConverted) {
         geographyFilter = {
           country: geographyConverted.country
          };
      }
      

    }
    

    if(priceRange != undefined && priceRange.length > 0){

      priceRangeFilter = {
       // $and: [
         // {
            id: {
                $in: [
                  sequelize.literal(`SELECT listId FROM ListingData WHERE (basePrice / (SELECT rate FROM CurrencyRates WHERE currencyCode=currency limit 1)) BETWEEN ${priceRange[0]} AND ${priceRange[1]}`)
                ]
            }
        //  }
        //]   
      };
    }

    if (priceType != undefined) {

      priceTypeFilter = {
        // $and: [
        // {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ListingData WHERE priceType='${priceType}'`)
          ]
        }
        //  }
        //]   
      };
    }
    

    // Offset from Current Page
    if(currentPage){
      offset = (currentPage - 1) * limit;
    }

    // Published Status
    publishedStatus = {  
      isPublished: true 
    };

    // Bedrooms Filter
    if(bedrooms) {
      bedroomsFilter = {
            bedrooms: {
              $gte: bedrooms
            }
          };
    }

    // Bathrooms Filter
    if(bathrooms) {
      bathroomsFilter = {
            bathrooms: {
              $gte: bathrooms
            }
          };
    }

    // Beds Filter
    if(beds) {
      bedsFilter = {
            beds: {
              $gte: beds
            }
          };
    }

    console.log('personCapacity', personCapacity)
    // Person Capacity Filter
    if(personCapacity) {
      personCapacityFilter = {
            personCapacity: {
              $gte: personCapacity
            }
          };
    }

    // Date Range Filter
    if(dates) {
      datesFilter = {
            $or: [
              {
                id: {
                  $notIn: [
                    sequelize.literal("SELECT listId FROM ListBlockedDates")
                  ]
                }
              },
              {
                id: {
                  $notIn: [
                    sequelize.literal("SELECT listId FROM ListBlockedDates WHERE blockedDates BETWEEN" + dates)
                  ]
                }
              }
            ]
          }
    }


    // Room type Filter
    if(roomType != undefined && roomType.length > 0){

      //roomTypeFilter = ` AND id in` + sequelize.literal(`SELECT listId FROM UserListingData WHERE settingsId in(${roomType.toString()})`);
      roomTypeFilter = {
       // $and: [
       //   {
            id: {
                $in: [
                  sequelize.literal(`SELECT listId FROM UserListingData WHERE settingsId in(${roomType.toString()})`)
                ]
            }
        //  }
       // ]   
      };
    }

    // Amenities Filter
    if(amenities != undefined && amenities.length > 0){
      //amenitiesFilter = ` AND id in` + sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`);
      amenitiesFilter = {
        //$and: [
         // {
            id: {
                $in: [
                  sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`)
                ]
            }
         // }
       // ]   
      };
    }


    // Spaces Filter
    if(spaces != undefined && spaces.length > 0){
      spacesFilter = {
        //$and: [
        //  {
            id: {
                $in: [
                  sequelize.literal(`SELECT listId FROM UserSpaces WHERE spacesId in(${spaces.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${spaces.length}`)
                ]
            }
       //   }
      //  ]   
      };
    }

    // House Rules Filter
    if(houseRules != undefined && houseRules.length > 0){
      houseRulesFilter = {
       // $and: [
       //   {
            id: {
                $in: [
                  sequelize.literal(`SELECT listId FROM UserHouseRules WHERE houseRulesId in(${houseRules.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${houseRules.length}`)
                ]
            }
       //   }
      //  ]   
      };
    }
    

    // Combine All Filters
    //filter = Object.assign(photosFilter, personCapacityFilter, datesFilter, roomTypeFilter, bedroomsFilter, bathroomsFilter, bedsFilter, amenitiesFilter, spacesFilter, houseRulesFilter, priceRangeFilter, geographyFilter);

    // SQL query for count
    const listingCount = await Listing.findAll({
      attributes: attributesParam,
      where: {
        $and: [
          bookingTypeFilter,
          publishedStatus,
          personCapacityFilter,
          datesFilter,
          roomTypeFilter,
          bedroomsFilter,
          bathroomsFilter,
          bedsFilter,
          amenitiesFilter,
          spacesFilter,
          houseRulesFilter,
          priceRangeFilter,
          geographyFilter,
          priceTypeFilter,
        ],
      },
    });

    let countLength = Object.keys(listingCount).length;

    // SQL query for results
    const listingData = await Listing.findAll({
      attributes: attributesParam,
      where: {
        $and: [
          bookingTypeFilter,
          publishedStatus,
          personCapacityFilter,
          datesFilter,
          roomTypeFilter,
          bedroomsFilter,
          bathroomsFilter,
          bedsFilter,
          amenitiesFilter,
          spacesFilter,
          houseRulesFilter,
          priceRangeFilter,
          geographyFilter,
          priceTypeFilter,
        ],
      },
      limit: limit,
      offset: offset,
    });

    return {
      count: countLength,
      results: listingData
    }

  },
};

export default SearchListing;
