import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveTripToFirestore } from '../services/tripService';
import { useUserProfile } from '../hooks/useUserProfile';
import DriverNavbar from '../components/DriverNavbar';

export default function ReportScreen() {
    const driver = useUserProfile();
  const navigation = useNavigation();
  const route = useRoute();
  const { tripData } = route.params;
   

  if (!tripData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No trip data found.</Text>
        <Button title="Back to Home" onPress={() => navigation.navigate('HomeScreen')} />
      </View>
    );
  }

  const { duration, distance, distractionCount } = tripData;

  const computeDrivingScore = () => {
    const distractionPenalty = distractionCount * 10;
    const timeBonus = duration < 900 ? 10 : 0;
    const score = 100 - distractionPenalty + timeBonus;
    return Math.max(0, Math.min(100, score.toFixed(1)));
  };

  const score = computeDrivingScore();

  const getInsights = () => {
    const insights = [];

    if (distractionCount > 5) {
      insights.push('⚠️ You were frequently distracted. Try to stay more focused.');
    } else if (distractionCount > 0) {
      insights.push('🙂 Good job! A few distractions — aim for full focus.');
    } else {
      insights.push('✅ Excellent focus! Zero distractions.');
    }

    if (distance < 1) {
      insights.push('🛣️ This was a short trip. Not enough data for performance trends.');
    } else if (distance > 10 && duration / distance > 300) {
      insights.push('⏳ Consider avoiding heavy traffic or choosing faster routes.');
    }

    return insights;
  };

  const handleSave = async () => {
    const tripId = await saveTripToFirestore({ ...tripData, score });
    if (tripId) {
      Alert.alert('Trip saved', `Trip ID: ${tripId}`);
    } else {
      Alert.alert('Error', 'Failed to save trip.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Trip Report</Text>

      <View style={styles.card}>
        <DriverNavbar driver={driver} tripStatus="ended" />
        <Text style={styles.label}>🕒 Duration:</Text>
        <Text style={styles.value}>{duration} seconds</Text>

        <Text style={styles.label}>📍 Distance:</Text>
        <Text style={styles.value}>{distance} km</Text>

        <Text style={styles.label}>😵 Distractions:</Text>
        <Text style={styles.value}>{distractionCount}</Text>

        <Text style={styles.label}>🎯 Driving Score:</Text>
        <Text style={[styles.value, styles.score]}>{score}/100</Text>
      </View>

      <Text style={styles.subtitle}>💡 Insights</Text>
      {getInsights().map((tip, index) => (
        <Text key={index} style={styles.insight}>
          • {tip}
        </Text>
      ))}

      <View style={styles.btnGroup}>
        <Button title="Save Report" onPress={handleSave} />
        <View style={{ height: 10 }} />
        <Button title="Back to Home" onPress={() => navigation.navigate('HomeScreen')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  label: { fontWeight: '600', marginTop: 10 },
  value: { fontSize: 16 },
  score: { fontSize: 20, fontWeight: 'bold', color: '#2a9d8f', marginTop: 5 },
  insight: { marginBottom: 8, color: '#555', fontSize: 14 },
  btnGroup: { marginTop: 20 },
});
