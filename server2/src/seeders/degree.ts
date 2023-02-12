import type { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) =>
    await queryInterface.bulkInsert(
      "Degrees",
      [
        {
          id: 1,
          title: "B.S. Computer Science (Systems)",
          req_id: 113,
          other_reqs:
            "Nine hours not counted towards your degree are required in CSC at the 300-400 level and one of the following not counted towards your degree: BIO 201, BIO 202, BIO 240, CHM 101, CHM 211, PHY 201.",
        },
        {
          id: 2,
          title: "B.S. Computer Science (Biology)",
          req_id: 114,
          other_reqs:
            "Six hours not counted towards your degree are required in CSC at the 300-400 level and 13 hours not counted towards your degree are required in BIO above the 200 level.",
        },
        {
          id: 3,
          title: "B.S. Biology (Biology)",
          req_id: 115,
          other_reqs:
            "Additionally, must take a minimum of 19 hours chosen from BIO courses numbered above 299. No more than 10 hours from BIO 480, BIO 491, BIO 493, BIO 498, and BIO 499 can be counted towards the elective 19 hours.",
        },
      ],
      {}
    ),
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("Degrees", {});
  },
};
