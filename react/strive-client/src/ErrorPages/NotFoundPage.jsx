import React from "react";
import { PublicLayout } from "../_components";
import { MainTitle } from "../_components";
import { BRAND_NAME } from "../_constants";
import { getResourcesForCurrentCulture } from "../_helpers";

export class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${BRAND_NAME} - ${
      this.state.resources.titleResources.notFound
    }`;
  }

  render() {
    return (
      <div>
        <PublicLayout>
          <MainTitle text="Not found" />
          <div className="mt-5 mb-5">
            <div className="text-center">Sorry, this page was not found...</div>
          </div>
        </PublicLayout>
      </div>
    );
  }
}
