import React from "react";
import { shallow } from "enzyme";
import { RegisterFormUnconnected } from "./RegisterForm";

describe("RegisterForm component", () => {
  it("Renders without crashing", () => {
    shallow(<RegisterFormUnconnected />);
  });
});
