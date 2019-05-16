import React from "react";
import {
  PublicLayout,
  AppHeader,
  DocumentTitleSetter
} from "../../_components";

export class NotFoundPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Not found"]}>
        <PublicLayout>
          <AppHeader>Not found</AppHeader>
          <div className="mt-5 mb-5">
            <div className="text-center">Sorry, this page was not found</div>
          </div>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
