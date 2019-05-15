import React from "react";
import {
  PublicLayout,
  PageTitle,
  DocumentTitleSetter
} from "../../_components";

export class NotFoundPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Not found"]}>
        <PublicLayout>
          <PageTitle>Not found</PageTitle>
          <div className="mt-5 mb-5">
            <div className="text-center">Sorry, this page was not found</div>
          </div>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
