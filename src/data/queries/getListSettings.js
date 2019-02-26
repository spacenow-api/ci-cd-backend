import ListSettingsType from "../types/ListSettingsType";

import { ListSettings } from "../../data/models";

import {
  GraphQLList as List,
  GraphQLInt as IntType,
} from "graphql";

const getListSettings = {
  type: new List(ListSettingsType),

  args: {
    typeId: { type: IntType }
  },

  async resolve({ request }, { typeId }) {

    let where;

    if (typeId != undefined) {
      where = { where: { typeId: typeId } };
    }

    where = Object.assign({}, where, { isEnable: true });

    const getResults = await ListSettings.findAll({
      ...where
    });

    if (!getResults) {
      return {
        status: "failed"
      };
    }

    return getResults;

  }
};

export default getListSettings;
