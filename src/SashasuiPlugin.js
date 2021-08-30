import React from "react";
import { FlexPlugin } from "flex-plugin";
import SashaTheme from "./SashaTheme";
import HowIsSasha from "./components/sashaactivity/howsSasha.jsx";

const PLUGIN_NAME = "SashasuiPlugin";

export default class SashasuiPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */

  init(flex, manager) {
    flex.MainHeader.defaultProps.logoUrl =
      "https://image.flaticon.com/icons/png/512/4402/4402039.png";

    manager.updateConfig({ colorTheme: SashaTheme });

    flex.NoTasksCanvas.Content.remove("first-line");
    flex.NoTasksCanvas.Content.remove("second-line");
    flex.NoTasksCanvas.Content.remove("hint");

    flex.NoTasksCanvas.Content.add(<HowIsSasha key="how-is-sasha" />, {
      sortOrder: -1,
    });

    manager.strings.TaskHeaderLine =
      "{{task.attributes.account_data.first_name}} " +
      "{{task.attributes.account_data.last_name}}";
    manager.strings.TaskLineCallReserved =
      "SLA: {{task.attributes.account_data.service_level}}";

    // use the Action Framework to trigger the outbound call passing in
    // event data containing phone number
    function receiveMessage(event) {
      console.log("Message Received", event);
      flex.Actions.invokeAction("StartOutboundCall", {
        destination: event.data, // set to the phone number received from CRM
      });
    }

    // if Flex is running in an iframe, hide some of the UI and
    // setup hooks for the messages exchanged between the Flex and CRM
    if (window.self !== window.top) {
      // hide the CRMContainer since Flex is being shown inside the CRM
      flex.AgentDesktopView.defaultProps.showPanel2 = false;

      // add event listener for messages arriving from the CRM
      window.addEventListener("message", receiveMessage, false);

      // when an agent selects a task, use the Actions Framework to
      // send task attributes to the parent window (CRM)
      flex.Actions.addListener("afterSelectTask", (payload) => {
        if (payload.task && payload.task.attributes) {
          window.top.postMessage(payload.task.attributes);
        }
      });
    }
  }
}
