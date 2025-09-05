import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import AppStrings from '../constants/AppStrings';
import colors from '../constants/colors';
import DashBoardCardView from '../components/DashBoardCardView';
import { fs, hp, wp } from '../constants/responsive';
import fonts from '../constants/fonts';
import { useLoader } from '../constants/LoaderProvider';
import GetUsers from '../services/dashboard/GetUsers';
import GetAllCases from '../services/dashboard/GetAllCases';

const Dashboard = ({ navigation }) => {
const { showLoader, hideLoader } = useLoader();
  const [users, setUsers] = useState([]);
  const [cases, setCases] = useState([]);
// showLoader();
  

// 🔹 Function to fetch users
  const getUsersData = async () => {
    try {
     showLoader();
      const response = await GetUsers.getUsers();
      console.log("=== API Users Response ===", response);

      if (response?.success && response.Data) {
        setUsers(response.Data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error?.message || error);
      setUsers([]);
    } finally {
     hideLoader();
    }
  };

  const getAllCasesData = async () => {
    try {
     showLoader();
      const response = await GetAllCases.getCases();
      console.log("=== API Case Response ===", response);

      if (response?.success && response.Data) {
        setCases(response.Data);
      } else {
        setCases([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error?.message || error);
      setCases([]);
    } finally {
     hideLoader();
    }
  };

 useEffect(() => {
    getUsersData();
     getAllCasesData();
  }, []);




  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title={AppStrings.welcome} />

 <ScrollView>

      <View style={styles.container}>
        
          <DashBoardCardView
            title="Total Cases"
            value={`${cases.length}`}
            subtext="+10 this month"
            iconName="document" // Matches the clipboard icon
            color={colors.primary} 
             onPress={() => navigation.navigate('AllCases', { cases })}
          />
          <DashBoardCardView
            title="Active Users"
           value={`${users.length}`}
            subtext="of 11 total"
            iconName="people-outline" // Matches the users icon
            color={colors.secondary} // Use secondary color for the card background
             onPress={() => navigation.navigate('UserManagement')}
          
          />
          <DashBoardCardView
            title="Success Rate"
            value="10%"
            subtext="+5% vs last month"
            iconName="checkmark-circle-outline" // Matches the check circle icon
            color={colors.success} // Use success color for the card background
          />
          <DashBoardCardView
            title="System Health"
            value="98%"
            subtext="All systems operational"
            iconName="flash-outline" // Matches the flash icon
            color={colors.greenDark} // Use info color for the card background
          />
      

 <View style={styles.cardContainer}>
            <Text style={styles.header}>Case Status Overview</Text>
            <Text style={styles.subtext}>Real-time status distribution of all cases</Text>
         <View style={{ height: hp(0.2), backgroundColor: colors.lightGray,marginTop:hp(2),marginBottom:hp(2)}} />
            <View style={styles.cardGrid}>
           <CardView title="Disbursed"    value="1" bgcolor={colors.lightGreen}  color={colors.darkGreen} />
<CardView title="Sanctioned"   value="4" bgcolor={colors.lightBlue}   color={colors.darkBlue} />
<CardView title="Under Review" value="2" bgcolor={colors.lightYellow} color={colors.darkYellow} />
<CardView title="Rejected"     value="1" bgcolor={colors.lightRed}    color={colors.darkRed} />
<CardView title="Doc Updated"  value="2" bgcolor={colors.lightPurple} color={colors.darkPurple} />
<CardView title="More Docs"    value="0" bgcolor={colors.lightOrange} color={colors.darkOrange} />

            </View>
          </View>




 <View style={styles.cardContainer}>
            <Text style={styles.header}>User Distribution</Text>
           
         <View style={{ height: hp(0.2), backgroundColor: colors.lightGray,marginTop:hp(2),marginBottom:hp(2)}} />
            <View style={styles.cardGrid}>
         <UserCard
  title="Admins"
  value="2"
  dotColor={colors.roles.admin.dot}
  bgColor={colors.roles.admin.bg}
  textColor={colors.roles.admin.text}
/>

<UserCard
  title="Dealers"
  value="3"
  dotColor={colors.roles.dealer.dot}
  bgColor={colors.roles.dealer.bg}
  textColor={colors.roles.dealer.text}
/>

<UserCard
  title="Lenders"
  value="1"
  dotColor={colors.roles.lender.dot}
  bgColor={colors.roles.lender.bg}
  textColor={colors.roles.lender.text}
/>

<UserCard
  title="Employees"
  value="2"
  dotColor={colors.roles.employee.dot}
  bgColor={colors.roles.employee.bg}
  textColor={colors.roles.employee.text}
/>

<UserCard
  title="Senior Employees"
  value="3"
  dotColor={colors.roles.seniorEmployee.dot}
  bgColor={colors.roles.seniorEmployee.bg}
  textColor={colors.roles.seniorEmployee.text}
/>


            </View>
          </View>

      </View>

      </ScrollView>
    </SafeAreaView>
  );
};



const CardView = ({ title, value, bgcolor,color }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgcolor,borderColor:color,borderWidth:wp(0.2) }]}>
      <Text style={[styles.value,{color:color}]}>{value}</Text>
      <Text style={[styles.title,{color:color}]}>{title}</Text>
    </View>
  );
};

const UserCard = ({ title, value, dotColor, bgColor, textColor }) => {
  return (
    <View style={[styles.ucard, { backgroundColor: bgColor }]}>
      {/* Left side: Dot + Title */}
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text style={[styles.title2, { color: textColor }]}>{title}</Text>
      </View>

      {/* Right side: Value */}
      <Text style={[styles.value2, { color: textColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  cardContainer: {
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
  header: {
    fontSize: fs(18),
    fontFamily: fonts.semiBold,  
    color: colors.textPrimary,
    marginBottom: 5,
  },
  subtext: {
    fontSize: fs(14),
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginBottom: 10,
  },
   row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: wp(3.5),
    height: wp(3.5),
    borderRadius: wp(2),
    marginRight: wp(2.5),
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: 150,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight:5,
    marginBottom:10,
  },
   ucard: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
    marginBottom: hp(1),
  },
  value: {
    fontSize: fs(24),
    fontFamily: fonts.semiBold, 
  },
  title: {
    fontSize: fs(14),
    fontFamily: fonts.semiBold, 
    textAlign: 'center',
  },
    title2: {
    fontSize: fs(14),
    fontFamily: fonts.semiBold,
  },
  value2: {
    fontSize: fs(14),
    fontFamily: fonts.bold,
  },
});


export default Dashboard;