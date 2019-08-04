import React from "react";
import { shallow } from "enzyme";
import { RegisterFormUnconnected } from "../components/RegisterForm";

describe("RegisterForm React component", () => {
  it("Renders without crashing", () => {
    shallow(<RegisterFormUnconnected />);
  });
});
