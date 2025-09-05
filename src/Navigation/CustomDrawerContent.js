// CustomDrawerContent.js
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppContext } from '../contexts/AppContext';
import colors from '../constants/colors';
import AppStrings from '../constants/AppStrings';
import { fs } from '../constants/responsive';
import fonts from '../constants/fonts';

function CustomDrawerContent(props) {
  const { user, logout } = useAppContext();

//  console.log('=========user======', JSON.stringify(user, null, 2));

  return (
    <View style={styles.drawerContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : ''}
            </Text>
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>{user?.fullName}</Text>

            <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')}>
              <Text style={styles.editprofile}>{AppStrings.editprofile}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Icon name="close" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      {/* Nav Items */}
      <TouchableOpacity
        style={[styles.navItem, props.state.index === 0 ? styles.selected : null]}
        onPress={() => props.navigation.navigate('Dashboard')}
      >
        <Icon
          name="dashboard"
          size={20}
          color={props.state.index === 0 ? colors.white : colors.black}
        />
        <Text
          style={[
            styles.navText,
            { color: props.state.index === 0 ? colors.white : colors.black },
          ]}
        >
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, props.state.index === 1 ? styles.selected : null]}
        onPress={() => props.navigation.navigate('AllCases')}
      >
        <Icon
          name="list-alt"
          size={20}
          color={props.state.index === 1 ? colors.white : colors.black}
        />
        <Text
          style={[
            styles.navText,
            { color: props.state.index === 1 ? colors.white : colors.black },
          ]}
        >
          All Cases
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, props.state.index === 2 ? styles.selected : null]}
        onPress={() => props.navigation.navigate('UserManagement')}
      >
        <Icon
          name="people"
          size={20}
          color={props.state.index === 2 ? colors.white : colors.black}
        />
        <Text
          style={[
            styles.navText,
            { color: props.state.index === 2 ? colors.white : colors.black },
          ]}
        >
          User Management
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          logout();
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }}
      >
        <Icon name="logout" size={20} color={colors.black} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, paddingBottom: 20 }}>
        <Text style={styles.versionText}>Version 1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.drawerBackground,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.logocolor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: colors.white,
    fontSize: fs(22),
    fontFamily: fonts.bold,
  },
  title: {
    color: colors.black,
    fontSize: fs(16),
    fontFamily: fonts.semiBold,
    marginLeft: 8,
  },
  editprofile: {
    color: colors.secondary,
    fontSize: fs(13),
    fontFamily: fonts.medium,
    marginLeft: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: colors.selectedItemBackground,
  },
  navText: {
    marginLeft: 16,
    fontSize: fs(15),
    fontFamily: fonts.medium,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  logoutText: {
    marginLeft: 16,
    fontSize: fs(15),
    fontFamily: fonts.medium,
    color: colors.black,
  },
  versionText: {
    fontSize: fs(11),
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
});

export default CustomDrawerContent;
