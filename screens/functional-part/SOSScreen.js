import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeMitraLogo from '../../components/SafeMitraLogo';
import { styles } from '../styles-part/SOSStyles';

const SOSScreen = () => {
  const navigation = useNavigation();
  const [isTriggerWordEnabled, setIsTriggerWordEnabled] = useState(false);
  const [isQuickTapEnabled, setIsQuickTapEnabled] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  React.useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

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

      {/* Main Content */}
      <View style={styles.content}>
        {/* SOS Button */}
        <View style={styles.sosButtonContainer}>
          <Animated.View
            style={[
              styles.pulseRing,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <TouchableOpacity style={styles.sosButton}>
            <Ionicons name="alert-circle" size={64} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.activateText}>Tap to Activate SOS</Text>
        <Text style={styles.subText}>
          This will immediately alert your guardians and start audio + location tracking.
        </Text>

        {/* Toggle Switches */}
        <View style={styles.togglesContainer}>
          <View style={styles.toggleItem}>
            <Text style={styles.toggleLabel}>Trigger Word Detection</Text>
            <TouchableOpacity
              style={[
                styles.toggle,
                isTriggerWordEnabled && styles.toggleActive,
              ]}
              onPress={() => setIsTriggerWordEnabled(!isTriggerWordEnabled)}
            >
              <View
                style={[
                  styles.toggleCircle,
                  isTriggerWordEnabled && styles.toggleCircleActive,
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.toggleItem}>
            <Text style={styles.toggleLabel}>Quick Tap Activation</Text>
            <TouchableOpacity
              style={[
                styles.toggle,
                isQuickTapEnabled && styles.toggleActive,
              ]}
              onPress={() => setIsQuickTapEnabled(!isQuickTapEnabled)}
            >
              <View
                style={[
                  styles.toggleCircle,
                  isQuickTapEnabled && styles.toggleCircleActive,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <Ionicons name="mic" size={20} color="#E50914" />
            <Text style={styles.statusText}>Mic Listening: Active 🔴</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="location" size={20} color="#E50914" />
            <Text style={styles.statusText}>GPS Location: Active 🛰️</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="notifications" size={20} color="#E50914" />
            <Text style={styles.statusText}>Alerts Ready: Yes ✅</Text>
          </View>
        </View>

        {/* Emergency Settings Button */}
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>Emergency Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SOSScreen; 