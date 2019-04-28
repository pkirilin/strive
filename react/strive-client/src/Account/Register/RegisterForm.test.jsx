import React from "react";
import { shallow } from "enzyme";
import { RegisterFormUnconnected } from "./RegisterForm";
import { getResources } from "../../_helpers";

describe("RegisterForm React component", () => {
  it("Renders without crashing", () => {
    shallow(<RegisterFormUnconnected resources={getResources()} />);
  });
});
