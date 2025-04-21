import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/SafeRouteSetupStyles';

const SafeRouteSetupScreen = () => {
  const navigation = useNavigation();
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [routePreferences, setRoutePreferences] = useState({
    deviationDetection: true,
    timeAlert: false,
    notifyGuardians: true,
  });
  const [safeWords, setSafeWords] = useState([]);
  const [newSafeWord, setNewSafeWord] = useState('');

  const handleAddSafeWord = () => {
    if (newSafeWord.trim()) {
      setSafeWords([...safeWords, newSafeWord.trim()]);
      setNewSafeWord('');
    }
  };

  const handleRemoveSafeWord = (index) => {
    const newSafeWords = [...safeWords];
    newSafeWords.splice(index, 1);
    setSafeWords(newSafeWords);
  };

  const handleStartJourney = () => {
    if (!startLocation || !destination) {
      Alert.alert('Error', 'Please set both start and destination locations');
      return;
    }
    // Navigate to active route screen or start tracking
    Alert.alert('Success', 'Safe Route tracking started');
  };

  const handleUseCurrentLocation = () => {
    // In a real app, this would get the current location
    setStartLocation('Current Location');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#E50914" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <SafeMitraLogo color="#E50914" size={30} />
          <Text style={styles.logoText}>SafeMitra</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Configure Safe Route</Text>
          <Text style={styles.subtitle}>
            Track and secure your journey in real-time
          </Text>
        </View>

        {/* Route Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <Ionicons name="location" size={20} color="#E50914" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Start Location"
              value={startLocation}
              onChangeText={setStartLocation}
            />
            <TouchableOpacity 
              style={styles.currentLocationButton}
              onPress={handleUseCurrentLocation}
            >
              <Ionicons name="locate" size={20} color="#E50914" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="location" size={20} color="#E50914" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Destination"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          <TouchableOpacity style={styles.setRouteButton}>
            <Text style={styles.setRouteButtonText}>Set Route</Text>
          </TouchableOpacity>
        </View>

        {/* Map Preview */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={48} color="#E50914" />
            <Text style={styles.mapPlaceholderText}>Map Preview</Text>
          </View>
        </View>

        {/* Travel Monitoring Preferences */}
        <View style={styles.preferencesCard}>
          <Text style={styles.cardTitle}>Route Alerts</Text>
          
          <View style={styles.toggleItem}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.toggleLabel}>Deviation Detection</Text>
              <Text style={styles.toggleDescription}>
                Alert when you go off-route
              </Text>
            </View>
            <Switch
              value={routePreferences.deviationDetection}
              onValueChange={(value) => 
                setRoutePreferences({ ...routePreferences, deviationDetection: value })
              }
              trackColor={{ false: '#E0E0E0', true: '#E50914' }}
              thumbColor={routePreferences.deviationDetection ? '#FFFFFF' : '#F5F5F5'}
            />
          </View>

          <View style={styles.toggleItem}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.toggleLabel}>Time Alert</Text>
              <Text style={styles.toggleDescription}>
                Alert on unexpected delays
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.timePickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timePickerText}>
                {routePreferences.timeAlert ? '30 min' : 'Set Time'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666666" />
            </TouchableOpacity>
          </View>

          <View style={styles.toggleItem}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.toggleLabel}>Notify Guardians</Text>
              <Text style={styles.toggleDescription}>
                Auto-send updates to guardians
              </Text>
            </View>
            <Switch
              value={routePreferences.notifyGuardians}
              onValueChange={(value) => 
                setRoutePreferences({ ...routePreferences, notifyGuardians: value })
              }
              trackColor={{ false: '#E0E0E0', true: '#E50914' }}
              thumbColor={routePreferences.notifyGuardians ? '#FFFFFF' : '#F5F5F5'}
            />
          </View>
        </View>

        {/* Safe Words Section */}
        <View style={styles.safeWordsCard}>
          <Text style={styles.cardTitle}>Safe Words During Route</Text>
          <View style={styles.safeWordsInputContainer}>
            <TextInput
              style={styles.safeWordInput}
              placeholder="Add a safe word (e.g., 'Something's wrong')"
              value={newSafeWord}
              onChangeText={setNewSafeWord}
            />
            <TouchableOpacity 
              style={styles.addSafeWordButton}
              onPress={handleAddSafeWord}
            >
              <Ionicons name="add" size={24} color="#E50914" />
            </TouchableOpacity>
          </View>

          <View style={styles.safeWordsList}>
            {safeWords.map((word, index) => (
              <View key={index} style={styles.safeWordItem}>
                <Text style={styles.safeWordText}>{word}</Text>
                <TouchableOpacity 
                  style={styles.removeSafeWordButton}
                  onPress={() => handleRemoveSafeWord(index)}
                >
                  <Ionicons name="close" size={20} color="#E50914" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="shield" size={20} color="#E50914" />
          <Text style={styles.infoText}>
            Route data is protected and shared only with your selected guardians
          </Text>
        </View>
      </ScrollView>

      {/* Start Journey Button */}
      <TouchableOpacity 
        style={styles.startJourneyButton}
        onPress={handleStartJourney}
      >
        <Text style={styles.startJourneyButtonText}>Start Journey</Text>
      </TouchableOpacity>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Expected Travel Time</Text>
            {/* Time picker implementation would go here */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowTimePicker(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={() => {
                  setRoutePreferences({ ...routePreferences, timeAlert: true });
                  setShowTimePicker(false);
                }}
              >
                <Text style={styles.confirmButtonText}>Set Time</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SafeRouteSetupScreen; 