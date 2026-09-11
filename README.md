🧠 Memora

AI-Based Cognitive Gaming & Memory Assistance Platform

Memora is an elderly-focused digital memory companion designed to support cognitive engagement, daily routines and caregiver awareness through a simple, accessible and interactive web application.

It combines cognitive gaming, reminders, guided breathing, memory journaling, voice interaction and caregiver monitoring into one platform.

---

🎯 Problem Statement

Elderly people experiencing memory decline or dementia may face challenges such as:

- Forgetting daily activities.
- Difficulty maintaining routines.
- Reduced cognitive engagement.
- Difficulty remembering familiar information.
- Dependence on caregivers for routine monitoring.
- Difficulty using complicated digital applications.

These challenges can become more significant when caregivers cannot provide continuous supervision.

Memora aims to provide a simple digital companion that supports both the elderly user and their caregiver.

---

💡 Our Solution

Memora provides an elderly-friendly interface with multiple assistance modules.

Core Modules

🧩 Cognitive Game

🎯 Reminders

🧘 Calm & Breathe

📔 Memory Journal

👨‍👩‍👧 Caregiver Dashboard

🎙️ Voice Commands

🔊 Read Aloud

🌐 Multilingual Interface

---

🧩 Cognitive Game

The main cognitive activity is:

"Where Does It Belong?"

Users are shown familiar everyday objects and asked to identify the appropriate room/location.

Current Game Structure

- 10 predefined objects.
- 5 room categories.
- 5 questions per session.
- 3 difficulty levels.
- Immediate feedback.
- Progress tracking.
- Score recording.
- Spoken answer support.

Difficulty

Level| Choices
Easy| 2
Medium| 3
Hard| 5

Room Categories

- Kitchen
- Bedroom
- Bathroom
- Living Room
- Front Door

The game is designed to provide short, familiar and engaging cognitive exercises.

---

⏰ Smart Reminders

Users can create reminders for important daily activities.

Reminder Types

- 💊 Medicine
- 💧 Water
- 📅 Appointment
- 📝 Other

Users can:

- Add reminders.
- Mark reminders as completed.
- Delete reminders.
- View upcoming reminders.
- Hear reminder information through text-to-speech.

The application checks reminder times periodically and can provide browser-based notification/chime feedback.

---

👨‍👩‍👧 Caregiver Dashboard

The caregiver dashboard provides a simplified overview of user activity.

Current Metrics

- Total cognitive-game sessions.
- Average cognitive-game score.
- Best difficulty reached.
- Recent session history.
- Reminder completion status.

This helps caregivers understand engagement without requiring them to observe every activity directly.

---

🧘 Calm & Breathe

Memora provides a guided breathing exercise designed around a simple visual cycle.

Breathing Cycle

4 sec — Inhale

↓

4 sec — Hold

↓

4 sec — Exhale

The animated interface guides the user through the exercise and tracks completed rounds.

---

📔 Memory Journal

The Memory Journal provides a simple space for recording personal thoughts and memories.

Users can:

- Create entries.
- View entries.
- Delete entries.
- Associate entries with dates.

The feature is intentionally simple so that users are not required to navigate through a complex note-taking system.

---

🎙️ Voice Interaction

Memora uses browser speech capabilities to provide voice interaction.

Voice commands can navigate between major application modules, including:

- Cognitive Game
- Reminders
- Caregiver Dashboard
- Calm & Breathe
- Memory Journal

The application also supports browser text-to-speech for reading information aloud.

---

🌐 Multilingual Support

The current interface supports:

🇬🇧 English

🇮🇳 Hindi

🇮🇳 Bengali

The multilingual approach is intended to make the application more accessible to users who may be more comfortable interacting in regional languages.

---

🛠️ Technology Stack

Frontend

- React 19
- TypeScript
- Vite
- React Router

Styling & UI

- Tailwind CSS
- Framer Motion

Visual & Interactive Components

- Three.js
- Canvas Confetti

Web Capabilities

- Web Speech API / Speech Recognition
- Speech Synthesis
- Browser Notifications
- Local Storage
- Progressive Web App capabilities

---

🏗️ Architecture

The current application follows a client-side web architecture.

                    ┌───────────────────┐
                    │      Memora       │
                    │   Web Application  │
                    └─────────┬─────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       Cognitive Game      Reminders       Journal
             │                │                │
             └────────────────┼────────────────┘
                              │
                              ▼
                     Caregiver Dashboard
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
        Voice Interaction            Local Persistence
        Speech Recognition             localStorage
        Speech Synthesis

---

💾 Data Persistence

The current implementation uses browser localStorage for client-side persistence.

Stored application information includes:

- User name.
- Reminders.
- Game statistics.
- Language preference.
- Journal entries.

This makes the current prototype lightweight and easy to run without requiring a backend server.

---

📱 User Experience

Memora follows an elderly-friendly visual and interaction approach.

UI Characteristics

- Large rounded cards.
- Simple navigation.
- High readability.
- Short instructions.
- Clear feedback.
- Responsive layout.
- Animated interactions.
- Glassmorphism-inspired components.
- Warm, calming visual language.

The application is designed primarily around straightforward interaction rather than complex menus.

---

🔐 Privacy-Oriented Prototype Architecture

The current prototype keeps user-generated information in the browser rather than transmitting it to a remote backend.

This means the current version does not require a cloud database for its basic functionality.

Future versions can introduce stronger account-level synchronization and secure caregiver access where required.

---

🚀 Future Scope

The current implementation provides the foundation for further development.

Potential future enhancements include:

- AI-assisted personalization of cognitive exercises.
- Adaptive difficulty based on long-term performance.
- More cognitive game categories.
- Personalized reminder patterns.
- Secure cloud synchronization.
- Dedicated caregiver accounts.
- Remote caregiver monitoring.
- Advanced analytics.
- More Indian regional languages.
- Offline-first synchronization.
- Integration with healthcare ecosystems where appropriate.
- Improved accessibility for elderly users.
- Personalized cognitive activity recommendations.

These are future development possibilities and are not claimed as part of the current prototype unless implemented.

---

📊 Project Status

Current Status: Functional Web Prototype

Implemented modules include:

- [x] Home Dashboard
- [x] Cognitive Game
- [x] Difficulty Levels
- [x] Score Tracking
- [x] Reminder System
- [x] Caregiver Dashboard
- [x] Calm & Breathe
- [x] Memory Journal
- [x] Voice Navigation
- [x] Text-to-Speech
- [x] English / Hindi / Bengali
- [x] Responsive UI
- [x] Local Data Persistence
- [x] PWA Support

---

🎯 SIH Problem Statement

PS ID: SIH26003

Problem Statement:
AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)

Theme: Space Technology

Category: Software

Team: Ctrl Alt Elite

Solution: Memora

---

👥 Team

Ctrl Alt Elite

Built for Smart India Hackathon 2026.

---

📌 Disclaimer

Memora is a technology prototype intended to provide cognitive engagement and daily assistance. It is not a medical diagnostic or treatment system and should not be considered a replacement for professional medical care or caregiver supervision.

---

⭐ Vision

«Making everyday digital assistance simpler, more engaging and more accessible for elderly users.»

Memora aims to bridge the gap between cognitive engagement, daily assistance and caregiver awareness through an approachable digital companion.
