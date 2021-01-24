
# Technical questions

**1.** How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.\
**Answer**: I spent around 2.5 hours on this coding test. If I had to spend more time on it, I would have worked on below items, but not limited to.\
- Displayed only 20 results at a time, with a 'Show more' button at bottom. On click of Show More, 20 more results would have been retrieved.
- Added 'Back to Top' button on the side, so that User wouldn't have to scroll all the way up
- Improved the styling
- Made the webpage responsive

**2.** What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.\
**Answer:** There are many new handy features in Javascript that allow writing the code in very simple and smart way. I feel that async/await was the most useful feature which was added as part of ECMA2017. This is the feature which I have used the most as compared to any other feature and it provides us with more friendly syntax as alternative to callbacks and Promise.\

`  async getListOfRestaurants(outcode) {
    NProgress.start();
    let url = "https://uk.api.just-eat.io/restaurants/bypostcode/" + outcode;
    const response = await axios.get(url);
    NProgress.done();
    return response.data;
  }
`

**3.** How would you track down a performance issue in production? Have you ever had to do this?\
**Answer:** In order to track down the performance issue, I would first try understanding the scenario in which performance issue is happening. Once I understand the scenario, I would go over the code being called for that scenario.\
Few of the pointers in my mind while looking at the code:\
- If Global execution context is taking quite some time to execute the lines of code, and while call stack is already busy, there is another user event that waits in the callback queue for call stack to get empty
- If SQL query is huge/complex/not indexed, results being returned are a large number, or iterating over result set is taking too long.\

Never had a major performance issue in production, but if I had, I would have followed above approach.\


**4.** How would you improve the Just Eat APIs that you just used?\
**Answer:** I noticed that it retrieves a huge list of restaurants delivering to the particular outcode. If it had to be improved, pagination could have been added to the API such that only 20 restaurants could have been retrieved at a time. Two additional attributes - `prev` and `next` could be added to the restaurants object in the response. `prev` would have maintained the endpoint for retrieving previous 20 restaurants, and `next` would have maintained the endpoint for retrieving the next 20 restaurants.
