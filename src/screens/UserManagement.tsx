// AllCasesScreen.js
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import colors from '../constants/colors';
import { useToaster } from '../constants/CustomToast';

function UserManagement() {
  const { showToast } = useToaster(); // ✅ Get toast function

  return (
    <View style={styles.container}>
      <CustomHeader title="All Cases" />
      <View style={styles.subcontainer}>
        <Text style={styles.screenTitle}>User Management</Text>

        <TouchableOpacity
          onPress={() => showToast('This is a toast message!')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Show Toast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  subcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  screenTitle: {
    fontSize: 28,
    color: colors.black,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default UserManagement;
