import React from "react";
import { shallow } from "enzyme";
import { LoginFormUnconnected } from "./LoginForm";

describe("LoginForm React component", () => {
  it("Renders without crashing", () => {
    shallow(<LoginFormUnconnected />);
  });
});
