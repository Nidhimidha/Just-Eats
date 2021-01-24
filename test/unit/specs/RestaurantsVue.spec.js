import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import sinon from 'sinon'
import BootstrapVue, { BIcon } from "bootstrap-vue";
import restaurantsVue from "@/components/Restaurants";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.component('BIcon', BIcon)
const clickMethodStub = sinon.stub();
test("Renders the alert when noResults property is set to true", () => {
  const wrapper = shallowMount(restaurantsVue, {
    localVue
  });
  wrapper.setData({ noResults: true });
  expect(wrapper.find('.alert').exists()).toBe(true);
});

test("Calls the fetchRestaurants method on click of anchor tag", () => {
  const wrapper = mount(restaurantsVue, {
    localVue
  });
  wrapper.setMethods({ fetchRestaurants: clickMethodStub });
  wrapper.find('a').trigger('click');
  expect(clickMethodStub.called).toBe(true)
});
