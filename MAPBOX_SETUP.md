# Mapbox Setup Instructions

## ✅ Completed Setup

The following configurations have been added for `@rnmapbox/maps`:

### Android Setup
1. ✅ Added Mapbox Maven repository to `android/build.gradle` (buildscript and allprojects)
2. ✅ Added location permissions to `android/app/src/main/AndroidManifest.xml`:
   - `ACCESS_FINE_LOCATION`
   - `ACCESS_COARSE_LOCATION`

### iOS Setup
1. ✅ Added location permissions to `ios/Abwabagent/Info.plist`:
   - `NSLocationWhenInUseUsageDescription`
   - `NSLocationAlwaysAndWhenInUseUsageDescription`

### App Initialization
1. ✅ Added Mapbox initialization in `App.js` with access token support from `react-native-config`

## 📋 Next Steps

### 1. Install iOS Dependencies
```bash
cd ios
pod install
cd ..
```

### 2. Get Mapbox Access Token
1. Sign up or log in to [Mapbox](https://account.mapbox.com/)
2. Go to [Access Tokens](https://account.mapbox.com/access-tokens/)
3. Create a new token or copy your existing token

### 3. Add Access Token to Environment Variables
Add the following to your `.env.dev` and `.env.prod` files:
```
MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
```

### 4. (Optional) Add Mapbox Downloads Token for Android
If you're using a private Mapbox account, you may need to add a downloads token to `android/gradle.properties`:
```
MAPBOX_DOWNLOADS_TOKEN=your_mapbox_downloads_token_here
```

### 5. Rebuild the App
```bash
# For Android
npm run android:dev

# For iOS
npm run ios:dev
```

## 📝 Usage Example

```javascript
import Mapbox from '@rnmapbox/maps';

<Mapbox.MapView
  style={{flex: 1}}
  styleURL={Mapbox.StyleURL.Street}>
  <Mapbox.Camera
    zoomLevel={15}
    centerCoordinate={[longitude, latitude]}
  />
  <Mapbox.PointAnnotation
    id="marker"
    coordinate={[longitude, latitude]}>
    <Mapbox.Callout title="Location" />
  </Mapbox.PointAnnotation>
</Mapbox.MapView>
```

## 🔗 Resources
- [@rnmapbox/maps Documentation](https://github.com/rnmapbox/maps)
- [Mapbox Access Tokens](https://account.mapbox.com/access-tokens/)

