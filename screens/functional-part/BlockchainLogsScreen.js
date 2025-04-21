import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/BlockchainLogsStyles';

const BlockchainLogsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data for blockchain logs
  const logs = [
    {
      id: 'LOG-001',
      date: '2024-03-15 14:30:45',
      location: '28.6139° N, 77.2090° E',
      audioDuration: '00:45',
      status: 'verified',
    },
    {
      id: 'LOG-002',
      date: '2024-03-15 13:15:22',
      location: '28.7041° N, 77.1025° E',
      audioDuration: '01:20',
      status: 'pending',
    },
    {
      id: 'LOG-003',
      date: '2024-03-15 12:05:10',
      location: '28.5355° N, 77.3910° E',
      audioDuration: '00:30',
      status: 'failed',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'failed':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'failed':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const formatLogId = (id) => {
    return `${id.slice(0, 6)}...${id.slice(-4)}`;
  };

  const LogCard = ({ log }) => (
    <View style={styles.logCard}>
      <View style={styles.logHeader}>
        <View style={styles.logIdContainer}>
          <Ionicons name="document-text" size={16} color="#666666" />
          <Text style={styles.logId}>{log.id}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(log.status) },
          ]}
        >
          <Ionicons
            name={getStatusIcon(log.status)}
            size={14}
            color="#FFFFFF"
          />
          <Text style={styles.statusText}>
            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.logDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#666666" />
          <Text style={styles.detailText}>{log.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color="#666666" />
          <Text style={styles.detailText}>{log.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="mic" size={16} color="#666666" />
          <Text style={styles.detailText}>Audio: {log.audioDuration}</Text>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={16} color="#E50914" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.viewLogButton}>
        <Text style={styles.viewLogText}>View Full Log</Text>
        <Ionicons name="chevron-forward" size={16} color="#E50914" />
      </TouchableOpacity>
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
          <Text style={styles.title}>Blockchain Logs</Text>
          <Text style={styles.subtitle}>
            View and verify your SOS-related data stored on the blockchain
          </Text>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search logs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.filterContainer}>
            {['all', 'verified', 'pending', 'failed'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Log Cards */}
        {logs.map((log) => (
          <LogCard key={log.id} log={log} />
        ))}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={24} color="#E50914" />
          <Text style={styles.infoText}>
            All logs are securely stored on the blockchain and cannot be modified
            or deleted.
          </Text>
        </View>

        {/* Export Button */}
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download" size={20} color="#FFFFFF" />
          <Text style={styles.exportText}>Export Logs (PDF/CSV)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default BlockchainLogsScreen; 