import React from "react";
import { connect } from "react-redux";
import { PrivateLayout, MainTitle } from "../_components";
import { getResourcesForCurrentCulture, config } from "../_helpers";
import { Button } from "reactstrap";
import { accountActions } from "../_actions";
import Cookies from "js-cookie";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${this.state.resources.title.home}`;
  }

  onLogoutClick() {
    this.props.dispatch(accountActions.logout());
  }

  render() {
    const userFromStorage = Cookies.getJSON(config.cookies.user.keyName);
    return (
      <PrivateLayout>
        <MainTitle text="Home" />
        <div className="text-center m-3">
          Signed in as {userFromStorage.username}
        </div>
        <div className="d-flex justify-content-center">
          <Button onClick={this.onLogoutClick}>Logout</Button>
        </div>
      </PrivateLayout>
    );
  }
}

const connectedHome = connect()(Home);
export { connectedHome as Home };
