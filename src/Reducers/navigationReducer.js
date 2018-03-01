import { NavigationActions } from "react-navigation";

import AppNavigator from "../Navigation/navigationStack";
import { Login, Logout } from "../Actions/actionTypes";

//Force a Init of the main router
let stateForLoggedIn = AppNavigator.router.getStateForAction( NavigationActions.init() );

const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams("Tabs");

//Then calculate the state with a navigate action to the first route, sending the previous initialized state as argument
stateForLoggedIn = AppNavigator.router.getStateForAction(
  ActionForLoggedIn,
  stateForLoggedIn
);

const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams(
  "LoginScreen"
);

const stateForLoggedOut = AppNavigator.router.getStateForAction(
  ActionForLoggedOut
);

const initialState = { stateForLoggedOut, stateForLoggedIn };

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "@@redux/INIT":
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          ActionForLoggedIn,
          stateForLoggedOut
        )
      };

    case Login:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          ActionForLoggedIn,
          stateForLoggedOut
        )
      };

    // case Logout:
    //   return {
    //     ...state,
    //     stateForLoggedOut: AppNavigator.router.getStateForAction(
    //       NavigationActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: "login" })]
    //       })
    //     )
    //   };

    /* Other logic for logging out, more cleaner but unlike the above isn't telling the reader 
           that navigation is reset, that's why I chose the *reset* one for the article. I prefer
           this one, what about you?
        
        case 'LOGOUT':
            return { 
              ...state, 
              stateForLoggedIn, 
              stateForLoggedOut
            }
            break;
        */

    default:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          action,
          state.stateForLoggedIn
        )
      };
  }
};

export default navigationReducer;
