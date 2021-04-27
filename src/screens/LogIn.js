import React from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  NativeModules,
  Platform,
} from "react-native";
import QuestionButton from "./components/QuestionButton";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";
import { Socket, sharedKey, initLoginSockets } from "../misc/Socket";
import { JSHash, CONSTANTS} from "react-native-hash";


/**
 * @summary This represents the login screen. From here you
 * can either login or press reset password which will lead
 * you to the reset page.
 */
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", alert: false };
  }

  /**
   * @function
   * @summary Updates the state of the username when the user inputs text
   * @param {String} text text to update username to
   */
  handleUsername = (text) => {
    this.setState({ username: text });
  };

  /**
   * @function
   * @summary Updates the state of the password when the user inputs text
   * @param {String} text text to update password to
   */
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  /**
   * @function
   * @summary Tells the server that a user is trying to log in
   * @param {String} username username of the user to log in
   * @param {String} password password of the user to log in
   */
  handleLogin = (username, password) => {
    var Aes = NativeModules.Aes;
    initLoginSockets(this.props.navigation);
    //The passwords stored in the database are first salted
    var salt_pass = password.toString() + username.toString();

    //The passwords are also irreversibly hashed
    //The passwords are also irreversibly hashed
    let hash_pass;
    JSHash(salt_pass, CONSTANTS.HashAlgorithms.sha256)
      .then(hash => hash_pass = hash)
      .catch(e => console.log(e));

    if (!sharedKey) return alert("You are not connected to the server!");
    //The data transmission is encrypted in case of listeners.
    const encrypt_pass = () => {
      return Aes.randomKey(16).then(iv => {
          return Aes.encrypt(hash_pass, sharedKey, iv).then(cipher => ({
              cipher
          }))
      })
    }
    
    //The data transmission is encrypted in case of listeners.
    Socket.emit("login", username, encrypt_pass, Socket.id);
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <View style={styles.LoginContainer}>
          <Text style={styleSheets.LoginText}>Username:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="your username"
            onChangeText={this.handleUsername}
          />
          <Text style={styleSheets.LoginText}>Password:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="your password"
            onChangeText={this.handlePassword}
          />
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={() =>
            this.handleLogin(this.state.username, this.state.password)
          }
        >
          <Text style={styleSheets.ButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Reset")}
        >
          <Text style={styles.ForgotPassword}>forgot password?</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  LoginContainer: {
    width: "95%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_LARGE,
  },
  ForgotPassword: {
    fontFamily: "Roboto Slab",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#3E9EFE",
    textDecorationLine: "underline",
  },
});

export default LogIn;
