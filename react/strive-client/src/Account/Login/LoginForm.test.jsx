import React from "react";
import { shallow } from "enzyme";
import { LoginFormUnconnected } from "./LoginForm";
import { getResources } from "../../_helpers";

describe("LoginForm React component", () => {
  it("Renders without crashing", () => {
    shallow(<LoginFormUnconnected resources={getResources()} />);
  });
});
