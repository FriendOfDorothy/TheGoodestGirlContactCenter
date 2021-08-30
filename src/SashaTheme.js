const cadetBlue = "hsla(182, 25%, 50%, 1)";
const cadetBlueLight = "hsla(182, 25%, 50%, 1)";
const lightTheme = true;
const solitude = "hsla(206, 25%, 50%, 1)";
const white = "hsla(360, 100%, 100%, 1)";

export default {
  light: lightTheme,
  baseName: "cadetBlue",

  //base colors
  colors: {
    tabSelectedColor: cadetBlue,
    focusColor: cadetBlue,
    completeTaskColor: cadetBlue,
    defaultButtonColor: cadetBlue,
    flexBlueColor: cadetBlue,
  },

  overrides: {
    MainHeader: {
      Container: {
        background: cadetBlue,
        color: white,
      },
    },

    SideNav: {
      Container: {
        background: solitude,
        color: cadetBlue,
      },
      Button: {
        background: solitude,
        color: cadetBlue,
        lightHover: !lightTheme,
      },
      Icon: {
        color: white,
      },
    },

    //Admin Plugin
    FlexAdmin: {
      DashboardCard: {
        Icon: {
          backgroundColor: cadetBlueLight,
        },
      },
    },
  },
};
