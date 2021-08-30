import React, { Component } from "react";
import { withTheme } from "@twilio/flex-ui";
import { Button, Image, Divider } from "semantic-ui-react";
import AlertAddAlert from "material-ui/svg-icons/alert/add-alert";


class HowIsSasha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sashaStatus: null,
      numbOfTreats: 0, //current calls we've taken
      isLoaded: false, //is the content loaded
      isError: false, //is there an error
    };
  }

  render() {
    const { sashaStatus, isError } = this.state;

    if (isError) {
      console.log(isError);
      this.setState({
        sashaStatus: isError,
      });
    }

    return (
      <div>
        <Divider><h1>Hmm... There really isn't much to do right now..</h1></Divider>
        <Button>See What Sasha is Doing</Button>
      </div>
    );
  }
}
export default withTheme(HowIsSasha);
