import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { styles } from '../styles-part/MobileRegistrationStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebaseConfig';

const MobileRegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    pin: '',
    confirmPin: '',
  });
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      // Logic for auto-focusing next input would go here
    }
  };

  const handleSendOtp = () => {
    if (formData.mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    setIsOtpSent(true);
    // Here you would typically make an API call to send OTP
    Alert.alert('Success', 'OTP sent successfully!');
  };

  const handleVerifyOtp = () => {
    // Here you would typically verify the OTP with your backend
    // For now, we'll just simulate successful verification
    setIsOtpVerified(true);
    Alert.alert('Success', 'OTP verified successfully!');
  };

  const handleRegister = () => {
    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Privacy Policy and Terms of Use');
      return;
    }
    if (formData.pin !== formData.confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }
    if (formData.pin.length !== 4) {
      Alert.alert('Error', 'PIN must be 4 digits');
      return;
    }
    if (formData.mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    if (formData.name.trim() === '') {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!isOtpVerified) {
      Alert.alert('Error', 'Please verify your mobile number first');
      return;
    }

    // Here you would typically make an API call to register the user
    Alert.alert('Success', 'Registration successful!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Enter your details to get started</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.mobileInputContainer}>
              <TextInput
                style={[styles.input, styles.mobileInput]}
                placeholder="Enter your mobile number"
                keyboardType="numeric"
                maxLength={10}
                value={formData.mobileNumber}
                onChangeText={(text) => handleInputChange('mobileNumber', text)}
              />
              {isOtpVerified && (
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={styles.verifiedIcon} />
              )}
            </View>
          </View>

          {!isOtpSent ? (
            <TouchableOpacity
              style={styles.sendOtpButton}
              onPress={handleSendOtp}
            >
              <Text style={styles.sendOtpButtonText}>Send OTP</Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.otpContainer}>
                <Text style={styles.label}>Enter OTP</Text>
                <View style={styles.otpInputContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpInput}
                      maxLength={1}
                      keyboardType="number-pad"
                      value={digit}
                      onChangeText={(value) => handleOtpChange(value, index)}
                    />
                  ))}
                </View>
              </View>

              {!isOtpVerified && (
                <TouchableOpacity
                  style={styles.sendOtpButton}
                  onPress={handleVerifyOtp}
                >
                  <Text style={styles.sendOtpButtonText}>Verify OTP</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {isOtpVerified && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Create PIN</Text>
                <View style={styles.pinInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter 4-digit PIN"
                    secureTextEntry={!showPin}
                    keyboardType="numeric"
                    maxLength={4}
                    value={formData.pin}
                    onChangeText={(text) => handleInputChange('pin', text)}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPin(!showPin)}
                  >
                    <Ionicons
                      name={showPin ? 'eye-off' : 'eye'}
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm PIN</Text>
                <View style={styles.pinInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your PIN"
                    secureTextEntry={!showConfirmPin}
                    keyboardType="numeric"
                    maxLength={4}
                    value={formData.confirmPin}
                    onChangeText={(text) => handleInputChange('confirmPin', text)}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPin(!showConfirmPin)}
                  >
                    <Ionicons
                      name={showConfirmPin ? 'eye-off' : 'eye'}
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                >
                  <Ionicons
                    name={agreeToTerms ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={agreeToTerms ? '#d32f2f' : '#666'}
                  />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text> and{' '}
                  <Text style={styles.termsLink}>Terms of Use</Text>
                </Text>
              </View>

              <Text style={styles.encryptedText}>
                Your data is encrypted and secure
              </Text>

              <TouchableOpacity
                style={[styles.registerButton, !agreeToTerms && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={!agreeToTerms}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MobileRegistrationScreen;
