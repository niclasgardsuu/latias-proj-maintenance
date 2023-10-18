import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import LogIn from "../screens/LogIn.js";
import HomeScreen from "../screens/HomeScreen.js";
import GameScreen from "../screens/GameScreen.js";
import EndScreen from "../screens/EndScreen.js";
import Signup from "../screens/Signup.js";
import Reset from "../screens/Reset.js";
import VerifyReset from "../screens/VerifyReset.js";
import UpdatePassword from "../screens/updatePassword.js";
import NewsQWaiting from "../screens/NewsQReady.js";
import DeveloperNewsQ from "../screens/DeveloperNewsQ.js";
import DeveloperCoupons from "../screens/DeveloperCoupons.js";
import DeveloperArtQ from "../screens/DeveloperArtQ.js";
import DeveloperArticles from "../screens/DeveloperArticles.js";
import Developer from "../screens/Developer.js";

// Mock the navigator to allow testing of components with navigation
jest.mock('react-navigation', () => ({
  withNavigation: Component => props => (
    <Component navigation={{ navigate: jest.fn(), getParam:  jest.fn()}} {...props} />
  ),
  SafeAreaView: ({ children }) => <>{children}</>,
}));

describe("Test Suite for Client", () => {

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
    cleanup();
  });

  test("All necessary login elements are present", () => {
    render(<LogIn />);

    // Login button is present
    expect(screen.getByText("LOGGA IN")).toBeDefined();

    // Input fields for username and password exists
    expect(screen.getByPlaceholderText("Användarnamn")).toBeDefined();
    expect(screen.getByPlaceholderText("Lösenord")).toBeDefined();
  });

  test("All necessary home screen elements are present", () => {
    render(<HomeScreen />);

    expect(screen.getByText("LOGGA IN")).toBeDefined();
    expect(screen.getByText("REGISTRERA")).toBeDefined();
    expect(screen.getByText("SPELA SOM GÄST")).toBeDefined();
  });

  test("All necessary game screen elements are present", () => {
    render(<GameScreen />);

    expect(screen.getByText("LÄS VECKANS ARTIKLAR")).toBeDefined();
    expect(screen.getByText("VECKANS ARTIKEL QUIZ")).toBeDefined();
    expect(screen.getByText("VECKANS NYHETSFRÅGOR")).toBeDefined();
  });

  test("All necessary end screen elements are present", () => {
    render(<EndScreen />);

    expect(screen.getByText("GAMESCREEN")).toBeDefined();
  });

  test("All necessary signup elements are present", () => {
    render(<Signup />);

    expect(screen.getByPlaceholderText("Användarnamn")).toBeDefined();
    expect(screen.getByPlaceholderText("Lösenord")).toBeDefined();
    expect(screen.getByPlaceholderText("Mail")).toBeDefined();

    expect(screen.getByText("REGISTRERA")).toBeDefined();
  });

  test("All necessary reset password elements are present", () => {
    render(<Reset />);

    expect(screen.getByPlaceholderText("Email")).toBeDefined();
    expect(screen.getByText("SKICKA MAIL")).toBeDefined();
  });
  
  test("All necessary news question waiting elements are present", () => {
    render(<NewsQWaiting />);

    expect(screen.getByText("STARTA")).toBeDefined();
  });

  test("All necessary developer news questions elements are present", () => {
    render(<DeveloperNewsQ />);

    expect(screen.getByPlaceholderText("Fråga")).toBeDefined();
    expect(screen.getAllByPlaceholderText("Fel svar").length).toBe(2);
    expect(screen.getByPlaceholderText("Rätt svar")).toBeDefined();
    expect(screen.getByPlaceholderText("Lämna blankt för denna vecka")).toBeDefined();
    expect(screen.getByText("SKICKA")).toBeDefined();
    expect(screen.getByText("ÅTERSTÄLL FRÅGOR")).toBeDefined();
  });

  test("All necessary coupons elements are present", () => {
    render(<DeveloperCoupons />);

    expect(screen.getByPlaceholderText("Kupongens namn")).toBeDefined();
    expect(screen.getByPlaceholderText("Pris")).toBeDefined();
    expect(screen.getByText("SKICKA")).toBeDefined();
    expect(screen.getByText("ÅTERSTÄLL KUPONGER")).toBeDefined();
  });

  test("All necessary developer article questions elements are present", () => {
    render(<DeveloperArtQ />);

    expect(screen.getByPlaceholderText("Fråga")).toBeDefined();
    expect(screen.getAllByPlaceholderText("Fel svar").length).toBe(3);
    expect(screen.getByPlaceholderText("Rätt svar")).toBeDefined();
    expect(screen.getByPlaceholderText("Lämna blankt för denna vecka")).toBeDefined();
    expect(screen.getByText("SKICKA")).toBeDefined();
    expect(screen.getByText("ÅTERSTÄLL FRÅGOR")).toBeDefined();
  });

  test("All necessary developer article elements are present", () => {
    render(<DeveloperArticles />);

    expect(screen.getByPlaceholderText("Artikelns namn")).toBeDefined();
    expect(screen.getByPlaceholderText("Länk")).toBeDefined();
    expect(screen.getAllByPlaceholderText("Lämna blankt för denna vecka").length).toBe(2);
    expect(screen.getByText("SKICKA")).toBeDefined();
    expect(screen.getByText("ÅTERSTÄLL ARTIKLAR")).toBeDefined();
  });

  test("All necessary news question waiting elements are present", () => {
    render(<Developer />);

    expect(screen.getByText("NYHETSFRÅGOR")).toBeDefined();
    expect(screen.getByText("ARTIKELQUIZ")).toBeDefined();
    expect(screen.getByText("FRÅGOR")).toBeDefined();
    expect(screen.getByText("KUPONGER")).toBeDefined();
    expect(screen.getByText("ARTIKLAR")).toBeDefined();
  });

  test("All necessary news question waiting elements are present", () => {
    render(<NewsQWaiting />);

    expect(screen.getByText("STARTA")).toBeDefined();
  });

  /**
   * Unable to mock navigation.getParam("email", null), meaning that the screen can't be rendered
   * Same for UpdatePassword
   */
  // test("All necessary verify reset elements are present", () => {
  //   const mockedParams = {
  //     route: {params: { email: 'whatever-id' }},
  //     navigation: ''
  //   };
  //   render(<VerifyReset {...mockedParams} />);

  //   expect(screen.getByPlaceholderText("Kod")).toBeDefined();
  //   expect(screen.getByText("SUBMIT CODE")).toBeDefined();
  //   expect(screen.getByText("CANCEL")).toBeDefined();
  // });
  
  /** 
   * I have not found any way to check that this works with react 18
   * Mocking the handleLogin function that is called by the press does not work as jest cannot mock arrow functions
   * Creating an instance of LogIn and switching the handleLogin does not work as we cannot render an instance
   * Making handleLogin to a method instead of an arrow function should work but doesn't
   * The testing utility Enzyme that might be able to help with this is deprecated since react 16 
   * 
   * userEvent makes checks that the element it is interacting with is visible for a regular user
   * But I am unable to find a way to check that the values of the textinputs have been updated
   * The value of the textinput that should update when writing in it does not exist
   */
  // test("All necessary components are intractable", () => {
  //   const user = userEvent.setup();
  //   render(<LogIn />);

  //   const username = screen.getByPlaceholderText("Användarnamn");
  //   const password = screen.getByPlaceholderText("Lösenord");

  //   user.type(username, "Test");
  //   user.type(password, "Test1");
  //   user.click(screen.getByText("LOGGA IN"));

  //   console.log(username.value);
  // });

});
