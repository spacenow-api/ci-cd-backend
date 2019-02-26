// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import CreateListingType from '../types/CreateListingType';

// Sequelize models
import { Listing, UserListingSteps, UserListingData } from '../../data/models';

import fetch from '../../core/fetch';

const createListing = {
  type: CreateListingType,

  args: {
    roomType: { type: StringType },
    houseType: { type: StringType },
    residenceType: { type: StringType },
    bedrooms: { type: StringType },
    buildingSize: { type: StringType },
    bedType: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    bathroomType: { type: StringType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    isMultiPerGuest: { type: BooleanType }
  },

  async resolve(
    { request, response },
    {
      roomType,
      houseType,
      residenceType,
      bedrooms,
      buildingSize,
      bedType,
      beds,
      personCapacity,
      bathrooms,
      bathroomType,
      country,
      street,
      buildingName,
      city,
      state,
      zipcode,
      lat,
      lng,
      isMultiPerGuest
    }
  ) {
    if (request.user && request.user.admin != true) {
      const address =
        street + ", " + city + ", " + state + ", " + country + ", " + zipcode;

      const query = `
        query ($address: String) {
          locationItem(address: $address) {
            street
            city
            state
            country
            zipcode
            lat
            lng
          }
        }
      `;

      const resp = await fetch("/graphql", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query,
          variables: { address: address }
        }),
        credentials: "include"
      });

      const { data } = await resp.json();

      let latValue = lat;
      let lngValue = lng;

      if (data.locationItem != null) {
        latValue = data.locationItem.lat;
        lngValue = data.locationItem.lng;
      }

      const doCreateListing = await Listing.create({
        userId: request.user.id,
        roomType: roomType,
        residenceType: residenceType,
        bedrooms: bedrooms,
        beds: beds,
        personCapacity: personCapacity,
        bathrooms: bathrooms,
        country: country,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        zipcode: zipcode,
        lat: latValue,
        lng: lngValue,
        isMultiPerGuest: isMultiPerGuest
      });

      if (doCreateListing) {
        // Recently added list id
        const id = doCreateListing.dataValues.id;

        // Assign other settings values in here
        let otherListSettings = [
          { settingsId: roomType, listId: id },
          { settingsId: houseType, listId: id },
          { settingsId: buildingSize, listId: id },
          { settingsId: bedType, listId: id },
          { settingsId: bathroomType, listId: id }
        ];

        // Bulk create on UserListingData to store other settings of this listingSteps
        const createOtherSettings = await UserListingData.bulkCreate(
          otherListSettings
        );

        return {
          status: "success",
          id: id
        };
      } else {
        return {
          status: "failed"
        };
      }
    } else {
      return {
        status: "notLoggedIn"
      };
    }
  }
};

export default createListing;
