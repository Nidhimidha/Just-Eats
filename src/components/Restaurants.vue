<template>
  <div class="container">
    <b-alert class="alert" :show="noResults" variant="warning"
      >No Results to display</b-alert
    >
    <b-jumbotron
      header="SEARCH FOR RESTAURANTS"
      lead="Enter an outcode to search for restaurants delivering in your area"
    >
      <div class="form-row mb-5">
        <div class="col-4"></div>
        <div class="col-3" style="float:right">
          <b-form-input
            v-model="outcode"
            @keyup.enter.native="fetchRestaurants"
          ></b-form-input>
        </div>
        <div style="text-align: left" class="col-5">
          <a style="cursor: pointer" @click="fetchRestaurants">
            <b-icon class="iconCl" icon="search"></b-icon
          ></a>
        </div>
      </div>
      <div class="form-row">
        <div
          class="col-12"
          v-if="
            restaurants !== null &&
              restaurants !== undefined &&
              restaurants.length !== 0
          "
        >
          <hr />
          <div class="row">
            <div class="col-2"></div>
            <div class="col-3">
              <h3>SEARCH RESULTS</h3>
            </div>
            <div class="col-3">
              <b-form-select
                @change="triggerSort"
                v-model="selected"
                :options="options"
              ></b-form-select>
            </div>
          </div>
          <br />
          <div class="row mb-2" v-for="item in restaurants" :key="item.id">
            <div class="col-md-4"></div>
            <div class="col-md-8">
              <b-card :title="item.Name" class="overflow-hidden cardCl">
                <b-row no-gutters>
                  <b-col md="6">
                    <b-card-img :src="item.LogoUrl" alt="Image"></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body>
                      <p
                        v-for="cuisine in item.Cuisines"
                        :key="cuisine.SeoName"
                      >
                        <b-icon icon="suit-diamond-fill"></b-icon
                        >{{ cuisine.Name }}
                      </p>
                      <b-card-text>
                        Rating: {{ item.RatingAverage }}
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </b-jumbotron>
  </div>
</template>
<script>
import RestaurantsService from "@/services/restaurants";
export default {
  data() {
    return {
      noResults: false,
      outcode: null,
      restaurants: null,
      selected: null,
      options: [
        { value: null, text: "Sort By" },
        { value: "ratinglow", text: "Rating - Low to High" },
        { value: "ratinghigh", text: "Rating - High to Low" }
      ]
    };
  },
  methods: {
    async fetchRestaurants() {
      await RestaurantsService.getListOfRestaurants(this.outcode).then(
        response => {
          if (response.Restaurants.length > 0) {
            this.noResults = false;
            this.restaurants = response.Restaurants;
          } else {
            this.noResults = true;
          }
        }
      );
    },
    triggerSort() {
      if (this.selected === "ratinglow") {
        const compare = (a, b) => {
          const aRating = Number(a.RatingAverage);
          const bRating = Number(b.RatingAverage);
          return aRating - bRating;
        };
        this.restaurants = this.restaurants.sort(compare);
      } else if (this.selected === "ratinghigh") {
        const compare = (a, b) => {
          const aRating = Number(a.RatingAverage);
          const bRating = Number(b.RatingAverage);
          return bRating - aRating;
        };
        this.restaurants = this.restaurants.sort(compare);
      }
    }
  }
};
</script>
<style scoped>
.iconCl {
  margin-top: 12px;
}
.cardCl {
  width: 25rem;
}
</style>
