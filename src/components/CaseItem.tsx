import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { CaseItemProps } from '../types/caseTypes'; // Assuming a types file, create this if needed
import Colors from '../constants/colors';
import fonts from '../constants/fonts';
import { fs } from '../constants/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const CaseItem: React.FC<CaseItemProps> = ({ item, onPress }) => {
  const initial = item.fullName.charAt(0).toUpperCase();
  const statusStyle = {
    backgroundColor:
      item.status === 'Disbursed' ? Colors.lightGreen :
      item.status === 'Document Updated' ? Colors.lightPurple :
      item.status === 'Approved/Sanction' ? Colors.lightBlue :
      item.status === 'Rejected' ? Colors.lightRed :
      item.status === 'Additional Document Required' ? Colors.lightYellow :
      item.status === 'Hold' ? Colors.lightOrange :
      Colors.white,
    color:
      item.status === 'Disbursed' ? Colors.darkGreen :
      item.status === 'Document Updated' ? Colors.darkPurple :
      item.status === 'Approved/Sanction' ? Colors.darkBlue :
      item.status === 'Rejected' ? Colors.darkRed :
      item.status === 'Additional Document Required' ? Colors.darkYellow :
      item.status === 'Hold' ? Colors.darkOrange :
      Colors.textPrimary,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.card, Platform.OS === 'android' && { elevation: 1 }]}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>{initial}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.date}>{moment(item.createdAt).format('DD MMM YYYY')}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, statusStyle]}>
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CaseItem.propTypes = {
  item: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    status: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: Colors.white,
    fontSize: fs(16),
    fontFamily: fonts.bold,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: fs(14),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    fontFamily: fonts.medium,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: fs(12),
    fontFamily: fonts.regular,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: fs(12),
    fontWeight: '600',
    fontFamily: fonts.semiBold,
  },
});

export default CaseItem;