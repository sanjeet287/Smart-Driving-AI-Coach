# 🚗 Smart Driving AI Coach

**Smart Driving AI Coach** is a mobile application that leverages AI to help drivers improve their road habits and ensure safer driving. Built with React Native and Firebase, it features distraction detection (via TensorFlow Lite or MediaPipe), real-time trip logging, user authentication, and a modern UI/UX optimized for kiosk and mobile experiences.

---

## ✨ Features

- 🔍 **AI Distraction Detection** (MediaPipe / TensorFlow Lite)
- 🛣️ **Trip History Logging**
- 🔐 **Secure Authentication** (Firebase Auth)
- ☁️ **Realtime Sync with Firebase Firestore**
- 🎨 **Modern UI with Animated Layouts**
- 📱 **Kiosk Mode Support**
- 🔄 **Reusable Custom Hooks for State Management**
- 🧠 **Driver Behavior Tracking (planned)**

---

## 🧱 Tech Stack

| Layer        | Technology                             |
|--------------|-----------------------------------------|
| Frontend     | React Native, Expo, React Navigation    |
| AI/ML        | MediaPipe / TensorFlow Lite (TFLite)    |
| Backend      | Firebase (Auth + Firestore), Node.js (future) |
| UI           | Tailwind-style custom styling, Animated Components |
| State Mgmt   | Custom Hooks + React Context API        |

---

## Installation & Setup

### Prerequisites

- Node.js ≥ 16
- Expo CLI (`npm install -g expo-cli`)
- Firebase project with Auth and Firestore enabled

### Steps

```bash
git clone https://github.com/yourusername/smart-driving-ai-coach.git
cd smart-driving-ai-coach
npm install
expo start
