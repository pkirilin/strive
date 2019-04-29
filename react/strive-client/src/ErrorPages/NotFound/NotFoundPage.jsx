import React from "react";
import {
  PublicLayout,
  PageTitle,
  DocumentTitleSetter
} from "../../_components";
import { getResources } from "../../_helpers";

export class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  render() {
    let { documentTitles } = this.resources.errorPages;
    let { contents, titles } = this.resources.errorPages.notFound;
    return (
      <DocumentTitleSetter values={[documentTitles.notFound]}>
        <PublicLayout>
          <PageTitle>{titles.pageHeader}</PageTitle>
          <div className="mt-5 mb-5">
            <div className="text-center">{contents.notFoundContent}</div>
          </div>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
