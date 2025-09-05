import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';


export default function SplashScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      <Image
      
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.versionTextStyle}>Version 1.0   Build Number - 1
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  versionTextStyle: {
    fontSize: 14,
    textAlign: "center",
    padding: 10,
    fontFamily: "Lato-Bold",
    position: "absolute",
    bottom: 20,
    color: "black"
  }
});