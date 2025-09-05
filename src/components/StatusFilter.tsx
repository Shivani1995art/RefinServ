import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import colors from '../constants/colors';
import { hp, wp ,fs} from '../constants/responsive';
import fonts from '../constants/fonts';

const statusOptions = [
  { label: 'All Status', value: 'All Status' },
  { label: 'Document Updated', value: 'Document Updated' },
  { label: 'Approved/Sanction', value: 'Approved/Sanction' },
  { label: 'Disbursed', value: 'Disbursed' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Additional Document Required', value: 'Additional Document Required' },
  { label: 'Hold', value: 'Hold' },
];

export default function StatusFilter({ statusFilter, setStatusFilter }) {
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={statusOptions}
        labelField="label"
        valueField="value"
        placeholder="Select status"
        value={statusFilter}
        onChange={item => setStatusFilter(item.value)}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        itemTextStyle={styles.itemText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 0 },
  dropdown: {
    height: hp(5),
    width:'100%',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  selectedText: { fontSize: fs(14), color: colors.black,fontFamily:fonts.regular },
  placeholder: { fontSize: fs(14), color: colors.textLight,fontFamily:fonts.regular },
  itemText: { fontSize: fs(14), color: colors.black,fontFamily:fonts.regular },
});
