import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/LiveLocationPreviewStyles';

const LiveLocationPreviewScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 28.6139,
    longitude: 77.2090,
  });
  const [isLocationSharing, setIsLocationSharing] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  // Mock address data - in a real app, this would come from reverse geocoding
  const address = "123 Main Street, New Delhi, India";

  const handleRecenter = () => {
    // In a real app, this would recenter the map to the user's current location
    console.log('Recentering map...');
  };

  const handleSendLocation = () => {
    // In a real app, this would send the current location to guardians
    console.log('Sending location to guardians...');
  };

  const handleSaveSnapshot = () => {
    // In a real app, this would save the location snapshot to the blockchain
    console.log('Saving location snapshot to blockchain...');
  };

  const handleStartSafeRoute = () => {
    // In a real app, this would start a safe route from the current location
    console.log('Starting safe route from current location...');
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

      {/* Map Section */}
      <View style={[styles.mapContainer, { backgroundColor: '#f5f5f5' }]}>
        {/* Placeholder for map */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="map" size={48} color="#E50914" />
          <Text style={{ color: '#666666', marginTop: 12 }}>Map loading...</Text>
        </View>

        {/* Location Label */}
        <View style={styles.locationLabel}>
          <Ionicons name="location" size={20} color="#E50914" />
          <Text style={styles.locationText}>You are here – Live Location Active</Text>
        </View>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControlButton}>
            <Ionicons name="add" size={24} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlButton}>
            <Ionicons name="remove" size={24} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.mapControlButton}
            onPress={handleRecenter}
          >
            <Ionicons name="locate" size={24} color="#E50914" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location Details Box */}
      <View style={styles.detailsBox}>
        <View style={styles.coordinatesRow}>
          <Text style={styles.coordinateLabel}>Latitude:</Text>
          <Text style={styles.coordinateValue}>{location.latitude.toFixed(6)}</Text>
        </View>
        <View style={styles.coordinatesRow}>
          <Text style={styles.coordinateLabel}>Longitude:</Text>
          <Text style={styles.coordinateValue}>{location.longitude.toFixed(6)}</Text>
        </View>
        <Text style={styles.addressText}>{address}</Text>
        <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
        <TouchableOpacity 
          style={styles.statusTag}
          onPress={() => setIsLocationSharing(!isLocationSharing)}
        >
          <Ionicons 
            name={isLocationSharing ? "radio-button-on" : "radio-button-off"} 
            size={16} 
            color="#E50914" 
          />
          <Text style={styles.statusText}>
            Location sharing {isLocationSharing ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Panel */}
      <View style={styles.actionPanel}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]}
          onPress={handleSendLocation}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
          <Text style={[styles.buttonText, styles.primaryButtonText]}>
            Send to Guardian
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={handleSaveSnapshot}
        >
          <Ionicons name="save" size={20} color="#E50914" />
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Save Snapshot
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer Message */}
      <View style={styles.footer}>
        <View style={styles.footerMessage}>
          <Ionicons name="shield-checkmark" size={20} color="#E50914" />
          <Text style={styles.footerText}>
            Your location is encrypted and securely shared with trusted contacts only.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LiveLocationPreviewScreen; 