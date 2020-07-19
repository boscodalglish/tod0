import React from "react";
import { configure, mount, shallow, render } from "enzyme";
import { TodoList } from "./TodoList";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("TodoList", () => {
  it("renders", () => {
    mount(<TodoList />);
  });

  it("initially displays 3 items, first of them done", () => {
    const wrapper = mount(<TodoList />);
    expect(wrapper.find("li")).toHaveLength(3);
    expect(
      wrapper.find("input[type='checkbox']").map(el => el.getDOMNode().checked)
    ).toEqual([true, false, false]);
  });

  it("adds a new item", () => {
    let wrapper = mount(<TodoList />);

    wrapper
      .find("button")
      .last()
      .simulate("click");

    wrapper.find("input[type='text']").getDOMNode().value = "New item";
    wrapper
      .find("button")
      .last()
      .simulate("click");

    // expect(wrapper.find("li")).toHaveLength(4);
    // Let's check what wrong in our instance
    console.log(wrapper.debug());
    expect(
      wrapper
        .find("li span")
        .last()
        .text()
    ).toEqual("New item");
  });

  it("removes an item", () => {
    const wrapper = mount(<TodoList />);
    wrapper
      .find("li button")
      .first()
      .simulate("click");
    expect(wrapper.find("li")).toHaveLength(2);
    expect(wrapper.find("li span").map(el => el.text())).toEqual([
      "Prepare a demo",
      "Prepare presentation slides"
    ]);
  });
});
