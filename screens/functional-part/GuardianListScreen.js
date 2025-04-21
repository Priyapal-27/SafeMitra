import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/GuardianListStyles';

const GuardianListScreen = () => {
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [guardians, setGuardians] = useState([]);
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  const handleAddGuardian = () => {
    if (!newGuardian.name || !newGuardian.phone || !newGuardian.relationship) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setShowOTPModal(true);
  };

  const handleVerifyOTP = () => {
    // Mock OTP verification
    setGuardians([...guardians, { ...newGuardian, status: 'active' }]);
    setNewGuardian({ name: '', phone: '', relationship: '' });
    setShowOTPModal(false);
    setShowAddModal(false);
  };

  const handleDeleteGuardian = (index) => {
    Alert.alert(
      'Delete Guardian',
      'Are you sure you want to remove this guardian?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const newGuardians = [...guardians];
            newGuardians.splice(index, 1);
            setGuardians(newGuardians);
          },
        },
      ]
    );
  };

  const GuardianCard = ({ guardian, index }) => (
    <View style={styles.guardianCard}>
      <View style={styles.guardianInfo}>
        <Text style={styles.guardianName}>{guardian.name}</Text>
        <Text style={styles.guardianRelationship}>{guardian.relationship}</Text>
        <Text style={styles.guardianPhone}>{guardian.phone}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, guardian.status === 'active' ? styles.activeDot : styles.inactiveDot]} />
          <Text style={styles.statusText}>{guardian.status === 'active' ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color="#E50914" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleDeleteGuardian(index)}
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

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Guardians</Text>
        <Text style={styles.subtitle}>Manage your emergency contacts</Text>
      </View>

      {/* Add Guardian Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add Guardian</Text>
      </TouchableOpacity>

      {/* Guardians List */}
      <ScrollView style={styles.guardiansList}>
        {guardians.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people" size={48} color="#CCCCCC" />
            <Text style={styles.emptyStateText}>No Guardians Yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add guardians to be alerted during emergencies
            </Text>
          </View>
        ) : (
          guardians.map((guardian, index) => (
            <GuardianCard key={index} guardian={guardian} index={index} />
          ))
        )}
      </ScrollView>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Ionicons name="shield" size={20} color="#E50914" />
        <Text style={styles.infoText}>
          Your guardians will be alerted immediately when SOS is triggered
        </Text>
      </View>

      {/* Add Guardian Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Guardian</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={newGuardian.name}
              onChangeText={(text) => setNewGuardian({ ...newGuardian, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={newGuardian.phone}
              onChangeText={(text) => setNewGuardian({ ...newGuardian, phone: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Relationship"
              value={newGuardian.relationship}
              onChangeText={(text) => setNewGuardian({ ...newGuardian, relationship: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddGuardian}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* OTP Verification Modal */}
      <Modal
        visible={showOTPModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOTPModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verify Guardian</Text>
            <Text style={styles.modalSubtitle}>
              We've sent an OTP to {newGuardian.phone}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              maxLength={6}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowOTPModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleVerifyOTP}
              >
                <Text style={styles.addButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GuardianListScreen; 