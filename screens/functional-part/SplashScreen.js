import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles-part/SplashScreenStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';

const SplashScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('MobileRegistration');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SafeMitraLogo color="#FFFFFF" size={150} />
        <Text style={styles.title}>Safety First</Text>
        <Text style={styles.subtitle}>Your Safety, Our Priority</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGetStarted}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen; 