import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fs, hp, wp } from '../constants/responsive';
import colors from '../constants/colors';
import MenuIcon from '../svg/menuIcon';
import { useAppContext } from '../contexts/AppContext';
import fonts from '../constants/fonts';
const CustomHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  const { user } = useAppContext();


  console.log('CustomHeader rendered with user:', user);

  return (
    <View style={styles.container}>
      {/* Drawer Toggle */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={styles.iconWrapper}
      >
       

<MenuIcon/>

      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title} {user?.fullName ? `- ${user.fullName}` : ''}</Text>


      {/* Right Action (Optional - Notification / Profile) */}
      <TouchableOpacity style={styles.iconWrapper}>
        <Icon name="notifications-outline" size={22} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: hp(7),
    backgroundColor: colors.secondary, // 💜 using secondary color now
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    justifyContent: 'space-between',
  },
  iconWrapper: {
    padding: wp(2),
  },
  title: {
      fontSize: fs(16), 
    color: colors.white,
    fontFamily: fonts.medium,
  },
});
