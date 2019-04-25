import React from "react";
import { PublicLayout, PageTitle } from "../../_components";
import { config, getResources } from "../../_helpers";

export class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  componentWillMount() {
    let { documentTitles } = this.resources.errorPages;
    document.title = `${config.brandName} - ${documentTitles.notFound}`;
  }

  render() {
    let { contents, titles } = this.resources.errorPages.notFound;
    return (
      <PublicLayout>
        <PageTitle>{titles.pageHeader}</PageTitle>
        <div className="mt-5 mb-5">
          <div className="text-center">{contents.notFoundContent}</div>
        </div>
      </PublicLayout>
    );
  }
}
