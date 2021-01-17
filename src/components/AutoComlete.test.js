import React from "react";
import Autocomplete from "./index";
import propsValues from "../array";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from 'react-dom/test-utils';
import { mount } from "enzyme";

configure({ adapter: new Adapter() });

const setupComponent = () => {
  return mount(<Autocomplete data={propsValues} />);
};

describe("Тесты Autocomplete", () => {
  it("Отрисовка", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(".select").length).toBe(1);
  });
  it("Отображение попапа", () => {
    const wrapper = setupComponent();
    const event = {
      preventDefault() {},
      target: { value: "a" },
    };
    expect(wrapper.find("input").simulate("change", event));
    expect(wrapper.find(".select_popup").length).toBe(1);
  });
  it("Отображение выбранного пункта", () => {
    const wrapper = setupComponent();
    const event = {
      preventDefault() {},
      target: { value: "ajax" },
    };
    wrapper.find("input").simulate("change", event);
    wrapper.find(".select_popup-item").simulate("click");
    expect(wrapper.find(".selection_item").length).toBe(1);
  });
});
