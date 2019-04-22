import React from "react";
import { PublicLayout, MainTitle } from "../_components";
import { getResourcesForCurrentCulture, config } from "../_helpers";

export class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${
      this.state.resources.title.notFound
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
