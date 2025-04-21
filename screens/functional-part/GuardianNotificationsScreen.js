import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/GuardianNotificationsStyles';

const GuardianNotificationsScreen = () => {
  const navigation = useNavigation();

  // Mock data for guardians
  const guardians = [
    {
      id: 1,
      name: 'John Doe',
      contactMethod: 'SMS',
      timestamp: '10:24 AM',
      status: 'Delivered',
      deliveryStages: ['Sent', 'Delivered', 'Viewed', 'Responded'],
      activeStage: 3,
    },
    {
      id: 2,
      name: 'Jane Smith',
      contactMethod: 'Call',
      timestamp: '10:25 AM',
      status: 'Pending',
      deliveryStages: ['Sent', 'Delivered', 'Viewed', 'Responded'],
      activeStage: 1,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      contactMethod: 'Email',
      timestamp: '10:26 AM',
      status: 'Failed',
      deliveryStages: ['Sent', 'Delivered', 'Viewed', 'Responded'],
      activeStage: 0,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#4CAF50';
      case 'Pending':
        return '#FFC107';
      case 'Failed':
        return '#E50914';
      default:
        return '#666666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return 'checkmark-circle';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const getContactIcon = (method) => {
    switch (method) {
      case 'SMS':
        return 'chatbubble';
      case 'Call':
        return 'call';
      case 'Email':
        return 'mail';
      default:
        return 'help-circle';
    }
  };

  const GuardianCard = ({ guardian }) => (
    <View style={styles.guardianCard}>
      <View style={styles.guardianHeader}>
        <View style={styles.guardianInfo}>
          <Text style={styles.guardianName}>{guardian.name}</Text>
          <View style={styles.contactMethod}>
            <Ionicons name={getContactIcon(guardian.contactMethod)} size={16} color="#666666" />
            <Text style={styles.contactText}>{guardian.contactMethod}</Text>
          </View>
        </View>
        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>Sent at {guardian.timestamp}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(guardian.status) }]}>
            <Ionicons name={getStatusIcon(guardian.status)} size={16} color="#FFFFFF" />
            <Text style={styles.statusText}>{guardian.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.deliveryStages}>
        {guardian.deliveryStages.map((stage, index) => (
          <View key={index} style={styles.stageContainer}>
            <View
              style={[
                styles.stageDot,
                index <= guardian.activeStage ? styles.activeDot : styles.inactiveDot,
              ]}
            />
            <Text
              style={[
                styles.stageText,
                index <= guardian.activeStage ? styles.activeText : styles.inactiveText,
              ]}
            >
              {stage}
            </Text>
            {index < guardian.deliveryStages.length - 1 && (
              <View
                style={[
                  styles.stageLine,
                  index < guardian.activeStage ? styles.activeLine : styles.inactiveLine,
                ]}
              />
            )}
          </View>
        ))}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="refresh" size={20} color="#E50914" />
          <Text style={styles.actionText}>Resend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="send" size={20} color="#E50914" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-text" size={20} color="#E50914" />
          <Text style={styles.actionText}>Logs</Text>
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
          <Text style={styles.title}>Guardian Notifications</Text>
          <Text style={styles.subtitle}>
            Monitor the delivery and response status of SOS alerts.
          </Text>
        </View>

        {/* Guardian Cards */}
        {guardians.map((guardian) => (
          <GuardianCard key={guardian.id} guardian={guardian} />
        ))}

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📊 Notification Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Ionicons name="people" size={20} color="#666666" />
              <Text style={styles.summaryLabel}>Total Guardians</Text>
              <Text style={styles.summaryValue}>3</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.summaryLabel}>Delivered</Text>
              <Text style={styles.summaryValue}>2</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="warning" size={20} color="#FFC107" />
              <Text style={styles.summaryLabel}>Pending</Text>
              <Text style={styles.summaryValue}>1</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="close-circle" size={20} color="#E50914" />
              <Text style={styles.summaryLabel}>Failed</Text>
              <Text style={styles.summaryValue}>0</Text>
            </View>
          </View>
        </View>

        {/* Info Note */}
        <View style={styles.infoNote}>
          <Ionicons name="information-circle" size={20} color="#E50914" />
          <Text style={styles.infoText}>
            In case of delivery failure, alerts will auto-resend every 5 mins for 30 minutes.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default GuardianNotificationsScreen; 