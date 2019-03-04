import React from "react";
import { PublicLayout } from "../_components";
import { MainTitle } from "../_components";

export class NotFoundPage extends React.Component {
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
