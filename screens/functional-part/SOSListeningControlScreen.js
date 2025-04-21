import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/SOSListeningControlStyles';
import Slider from '@react-native-community/slider';

const SOSListeningControlScreen = () => {
  const navigation = useNavigation();
  const [isListeningActive, setIsListeningActive] = useState(true);
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [newTriggerWord, setNewTriggerWord] = useState('');
  const [sensitivity, setSensitivity] = useState(5);
  const [triggerWords, setTriggerWords] = useState([
    { id: 1, word: 'Help me' },
    { id: 2, word: 'Bachao' },
    { id: 3, word: 'Chhodo' },
  ]);

  const handleAddTriggerWord = () => {
    if (newTriggerWord.trim()) {
      setTriggerWords([
        ...triggerWords,
        { id: Date.now(), word: newTriggerWord.trim() },
      ]);
      setNewTriggerWord('');
      setShowAddWordModal(false);
    }
  };

  const handleDeleteTriggerWord = (id) => {
    Alert.alert(
      'Delete Trigger Word',
      'Are you sure you want to delete this trigger word?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTriggerWords(triggerWords.filter(word => word.id !== id));
          },
        },
      ]
    );
  };

  const handleEditTriggerWord = (id, newWord) => {
    setTriggerWords(triggerWords.map(word => 
      word.id === id ? { ...word, word: newWord } : word
    ));
  };

  const TriggerWordItem = ({ word }) => (
    <View style={styles.triggerWordItem}>
      <Text style={styles.triggerWordText}>{word.word}</Text>
      <View style={styles.triggerWordActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="volume-high" size={20} color="#E50914" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color="#E50914" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleDeleteTriggerWord(word.id)}
        >
          <Ionicons name="trash" size={20} color="#E50914" />
        </TouchableOpacity>
      </View>
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
          <Text style={styles.title}>SOS Listening Control</Text>
          <Text style={styles.subtitle}>
            Manage audio detection settings and background monitoring.
          </Text>
        </View>

        {/* Microphone Section */}
        <View style={styles.microphoneSection}>
          <View style={styles.microphoneIconContainer}>
            <Ionicons name="mic" size={64} color="#E50914" />
            <View style={styles.soundwaveAnimation} />
          </View>
          <View style={styles.statusBadge}>
            <Ionicons 
              name={isListeningActive ? "checkmark-circle" : "close-circle"} 
              size={20} 
              color={isListeningActive ? "#4CAF50" : "#E50914"} 
            />
            <Text style={styles.statusText}>
              {isListeningActive ? "Listening Active" : "Listening Paused"}
            </Text>
          </View>
        </View>

        {/* Background Listening Toggle */}
        <View style={styles.toggleSection}>
          <Text style={styles.toggleLabel}>Enable Background Listening</Text>
          <Switch
            value={isListeningActive}
            onValueChange={setIsListeningActive}
            trackColor={{ false: '#E0E0E0', true: '#E50914' }}
            thumbColor={isListeningActive ? '#FFFFFF' : '#F5F5F5'}
          />
        </View>

        {/* Trigger Word Configuration */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={24} color="#E50914" />
            <Text style={styles.sectionTitle}>Trigger Word Configuration</Text>
          </View>
          <View style={styles.triggerWordsList}>
            {triggerWords.map(word => (
              <TriggerWordItem key={word.id} word={word} />
            ))}
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddWordModal(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add New Trigger Word</Text>
          </TouchableOpacity>
        </View>

        {/* Microphone Sensitivity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="mic" size={24} color="#E50914" />
            <Text style={styles.sectionTitle}>Microphone Sensitivity Settings</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            value={sensitivity}
            onValueChange={setSensitivity}
            minimumTrackTintColor="#E50914"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#E50914"
          />
          <View style={styles.sensitivityLabels}>
            <Text style={styles.sensitivityLabel}>Low</Text>
            <Text style={styles.sensitivityLabel}>Balanced</Text>
            <Text style={styles.sensitivityLabel}>High</Text>
          </View>
          <Text style={styles.sensitivityNote}>
            Higher sensitivity increases detection accuracy but may impact battery life.
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color="#E50914" />
          <Text style={styles.infoText}>
            SOS Listening works in the background even when the app is minimized.
          </Text>
        </View>
      </ScrollView>

      {/* Add Trigger Word Modal */}
      <Modal
        visible={showAddWordModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddWordModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Trigger Word</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter trigger word"
              value={newTriggerWord}
              onChangeText={setNewTriggerWord}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowAddWordModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddTriggerWord}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SOSListeningControlScreen; 