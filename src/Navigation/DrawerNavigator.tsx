import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import AllCases from '../screens/AllCases';
import UserManagement from '../screens/UserManagement';

import CustomDrawerContent from './CustomDrawerContent';
import { Dimensions } from 'react-native';

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');
const DrawerNavigator = () => {
  return (
  <Drawer.Navigator
  drawerContent={(props) => <CustomDrawerContent {...props} />}
  initialRouteName="Dashboard"
  screenOptions={{ headerShown: false ,
    drawerType: 'front', // use 'front' for a more modern look
    drawerStyle:{
     width:width
    }
  }} // disable built-in header
>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="AllCases" component={AllCases} />
      <Drawer.Screen name="UserManagement" component={UserManagement} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
