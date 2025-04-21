import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { styles } from '../styles-part/DashboardStyles';
import { Ionicons } from '@expo/vector-icons';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileOptions = [
    { id: 1, title: "My Profile", icon: "person" },
    { id: 2, title: "Logout", icon: "log-out" },
    { id: 3, title: "About SafeMitra", icon: "information-circle" },
  ];

  const settingsOptions = [
    { id: 1, title: "Emergency Contacts", icon: "people" },
    { id: 2, title: "Trigger Words", icon: "text" },
    { id: 3, title: "Microphone Sensitivity", icon: "mic" },
    { id: 4, title: "Notification Preferences", icon: "notifications" },
  ];

  const featureCards = [
    { 
      id: 1, 
      title: "SOS",
      icon: "alert-triangle",
      onPress: () => navigation.navigate('SOS'),
    },
    { 
      id: 2, 
      title: "Guardian",
      icon: "shield",
      onPress: () => navigation.navigate('GuardianList'),
    },
    { 
      id: 3, 
      title: "Safe Route",
      icon: "git-network",
      onPress: () => navigation.navigate('SafeRouteSetup'),
    },
    { 
      id: 4, 
      title: "Events",
      icon: "list",
      onPress: () => navigation.navigate('TriggerEventsFeed'),
    },
    { 
      id: 5, 
      title: "Listening",
      icon: "mic",
      onPress: () => navigation.navigate('SOSListeningControl'),
    },
    { 
      id: 6, 
      title: "Alerts",
      icon: "notifications",
      onPress: () => navigation.navigate('GuardianNotifications'),
    },
    { 
      id: 7, 
      title: "Evidence",
      icon: "shield-checkmark",
      onPress: () => navigation.navigate('BlockchainLogs'),
    },
    { 
      id: 8, 
      title: "Location",
      icon: "location",
      onPress: () => navigation.navigate('LiveLocationPreview'),
    },
    { 
      id: 9, 
      title: "Admin",
      icon: "key",
      onPress: () => navigation.navigate('AdminPanel'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Content */}
        <ScrollView style={styles.content}>
          {/* Status Banner */}
          <View style={styles.statusBanner}>
            <Text style={styles.statusText}>You are Safe</Text>
            <Text style={styles.statusSubtext}>Last updated 2 minutes ago</Text>
          </View>

          {/* SafeMitra Shield Section */}
          <View style={styles.shieldSection}>
            <Ionicons name="shield" size={48} color="#E50914" style={styles.shieldIcon} />
            <Text style={styles.shieldText}>SafeMitra is watching over you</Text>
          </View>

          {/* Feature Cards Grid */}
          <View style={styles.gridContainer}>
            {featureCards.map(card => (
              <TouchableOpacity
                key={card.id}
                style={styles.gridCard}
                onPress={card.onPress}
              >
                <Ionicons name={card.icon} size={28} color="#FFFFFF" style={styles.gridIcon} />
                <Text style={styles.gridText}>{card.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Settings Modal */}
        <Modal
          visible={showSettings}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowSettings(false)}
        >
          <View style={styles.settingsMenu}>
            <View style={styles.settingsHeader}>
              <Text style={styles.settingsTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            {settingsOptions.map(option => (
              <TouchableOpacity 
                key={option.id} 
                style={styles.settingsMenuItem}
                onPress={() => setShowSettings(false)}
              >
                <Ionicons name={option.icon} size={24} color="#E50914" style={styles.settingsMenuIcon} />
                <Text style={styles.settingsMenuText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        {/* Profile Menu Modal */}
        <Modal
          visible={showProfileMenu}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowProfileMenu(false)}
        >
          <View style={styles.profileMenu}>
            <View style={styles.profileHeader}>
              <Text style={styles.profileTitle}>Profile</Text>
              <TouchableOpacity onPress={() => setShowProfileMenu(false)}>
                <Ionicons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            {profileOptions.map(option => (
              <TouchableOpacity 
                key={option.id} 
                style={styles.profileMenuItem}
                onPress={() => setShowProfileMenu(false)}
              >
                <Ionicons name={option.icon} size={20} color="#E50914" style={styles.profileMenuIcon} />
                <Text style={styles.profileMenuText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'Splash' }],
            })}
          >
            <Ionicons name="home" size={24} color="#E50914" style={styles.navIcon} />
            <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => setShowSettings(true)}
          >
            <Ionicons name="settings" size={24} color="#666666" style={styles.navIcon} />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => setShowProfileMenu(true)}
          >
            <Ionicons name="person" size={24} color="#666666" style={styles.navIcon} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen; 