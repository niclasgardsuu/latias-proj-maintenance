import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import Guest from "./screens/Guest";
import Signup from "./screens/Signup";
import LogIn from "./screens/LogIn";
import Settings from "./screens/Settings";
import Toolbar from "./screens/components/Toolbar";
import Reset from "./screens/Reset";
import NewsQ from "./screens/NewsQ";
import Read from "./screens/Read";
import VerifyReset from "./screens/VerifyReset";
import UpdatePassword from "./screens/updatePassword";
import Developer from "./screens/Developer"

/**
 * @summary This file contains the stack navigator
 * for navigating between different screens.
 */
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Read: Read,
    NewsQ: NewsQ,
    Guest: Guest,
    Sign: Signup,
    LogIn: LogIn,
    Settings: Settings,
    Toolbar: Toolbar,
    Reset: Reset,
    VerifyReset: VerifyReset,
    UpdatePassword: UpdatePassword,
    Developer: Developer
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: false,
    },
  }
);

export default createAppContainer(navigator);
