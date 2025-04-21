import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { styles } from '../styles-part/LoginScreenStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [loginMethod, setLoginMethod] = useState('otp');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [pin, setPin] = useState(['', '', '', '']);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      // Logic for auto-focusing next input would go here
    }
  };

  const handlePinChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      // Logic for auto-focusing next input would go here
    }
  };

  const handleSendOTP = () => {
    if (!mobileNumber) {
      alert('Please enter your mobile number');
      return;
    }
    // Add OTP sending logic here
    alert('OTP sent successfully!');
  };

  const handleLogin = () => {
    if (!mobileNumber) {
      alert('Please enter your mobile number');
      return;
    }

    if (loginMethod === 'otp' && otp.join('').length !== 6) {
      alert('Please enter complete OTP');
      return;
    }

    if (loginMethod === 'pin' && pin.join('').length !== 4) {
      alert('Please enter complete PIN');
      return;
    }

    // Add login verification logic here
    // For now, just navigate to Voice Training
    navigation.navigate('VoiceTraining');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#d32f2f" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <SafeMitraLogo color="#d32f2f" size={30} />
            <Text style={styles.logoText}>SafeMitra</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Secure Login</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number and PIN or OTP
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.mobileInput}>
              <TextInput
                style={styles.input}
                placeholder="+91 XXXXX-XXXXX"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
              <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
            </View>
          </View>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, loginMethod === 'otp' && styles.activeToggle]}
              onPress={() => setLoginMethod('otp')}
            >
              <Text style={[styles.toggleText, loginMethod === 'otp' && styles.activeToggleText]}>
                Use OTP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, loginMethod === 'pin' && styles.activeToggle]}
              onPress={() => setLoginMethod('pin')}
            >
              <Text style={[styles.toggleText, loginMethod === 'pin' && styles.activeToggleText]}>
                Use PIN
              </Text>
            </TouchableOpacity>
          </View>

          {loginMethod === 'otp' ? (
            <>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    secureTextEntry
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.sendOtpButton}
                onPress={handleSendOTP}
              >
                <Text style={styles.sendOtpText}>
                  <Ionicons name="send" size={18} color="#FFF" /> Send OTP
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.pinContainer}>
              {pin.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.pinInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(value) => handlePinChange(value, index)}
                  secureTextEntry
                />
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleLogin}
          >
            <Text style={styles.verifyText}>
              Verify & Login
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.securityContainer}>
            <Ionicons name="shield-checkmark" size={16} color="#999" />
            <Text style={styles.securityText}>
              Your login is encrypted and secure
            </Text>
          </View>

          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportText}>Need help? Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen; 