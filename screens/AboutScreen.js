import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>About Smart Driver Coach</Text>
        <Text style={styles.text}>
          Smart Driver Coach is a safety-first app designed to coach drivers in real-time.
          With AI-backed distraction detection, route history, and analytics, we help improve
          fuel efficiency, reduce road incidents, and empower both fleet managers and individual
          drivers.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
});
