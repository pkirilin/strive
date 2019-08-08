import React from "react";
import { shallow } from "enzyme";
import { DocumentTitleSetter } from "./DocumentTitleSetter";

describe("DocumentTitleSetter React component", () => {
  it("Renders without crashing", () => {
    shallow(<DocumentTitleSetter />);
  });

  it("Renders child nodes correctly", () => {
    const titleSetter = shallow(
      <DocumentTitleSetter>
        <div>test</div>
      </DocumentTitleSetter>
    );
    const childDiv = titleSetter.find("div").first();
    expect(childDiv.text()).toEqual("test");
  });

  it("Sets document title correctly when only brand specified", () => {
    const testBrand = "My awesome brand";
    shallow(
      <DocumentTitleSetter brand={testBrand}>
        <div>Some component</div>
      </DocumentTitleSetter>
    );
    expect(document.title).toEqual(testBrand);
  });

  it("Sets document title correctly with brand", () => {
    const testBrand = "My awesome brand";
    const testValues = ["Page one", "Page two"];
    shallow(
      <DocumentTitleSetter brand={testBrand} values={testValues}>
        <div>Some component</div>
      </DocumentTitleSetter>
    );
    expect(document.title).toEqual(
      `${testBrand} - ${testValues[0]} - ${testValues[1]}`
    );
  });

  it("Sets document title correctly without brand", () => {
    const testValues = ["Page one", "Page two"];
    shallow(
      <DocumentTitleSetter displayBrand={false} values={testValues}>
        <div>Some component</div>
      </DocumentTitleSetter>
    );
    expect(document.title).toEqual(`${testValues[0]} - ${testValues[1]}`);
  });

  it("Sets document title correctly with brand and empty values array", () => {
    const testBrand = "My awesome brand";
    const testValues = [];
    shallow(
      <DocumentTitleSetter brand={testBrand} values={testValues}>
        <div>Some component</div>
      </DocumentTitleSetter>
    );
    expect(document.title).toEqual(testBrand);
  });
});
