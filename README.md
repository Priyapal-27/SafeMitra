# SafeMitra - Emergency Response Mobile Application

SafeMitra is a mobile application designed to provide emergency assistance and safety features for users. The app includes features like SOS activation, safe route tracking, and real-time location sharing with guardians.

## Features

- **SOS Activation**: Quick emergency alert system with voice detection
- **Safe Route Tracking**: Real-time route monitoring with safety alerts
- **Guardian System**: Add and manage emergency contacts
- **Location Sharing**: Real-time location updates to guardians
- **Admin Panel**: Comprehensive dashboard for monitoring and management
- **Blockchain Integration**: Secure logging of emergency events

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Expo CLI (optional, for easier development)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/safemitra.git
   cd safemitra
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required global packages**
   ```bash
   npm install -g react-native-cli
   # or
   yarn global add react-native-cli
   ```

## Dependencies

The project uses the following major dependencies:

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.x",
    "@react-navigation/stack": "^6.x",
    "react": "18.x",
    "react-native": "0.72.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-reanimated": "^3.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-screens": "^3.x",
    "@expo/vector-icons": "^13.x",
    "react-native-maps": "^1.x",
    "react-native-geolocation-service": "^5.x",
    "react-native-permissions": "^3.x",
    "react-native-voice": "^0.3.x",
    "react-native-push-notification": "^8.x",
    "react-native-config": "^1.x",
    "react-native-dotenv": "^3.x"
  }
}
```

## Environment Setup

1. **Create a `.env` file in the root directory**
   ```
   API_URL=your_api_url
   MAPS_API_KEY=your_google_maps_api_key
   BLOCKCHAIN_NODE_URL=your_blockchain_node_url
   ```

2. **Android Setup**
   - Open Android Studio
   - Open the `android` folder in the project
   - Sync Gradle files
   - Create a virtual device or connect a physical device

3. **iOS Setup** (macOS only)
   - Open Xcode
   - Open the `ios` folder in the project
   - Install pods: `cd ios && pod install`
   - Open the `.xcworkspace` file

## Running the Application

### Development Mode

```bash
# Start Metro bundler
npm start
# or
yarn start

# Run on Android
npm run android
# or
yarn android

# Run on iOS
npm run ios
# or
yarn ios
```

### Production Build

```bash
# Android
cd android
./gradlew assembleRelease

# iOS
# Open Xcode and select Product > Archive
```

## Project Structure

```
safemitra/
├── assets/              # Images, fonts, and other static assets
├── components/          # Reusable React components
├── screens/            # Screen components
│   ├── functional-part/ # Main functional screens
│   └── styles-part/    # Screen-specific styles
├── navigation/         # Navigation configuration
├── utils/             # Utility functions and helpers
├── services/          # API and external service integrations
└── App.js            # Main application entry point
```

## Key Features Implementation

### SOS Activation
- Voice detection using react-native-voice
- Location tracking with react-native-geolocation-service
- Push notifications to guardians

### Safe Route Tracking
- Real-time location updates
- Route deviation detection
- Safety alerts and notifications

### Admin Panel
- User management
- Emergency event monitoring
- System configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security Considerations

- All API calls use HTTPS
- Sensitive data is encrypted
- Location data is only shared with authorized guardians
- Emergency contacts are verified through OTP
- Blockchain integration for immutable event logging

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@safemitra.com or join our Slack channel.

## Acknowledgments

- React Native community
- Open source contributors
- Security researchers
- Beta testers 