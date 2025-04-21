import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from '../styles-part/VoiceTrainingStyles';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { Ionicons } from '@expo/vector-icons';

const VoiceTrainingScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    setShowSuccess(false);
    // Start timer
    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    // Simulate recording for 5 seconds
    setTimeout(() => {
      clearInterval(timer);
      setIsRecording(false);
      setRecordingTime(0);
      setShowSuccess(true);
    }, 5000);
  };

  const handleProceed = () => {
    navigation.navigate('SOSSetup');
  };

  const handleSkip = () => {
    navigation.navigate('SOSSetup');
  };

  const formatTime = (seconds) => {
    return `${String(seconds).padStart(2, '0')}s`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
        <Text style={styles.title}>Voice Training Setup</Text>
        <Text style={styles.subtitle}>
          Train your voice to recognize your safety keyword
        </Text>

        <TouchableOpacity
          style={[styles.micButton, isRecording && styles.micButtonRecording]}
          onPress={handleStartRecording}
          disabled={isRecording}
        >
          <Ionicons
            name={isRecording ? "mic" : "mic-outline"}
            size={64}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.recordText}>
          {isRecording ? "Recording in progress..." : "Tap to Record Your SOS Keyword"}
        </Text>

        {isRecording && (
          <View style={styles.recordingContainer}>
            {/* Simulated waveform - in a real app, this would be a proper waveform visualization */}
            <View style={styles.waveform}>
              {[...Array(10)].map((_, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.waveformBar,
                    {
                      height: 20 + Math.random() * 40,
                    }
                  ]}
                />
              ))}
            </View>
            <Text style={styles.timerText}>
              Recording... {formatTime(recordingTime)}
            </Text>
          </View>
        )}

        {showSuccess && (
          <Text style={styles.successText}>Recording saved successfully!</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VoiceTrainingScreen; 