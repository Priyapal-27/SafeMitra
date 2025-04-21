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
} from 'react-native';
import { styles } from '../styles-part/MobileRegistrationStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { Ionicons } from '@expo/vector-icons';

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    if (!agreeToTerms) {
      alert('Please agree to the Privacy Policy and Terms of Use');
      return;
    }
    // Add your registration logic here
    // For now, we'll just show a success message
    alert('Registration successful!');
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
          <Text style={styles.title}>Register with Mobile Number</Text>
          <Text style={styles.subtitle}>Enter basic details to get started</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Riya Sharma"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 XXXXX-XXXXX"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={formData.mobileNumber}
              onChangeText={(text) => handleInputChange('mobileNumber', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Create PIN</Text>
            <View style={styles.pinInput}>
              <TextInput
                style={styles.input}
                placeholder="••••"
                placeholderTextColor="#999"
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
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm PIN</Text>
            <View style={styles.pinInput}>
              <TextInput
                style={styles.input}
                placeholder="••••"
                placeholderTextColor="#999"
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
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <Pressable
              style={styles.checkbox}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <Ionicons
                name={agreeToTerms ? 'checkbox' : 'square-outline'}
                size={20}
                color="#d32f2f"
              />
            </Pressable>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text> &{' '}
              <Text style={styles.termsLink}>Terms of Use</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Ionicons name="lock-closed" size={20} color="#fff" />
            <Text style={styles.registerButtonText}>Register Securely</Text>
          </TouchableOpacity>

          <Text style={styles.encryptedText}>
            <Ionicons name="shield-checkmark" size={16} color="#999" />
            {' Your information is end-to-end encrypted'}
          </Text>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MobileRegistrationScreen; 