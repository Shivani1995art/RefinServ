// src/contexts/ToasterProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, Animated, Dimensions } from 'react-native';
import colors from './colors';
import { wp } from './responsive';


const { width, height } = Dimensions.get('window');
export const isTablet = Math.min(width, height) >= 600;

const ToasterContext = createContext();

let toastFunction: (message: string) => void = null;

export const setToastFunction = () => toastFunction;

export function ToasterProvider({ children }) {
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const fadeAnim = new Animated.Value(0);

  const showToast = (message: string) => {
    setToast({ message });
  };

  useEffect(() => {
    toastFunction = showToast;
    return () => {
      toastFunction = null;
    };
  }, []);

  useEffect(() => {
    if (toast) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setToast(null));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, fadeAnim]);

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <Text style={styles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToasterContext.Provider>
  );
}

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) throw new Error('useToaster must be used within a ToasterProvider');
  return context;
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.success, 
    alignItems: 'center',
    zIndex: 10000,
  },
  toastText: {
    fontSize:  wp(4),
    color: '#fff',
    textAlign: 'center',
  },
});
