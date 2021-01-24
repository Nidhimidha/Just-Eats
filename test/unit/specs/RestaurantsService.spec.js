import Restaurants from "@/services/Restaurants";
const axios = require("axios");

jest.mock("axios");

test("API returns correct results", async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        Area: "Upper Norwood",
        Restaurants: [
          {
            Id: 22547,
            Name: "Tops Pizza",
            City: "London"
          },
          {
            Id: 110961,
            Name: "Xpress Grill",
            City: "Croydon"
          }
        ],
        Dishes: [],
        promotedPlacement: null
      }
    ]
  });

  const obj = await Restaurants.getListOfRestaurants();
  expect(obj[0].Area).toEqual("Upper Norwood");
});
