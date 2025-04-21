import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/TriggerEventsFeedStyles';

const TriggerEventsFeedScreen = () => {
  const navigation = useNavigation();
  const [showClearHistoryModal, setShowClearHistoryModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Trigger Word', 'Audio', 'Location', 'Route'];

  // Mock data for events
  const events = [
    {
      id: 1,
      type: 'trigger',
      icon: 'mic',
      text: 'Trigger word detected: "Help me"',
      timestamp: 'Today • 02:14 PM',
      status: null,
    },
    {
      id: 2,
      type: 'audio',
      icon: 'mic',
      text: 'Audio log recorded after trigger word',
      timestamp: 'Today • 02:14 PM',
      status: 'Uploaded to secure logs ✅',
    },
    {
      id: 3,
      type: 'location',
      icon: 'location',
      text: 'Live location shared with guardians',
      timestamp: 'Today • 02:14 PM',
      status: 'Accuracy: High',
    },
    {
      id: 4,
      type: 'route',
      icon: 'warning',
      text: 'Deviation detected from Safe Route',
      timestamp: 'Today • 02:14 PM',
      status: 'Alert sent to guardians',
    },
  ];

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all event history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            // Clear history logic here
            setShowClearHistoryModal(false);
          },
        },
      ]
    );
  };

  const EventCard = ({ event }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventIconContainer}>
        <Ionicons name={event.icon} size={24} color="#E50914" />
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventText}>{event.text}</Text>
        {event.status && (
          <Text style={styles.eventStatus}>{event.status}</Text>
        )}
      </View>
      <Text style={styles.eventTimestamp}>{event.timestamp}</Text>
    </View>
  );

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
          <Text style={styles.title}>Live Trigger Events</Text>
          <Text style={styles.subtitle}>
            Track all SOS word detections, audio logs, and real-time alerts.
          </Text>
        </View>

        {/* Filter Dropdown */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by Type:</Text>
          <View style={styles.filterDropdown}>
            <Text style={styles.filterText}>{selectedFilter}</Text>
            <Ionicons name="chevron-down" size={20} color="#E50914" />
          </View>
        </View>

        {/* Events List */}
        <View style={styles.eventsList}>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color="#E50914" />
          <Text style={styles.infoText}>
            Note: All events are securely stored and can be reviewed in Blockchain Logs.
          </Text>
        </View>
      </ScrollView>

      {/* Clear History Button */}
      <TouchableOpacity 
        style={styles.clearHistoryButton}
        onPress={() => setShowClearHistoryModal(true)}
      >
        <Ionicons name="trash" size={24} color="#E50914" />
      </TouchableOpacity>

      {/* Clear History Modal */}
      <Modal
        visible={showClearHistoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowClearHistoryModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clear History</Text>
            <Text style={styles.modalText}>
              Are you sure you want to clear all event history? This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowClearHistoryModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={handleClearHistory}
              >
                <Text style={styles.clearButtonText}>Clear History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TriggerEventsFeedScreen; 