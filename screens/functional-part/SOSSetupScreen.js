import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { styles } from '../styles-part/SOSSetupStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SOSSetupScreen = () => {
  const navigation = useNavigation();
  const [triggers, setTriggers] = useState({
    powerButton: true,
    shakeDevice: true,
    secretCode: true,
  });

  const toggleTrigger = (trigger) => {
    setTriggers(prev => ({
      ...prev,
      [trigger]: !prev[trigger]
    }));
  };

  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  const TriggerOption = ({ icon, title, description, value, onToggle }) => (
    <View style={styles.triggerCard}>
      <View style={styles.triggerHeader}>
        <View style={styles.triggerIcon}>
          <Ionicons name={icon} size={24} color="#d32f2f" />
        </View>
        <View style={styles.triggerInfo}>
          <Text style={styles.triggerTitle}>{title}</Text>
          <Text style={styles.triggerDescription}>{description}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#e0e0e0', true: '#ff8a80' }}
          thumbColor={value ? '#d32f2f' : '#f5f5f5'}
          ios_backgroundColor="#e0e0e0"
        />
      </View>
    </View>
  );

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

        <View style={styles.content}>
          <Text style={styles.title}>SOS Activation Settings</Text>
          <Text style={styles.subtitle}>
            Choose how you want to trigger SOS alerts instantly
          </Text>

          <View style={styles.triggerContainer}>
            <TriggerOption
              icon="power"
              title="Long Press Power Button"
              description="Press power button 3 times to activate SOS"
              value={triggers.powerButton}
              onToggle={() => toggleTrigger('powerButton')}
            />

            <TriggerOption
              icon="phone-portrait"
              title="Shake Device"
              description="Shake your phone firmly to trigger SOS"
              value={triggers.shakeDevice}
              onToggle={() => toggleTrigger('shakeDevice')}
            />

            <TriggerOption
              icon="keypad"
              title="Dial Secret Code"
              description="Dial a secret number like 999# to activate SOS"
              value={triggers.secretCode}
              onToggle={() => toggleTrigger('secretCode')}
            />
          </View>

          <Text style={styles.note}>
            <Ionicons name="information-circle" size={14} color="#666666" />
            {' You can modify these triggers later from settings'}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Enable SOS & Continue</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Ionicons name="information-circle-outline" size={16} color="#666666" />
              <Text style={styles.skipButtonText}> Skip Setup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SOSSetupScreen; 