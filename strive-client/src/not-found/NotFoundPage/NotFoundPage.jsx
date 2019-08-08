import React, { Component } from "react";
import {
  PublicLayout,
  AppHeader,
  DocumentTitleSetter,
  AppSectionSeparator
} from "../../_components";

export default class NotFoundPage extends Component {
  render() {
    return (
      <DocumentTitleSetter values={["Not found"]}>
        <PublicLayout>
          <AppSectionSeparator>
            <AppHeader>Not found</AppHeader>
          </AppSectionSeparator>
          <div className="mt-5 mb-5">
            <div className="text-center">Sorry, this page was not found</div>
          </div>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
