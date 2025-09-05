import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Platform } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/colors';
import { useToaster } from '../constants/CustomToast';
import { useRoute } from '@react-navigation/native';
import StatusFilter from '../components/StatusFilter';
import fonts from '../constants/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fs, hp } from '../constants/responsive';
import AppStrings from '../constants/AppStrings';
import BottomSheetModal from '../components/BottomSheetModal';
import CaseItem from '../components/CaseItem';


interface RouteParams {
  cases: any[];
}

const AllCases: React.FC = () => {
  const route = useRoute();
  const { cases } = (route.params as RouteParams).cases;
  const { showToast } = useToaster();

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log('======cases========', cases);

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.fullName.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter === 'All Status' || caseItem.status === statusFilter)
  );

  const renderModalContent = () => {
    if (!selectedItem) return null;

    return (
      <>
        <Text style={styles.modalTitle}>{AppStrings.modalTitle}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>{AppStrings.loanServiceLabel}</Text>
          <Text style={styles.value}>[Loan Service Data]</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>{AppStrings.vehicleCategoryLabel}</Text>
          <Text style={styles.value}>[Vehicle Category Data]</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>{AppStrings.statusLabel}</Text>
          <Text style={styles.value}>{selectedItem.status}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>{AppStrings.pdtStatusLabel}</Text>
          <Text style={styles.value}>[PDT Status Data]</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>{AppStrings.contactLabel}</Text>
          <Text style={styles.value}>{selectedItem.phone}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.buttonText}>{AppStrings.viewButton}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.buttonText}>{AppStrings.deleteButton}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={AppStrings.allCasesTitle} />
      <View style={styles.subcontainer}>
        <View style={styles.headerRow}>
          <View style={styles.filterContainer}>
            <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>{AppStrings.addCaseButton}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={AppStrings.searchPlaceholder}
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
        <FlatList
          data={filteredCases}
          renderItem={({ item }) => <CaseItem item={item} onPress={() => { setSelectedItem(item); setModalVisible(true); }} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          ListFooterComponent={<View style={styles.footerPadding} />}
        />
      </View>
      <BottomSheetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        {renderModalContent()}
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subcontainer: { padding: 10 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterContainer: {
    width: '70%',
    alignSelf: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginVertical: 10,
  },
  list: {
    padding: 12,
    paddingBottom: 24,
  },
  footerPadding: {
    height: hp(20),
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: fs(14),
    color: Colors.textPrimary,
  },
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
  name: { fontSize: fs(14), fontWeight: 'bold', color: Colors.textPrimary, fontFamily: fonts.medium },
  date: { color: Colors.textSecondary, fontSize: fs(12), fontFamily: fonts.regular },
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
  modalTitle: {
    fontSize: fs(18),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
    fontFamily: fonts.semiBold,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: fs(14),
    color: Colors.textSecondary,
    fontFamily: fonts.regular,
  },
  value: {
    fontSize: fs(14),
    color: Colors.textPrimary,
    fontFamily: fonts.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  viewButton: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: Colors.danger,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: { color: Colors.white, fontFamily: fonts.regular, textAlign: 'center' },
  addButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
  closeText: {
    color: Colors.secondary,
    fontSize: fs(14),
    fontFamily: fonts.semiBold,
  },
});

export default AllCases;