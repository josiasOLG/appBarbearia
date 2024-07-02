const fs = require('fs');
const path = require('path');

const manifests = [
  'node_modules/react-native-svg/android/src/main/AndroidManifest.xml',
  'node_modules/react-native-vector-icons/android/src/main/AndroidManifest.xml',
  'node_modules/@react-native-async-storage/async-storage/android/src/main/AndroidManifest.xml',
  'node_modules/@react-native-firebase/firestore/android/src/main/AndroidManifest.xml',
  'node_modules/react-native-app-auth/android/src/main/AndroidManifest.xml',
  'node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml',
  'node_modules/@react-native-firebase/app/android/src/main/AndroidManifest.xml',
];

manifests.forEach(file => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${file}:`, err);
      return;
    }

    const result = data.replace(/package="[^"]*"/, '');

    fs.writeFile(file, result, 'utf8', err => {
      if (err) {
        console.error(`Error writing ${file}:`, err);
        return;
      }
      console.log(`Fixed ${file}`);
    });
  });
});
