import { CommonActions } from '@react-navigation/native';

import { useEffect } from 'react';
import { BackHandler } from 'react-native';


let navigationRef = null;

/**
 * Sets the navigation ref from NavigationContainer.
 * Should be called once NavigationContainer is mounted.
 */
export const setNavigationRef = (ref) => {

  navigationRef = ref;
};

/**
 * Navigate to a specific screen with optional params.
 */
export const navigate = (routeName, params = {}) => {
  if (navigationRef?.isReady()) {
    
    navigationRef.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      })
    );
  } else {
    console.log('NavigationService.js: Navigation ref not ready');
  }
};

/**
 * Reset navigation to a given route, optionally with a nested screen.
 * Example: reset('Main', { screen: 'Home' })
 */
export const reset = (routeName, nestedParams = null) => {
  if (navigationRef?.isReady()) {
    let routes;

    if (nestedParams?.screen) {
      routes = [
        {
          name: routeName,
          state: {
            index: 0,
            routes: [{ name: nestedParams.screen }],
          },
        },
      ];
    } else {
      routes = [{ name: routeName }];
    }

    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes,
      })
    );
  } else {
    console.log('NavigationService.js: Navigation ref not ready');
  }
};




/**
 * Returns whether the navigation container is ready.
 */
export const isReady = () => {
  return navigationRef?.isReady() || false;
};
export const goBack = () => {
  if (navigationRef?.canGoBack()) {
    navigationRef.goBack();
  } else {
    console.log('NavigationService.js: Cannot go back');
  }
};

export const useBackHandler = (onBackPress) => {
  useEffect(() => {
    const handleBackPress = () => {
      if (onBackPress && typeof onBackPress == 'function') {
        console.log('==========onBackPress============',onBackPress);
        onBackPress();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [onBackPress]);
};