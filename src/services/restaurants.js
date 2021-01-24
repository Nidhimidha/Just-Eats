import axios from "axios";
import NProgress from "nprogress";
export default {
  async getListOfRestaurants(outcode) {
    NProgress.start();
    let url = "https://uk.api.just-eat.io/restaurants/bypostcode/" + outcode;
    const response = await axios.get(url);
    NProgress.done();
    return response.data;
  }
};
