import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserTrips } from '../services/tripService';

export default function HistoryScreen() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      const data = await getUserTrips();
      setTrips(data);
      setLoading(false);
    };

    fetchTrips();
  }, []);

  const renderTripItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ReportScreen', { tripData: item })}
    >
      <Text style={styles.date}>
        {item.createdAt?.toDate().toLocaleString() || 'Unknown Date'}
      </Text>
      <Text>🕒 Duration: {item.duration} sec</Text>
      <Text>📍 Distance: {item.distance} km</Text>
      <Text>😵 Distractions: {item.distractionCount}</Text>
      <Text>🎯 Score: {item.score || 'N/A'}/100</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2a9d8f" />
        <Text>Loading trip history...</Text>
      </View>
    );
  }

  if (!trips.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>No trips recorded yet.</Text>
        <Text>Start your first drive to generate a report!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={trips}
      keyExtractor={(item) => item.id}
      renderItem={renderTripItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    fontWeight: '600',
  },
});
