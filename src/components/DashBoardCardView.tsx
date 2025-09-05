import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { fs, hp, wp } from '../constants/responsive';
import fonts from '../constants/fonts';
import { TouchableOpacity } from 'react-native';

const DashBoardCardView = ({ title, value, subtext, iconName ,color,onPress}) => {
  return (
     <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.statRow}>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statSubtext}>{subtext}</Text>

   <View style={[styles.iconContainer, { backgroundColor: color }]}>
  <Icon name={iconName} size={wp(6)} color={colors.white} />
</View>

     </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: wp(2.5),
    padding: wp(4),
    marginBottom: hp(1.5),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: hp(0.1) },
    shadowOpacity: 0.1,
    shadowRadius: wp(0.8),
    elevation: 2,
  },
  sectionTitle: {
    fontSize: fs(16),
    fontFamily: fonts.semiBold, 
    color: colors.textPrimary,
    marginBottom: hp(1.5),
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  statValue: {
    fontSize: fs(24),
    fontFamily: fonts.semiBold, 
    color: colors.textPrimary,
  },
  statSubtext: {
    fontSize: fs(12),
    fontFamily: fonts.medium, 
    color: colors.green,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    position: 'absolute',
    right: wp(4),
    top: wp(4),
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default DashBoardCardView;