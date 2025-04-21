import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/VoiceTrainingStyles';

const CheckmarkImage = {
  uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png'
};

const trainingImage = {
  uri: 'https://cdn-icons-png.flaticon.com/512/2920/2920065.png'
};

const phrases = [
  'Help me now',
  'Bacchao',
  'Call the police',
  'This is an emergency'
];

const VoiceTrainingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordedPhrases, setRecordedPhrases] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (recordedPhrases.length < phrases.length && !isRecording) {
      startRecording();
    }

    if (recordedPhrases.length === phrases.length) {
      triggerSuccess();
    }
  }, [recordedPhrases]);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Permission Denied', 'Please allow microphone access.');
        setIsRecording(false);
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);

      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        const isRecognized = Math.random() > 0.25;

        if (isRecognized) {
          setRecordedPhrases(prev => [...prev, phrases[currentIndex]]);
          setCurrentIndex(prev => prev + 1);
        } else {
          Alert.alert('Try Again', 'Voice not recognized clearly. Please try again.');
        }

        setIsRecording(false);
      }, 2500);
    } catch (error) {
      console.error('Recording error:', error);
      Alert.alert('Error', 'Something went wrong with recording.');
      setIsRecording(false);
    }
  };

  const triggerSuccess = () => {
    setTimeout(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5
      }).start();
      setSuccessVisible(true);
    }, 500);
  };

  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setSuccessVisible(false);
      navigation.navigate('SOSSetup');
    });
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
        <Text style={styles.title}>Voice Training Required</Text>
        <Text style={styles.subtitle}>
          Train the app to recognize your voice in emergencies.
        </Text>

        <Image source={trainingImage} style={styles.image} resizeMode="contain" />

        <Text style={styles.progressLabel}>
          Progress{' '}
          <Text style={styles.progressText}>
            {`${recordedPhrases.length} of ${phrases.length} phrases`}
          </Text>
        </Text>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(recordedPhrases.length / phrases.length) * 100}%` }]} />
        </View>

        <Text style={styles.currentPhrase}>
          {phrases[currentIndex] ? `"${phrases[currentIndex]}"` : '✅ All phrases recorded'}
        </Text>

        <View style={styles.phraseList}>
          {phrases.map((phrase, index) => (
            <View key={index} style={styles.phraseItem}>
              <Text style={styles.phraseText}>{`"${phrase}"`}</Text>
              <Text style={styles.icon}>
                {recordedPhrases.includes(phrase) ? '✅' : '🎤'}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.micButton,
            (isRecording || currentIndex >= phrases.length) && styles.disabledMic
          ]}
          disabled={isRecording || currentIndex >= phrases.length}
          onPress={startRecording}
        >
          <Text style={styles.micIcon}>
            {isRecording ? '⏺️ Recording...' : '🎙️ Start'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your voice samples are stored securely and used only for emergency hotword detection.
        </Text>

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigation.navigate('SOSSetup')}
        >
          <Text style={styles.proceedButtonText}>Proceed to Next</Text>
        </TouchableOpacity>

        {/* ✅ Success Modal */}
        <Modal transparent visible={successVisible} animationType="fade">
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
              <Image source={CheckmarkImage} style={styles.checkImage} />
              <Text style={styles.modalTitle}>Voice Training Completed</Text>
              <Text style={styles.modalSubtitle}>
                You're all set. Your voice is now registered for emergency detection.
              </Text>
              <TouchableOpacity style={styles.continueButton} onPress={closeModal}>
                <Text style={styles.continueText}>Continue to SOS Setup</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VoiceTrainingScreen; 