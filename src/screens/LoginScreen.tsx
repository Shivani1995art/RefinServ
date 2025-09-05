import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fs, hp, wp } from '../constants/responsive';
import { useToaster } from '../constants/CustomToast';
import fonts from '../constants/fonts';
import AuthService from '../services/auth/AuthService';
const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

  const { showToast } = useToaster(); 

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const handleLogin = async () => {
   //  showToast('success', 'Login Successful', 'Welcome back!');
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (!valid) return;

    try{
         setLoading(true); 
 const response = await AuthService.login(email, password);

 console.log('=======response======',JSON.stringify(response,null,2));
 if (response?.success) {
   login({
    ...response.Data,
  token: response.token, 
  });
   showToast(response.message)
 }else{
  showToast(response.data.message)
 }
    }catch (error){
  console.error('Login Error=====>:', error?.response?.data || error.message );
 showToast(error?.response?.data.message)
    }finally {
      setLoading(false); 
    }

   
  };

  return (
    <View style={styles.container}>
    

<Ionicons name="lock-closed"    size={60}  style={styles.logo} color={colors.secondary} />

      <Text style={styles.title}>Sign in to Refinserv</Text>
      <Text style={styles.subtitle}>Use your work email and password</Text>

      <View style={styles.card}>
        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="you@mail.com"
            editable={!loading}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Password */}
     
<View style={styles.inputContainer}>
  <Text style={styles.label}>Password</Text>

  <View style={styles.passwordWrapper}>
    <TextInput
      style={[styles.passinput, passwordError ? styles.inputError : null, { flex: 1 }]}
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!showPassword} // ✅ Toggle secure entry
      placeholder="Enter your password"
        editable={!loading} 
    />
    <TouchableOpacity
      onPress={() => setShowPassword(!showPassword)}
      style={styles.eyeIcon}
       disabled={loading}
    >
      <Ionicons
        name={showPassword ? 'eye-off' : 'eye'}
        size={22}
        color={showPassword ? colors.darkGray : colors.darkGray}
      />
    </TouchableOpacity>
  </View>

  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
</View>


        {/* Remember + Forgot */}
        <View style={styles.options}>
          <TouchableOpacity 
            style={styles.rememberRow} 
            onPress={() => setIsRemembered(!isRemembered)}
             disabled={loading}
          >
            <View style={[styles.checkbox, isRemembered && styles.checkboxChecked]}>
              {isRemembered && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}  disabled={loading} >

        {loading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.copyright}>© 2024 Refinserv. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: wp('5%'), 
  },
  logo: { 
    marginBottom: hp('2%') 
  },
  title: { 
    fontSize: fs(22), 
    fontFamily: fonts.bold,   // ✅ Outfit Bold
    color: colors.textPrimary, 
    marginBottom: hp('1.5%') 
  },
  subtitle: { 
    fontSize: fs(14), 
    fontFamily: fonts.regular, // ✅ Outfit Regular
    color: colors.textSecondary, 
    marginBottom: hp('2%') 
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: wp('5%'),
    width: '100%',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingRight: wp('2%'), // space for eye icon
  },
  eyeIcon: {
    paddingHorizontal: wp('2%'),
  },
  inputContainer: { 
    marginBottom: hp('2%') 
  },
  label: { 
    fontSize: fs(13), 
    fontFamily: fonts.medium, // ✅ Outfit Medium
    color: colors.textSecondary, 
    marginBottom: hp('0.8%') 
  },
  passinput: {
    borderRadius: 8, 
    padding: wp('3%'), 
    fontSize: fs(16),
    fontFamily: fonts.regular, // ✅ Outfit Regular
  },
  input: { 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 8, 
    padding: wp('3%'), 
    fontSize: fs(16),
    fontFamily: fonts.regular, // ✅ Outfit Regular
  },
  inputError: { 
    borderColor: colors.error 
  },
  errorText: { 
    color: colors.error, 
    fontSize: fs(12), 
    fontFamily: fonts.regular, // ✅ Outfit Regular
    marginTop: hp('0.5%') 
  },
  options: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: hp('2.5%') 
  },
  rememberRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  checkbox: {
    width: wp('5%'), 
    height: wp('5%'), 
    borderWidth: 1, 
    borderColor: colors.secondary,
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  checkboxChecked: { 
    backgroundColor: colors.secondary 
  },
  checkmark: { 
    color: colors.white, 
    fontSize: fs(12), 
    fontFamily: fonts.bold  // ✅ Outfit Bold instead of fontWeight
  },
  rememberText: { 
    marginLeft: wp('2%'), 
    color: colors.textSecondary, 
    fontSize: fs(13),
    fontFamily: fonts.regular, // ✅ Outfit Regular
  },
  forgotText: { 
    color: colors.secondary, 
    fontSize: fs(13),
    fontFamily: fonts.medium, // ✅ Outfit Medium
  },
  button: { 
    backgroundColor: colors.secondary, 
    padding: hp('2%'), 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: colors.white, 
    fontSize: fs(16), 
    fontFamily: fonts.bold // ✅ Outfit Bold
  },
  copyright: { 
    fontSize: fs(11), 
    color: colors.textSecondary, 
    fontFamily: fonts.regular, // ✅ Outfit Regular
    marginTop: hp('2%') 
  },
});


export default LoginScreen;
