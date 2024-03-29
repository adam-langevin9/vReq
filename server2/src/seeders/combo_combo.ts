import type { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) =>
    await queryInterface.bulkInsert(
      "ComboCombos",
      [
        {
          combo_id: 44,
          sub_combo_id: 110,
        },
        {
          combo_id: 44,
          sub_combo_id: 111,
        },
        {
          combo_id: 110,
          sub_combo_id: 112,
        },
        {
          combo_id: 45,
          sub_combo_id: 113,
        },
        {
          combo_id: 74,
          sub_combo_id: 115,
        },
        {
          combo_id: 74,
          sub_combo_id: 116,
        },
        {
          combo_id: 86,
          sub_combo_id: 117,
        },
        {
          combo_id: 95,
          sub_combo_id: 118,
        },
        {
          combo_id: 96,
          sub_combo_id: 119,
        },
        {
          combo_id: 121,
          sub_combo_id: 124,
        },
        {
          combo_id: 122,
          sub_combo_id: 124,
        },
        {
          combo_id: 123,
          sub_combo_id: 124,
        },
        {
          combo_id: 121,
          sub_combo_id: 125,
        },
        {
          combo_id: 125,
          sub_combo_id: 126,
        },
        {
          combo_id: 125,
          sub_combo_id: 127,
        },
        {
          combo_id: 125,
          sub_combo_id: 128,
        },
        {
          combo_id: 123,
          sub_combo_id: 129,
        },
        {
          combo_id: 129,
          sub_combo_id: 130,
        },
      ],
      {}
    ),
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("ComboCombos", {});
  },
};
