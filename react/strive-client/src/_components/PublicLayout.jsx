import React from "react";
import { Footer } from "./Footer";

export class PublicLayout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
