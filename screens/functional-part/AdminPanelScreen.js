import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import styles from '../styles-part/AdminPanelStyles';
import { useNavigation } from '@react-navigation/native';

const AdminPanelScreen = () => {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showDropdown, setShowDropdown] = useState(false);
  const [sensitivity, setSensitivity] = useState('70');
  const [retryDuration, setRetryDuration] = useState('5');

  // Mock data
  const stats = {
    totalTriggers: 12,
    activeUsers: 156,
    resolvedAlerts: 8,
    pendingAlerts: 4,
  };

  const sosLogs = [
    {
      id: 1,
      datetime: '2024-03-20 14:30',
      userName: 'John Doe',
      location: 'New Delhi',
      status: 'Resolved',
    },
    {
      id: 2,
      datetime: '2024-03-20 15:45',
      userName: 'Jane Smith',
      location: 'Mumbai',
      status: 'Pending',
    },
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      mobile: '+91 98765 43210',
      guardians: 3,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobile: '+91 98765 43211',
      guardians: 2,
      status: 'Active',
    },
  ];

  const triggerHistory = [
    {
      id: 1,
      phrase: 'Help me',
      time: '14:30',
      device: 'iPhone 12',
      location: 'New Delhi',
      status: 'Resolved',
    },
    {
      id: 2,
      phrase: 'Bachao',
      time: '15:45',
      device: 'Samsung S21',
      location: 'Mumbai',
      status: 'Pending',
    },
  ];

  const renderDashboard = () => (
    <ScrollView style={styles.content}>
      <View style={styles.dashboardGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statCardTitle}>Total SOS Triggers Today</Text>
          <Text style={styles.statCardValue}>{stats.totalTriggers}</Text>
          <Text style={styles.statCardSubtext}>Last 24 hours</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statCardTitle}>Active Users</Text>
          <Text style={styles.statCardValue}>{stats.activeUsers}</Text>
          <Text style={styles.statCardSubtext}>Currently online</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statCardTitle}>Resolved Alerts</Text>
          <Text style={styles.statCardValue}>{stats.resolvedAlerts}</Text>
          <Text style={styles.statCardSubtext}>Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statCardTitle}>Pending Alerts</Text>
          <Text style={styles.statCardValue}>{stats.pendingAlerts}</Text>
          <Text style={styles.statCardSubtext}>Require attention</Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <Ionicons name="map" size={48} color="#E50914" />
        <Text style={{ color: '#666666', marginTop: 12 }}>Latest SOS Locations</Text>
      </View>
    </ScrollView>
  );

  const renderSOSLogs = () => (
    <ScrollView style={styles.content}>
      {sosLogs.map((log) => (
        <View key={log.id} style={styles.logCard}>
          <View style={styles.logHeader}>
            <Text style={styles.logTitle}>{log.userName}</Text>
            <View style={[
              styles.statusBadge,
              log.status === 'Resolved' ? styles.statusResolved : styles.statusPending
            ]}>
              <Text style={[
                styles.statusBadgeText,
                log.status === 'Resolved' ? styles.statusResolvedText : styles.statusPendingText
              ]}>
                {log.status}
              </Text>
            </View>
          </View>
          <Text style={styles.logDateTime}>{log.datetime}</Text>
          <Text style={styles.logLocation}>{log.location}</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderUsers = () => (
    <ScrollView style={styles.content}>
      {users.map((user) => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userMobile}>{user.mobile}</Text>
            <View style={styles.userStats}>
              <Text style={styles.userStat}>Guardians: {user.guardians}</Text>
              <Text style={styles.userStatus}>{user.status}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Deactivate</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderTriggerHistory = () => (
    <ScrollView style={styles.content}>
      {triggerHistory.map((trigger) => (
        <View key={trigger.id} style={styles.triggerCard}>
          <View style={styles.triggerHeader}>
            <Text style={styles.triggerPhrase}>{trigger.phrase}</Text>
            <View style={[
              styles.statusBadge,
              trigger.status === 'Resolved' ? styles.statusResolved : styles.statusPending
            ]}>
              <Text style={[
                styles.statusBadgeText,
                trigger.status === 'Resolved' ? styles.statusResolvedText : styles.statusPendingText
              ]}>
                {trigger.status}
              </Text>
            </View>
          </View>
          <Text style={styles.triggerTime}>{trigger.time}</Text>
          <Text style={styles.triggerDevice}>{trigger.device}</Text>
          <Text style={styles.triggerLocation}>{trigger.location}</Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderSettings = () => (
    <ScrollView style={styles.content}>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>SOS Keywords</Text>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsLabel}>Add New Keyword</Text>
          <TextInput
            style={styles.settingsInput}
            placeholder="Enter keyword"
          />
        </View>
      </View>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Microphone Settings</Text>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsLabel}>Sensitivity</Text>
          <TextInput
            style={styles.settingsInput}
            value={sensitivity}
            onChangeText={setSensitivity}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Alert Settings</Text>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsLabel}>Retry Duration (minutes)</Text>
          <TextInput
            style={styles.settingsInput}
            value={retryDuration}
            onChangeText={setRetryDuration}
            keyboardType="numeric"
          />
        </View>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'sosLogs':
        return renderSOSLogs();
      case 'users':
        return renderUsers();
      case 'triggerHistory':
        return renderTriggerHistory();
      case 'settings':
        return renderSettings();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Ionicons name="arrow-back" size={24} color="#E50914" />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <SafeMitraLogo color="#E50914" size={30} />
            <Text style={styles.logoText}>SafeMitra Admin</Text>
          </View>
          
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Ionicons name="person-circle" size={32} color="#E50914" />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {showDropdown && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Ionicons name="person" size={20} color="#333333" />
              <Text style={styles.dropdownText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Ionicons name="log-out" size={20} color="#333333" />
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Main Content */}
        {renderContent()}

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[styles.navItem, activeSection === 'dashboard' && styles.navItemActive]}
            onPress={() => setActiveSection('dashboard')}
          >
            <Ionicons
              name="home"
              size={24}
              color={activeSection === 'dashboard' ? '#E50914' : '#666666'}
            />
            <Text style={[styles.navText, activeSection === 'dashboard' && styles.navTextActive]}>
              Dashboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navItem, activeSection === 'sosLogs' && styles.navItemActive]}
            onPress={() => setActiveSection('sosLogs')}
          >
            <Ionicons
              name="alert-circle"
              size={24}
              color={activeSection === 'sosLogs' ? '#E50914' : '#666666'}
            />
            <Text style={[styles.navText, activeSection === 'sosLogs' && styles.navTextActive]}>
              SOS Logs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navItem, activeSection === 'users' && styles.navItemActive]}
            onPress={() => setActiveSection('users')}
          >
            <Ionicons
              name="people"
              size={24}
              color={activeSection === 'users' ? '#E50914' : '#666666'}
            />
            <Text style={[styles.navText, activeSection === 'users' && styles.navTextActive]}>
              Users
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navItem, activeSection === 'triggerHistory' && styles.navItemActive]}
            onPress={() => setActiveSection('triggerHistory')}
          >
            <Ionicons
              name="time"
              size={24}
              color={activeSection === 'triggerHistory' ? '#E50914' : '#666666'}
            />
            <Text style={[styles.navText, activeSection === 'triggerHistory' && styles.navTextActive]}>
              History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navItem, activeSection === 'settings' && styles.navItemActive]}
            onPress={() => setActiveSection('settings')}
          >
            <Ionicons
              name="settings"
              size={24}
              color={activeSection === 'settings' ? '#E50914' : '#666666'}
            />
            <Text style={[styles.navText, activeSection === 'settings' && styles.navTextActive]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminPanelScreen; 