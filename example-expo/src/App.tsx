import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { YamapInstance } from 'react-native-yamap-plus';
import { SelectOption } from './components/SelectOption';
import { API_KEY } from './config';
import { ClusteredMapScreen } from './screens/ClusteredMapScreen';
import { MapScreen } from './screens/MapScreen';
import { Screen } from './screens/screens';
import { SearchScreen } from './screens/SearchScreen';
import { SuggestScreen } from './screens/SuggestScreen';

export default function App() {
  const [selectedScreen, setSelectedScreen] = useState(Screen.Map);
  const [isYamapReady, setIsYamapReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const apiKey = useMemo(() => API_KEY, []);

  useEffect(() => {
    let isMounted = true;

    if (!apiKey) {
      console.warn('Set EXPO_PUBLIC_YANDEX_MAPKIT_API_KEY before app start.');
      setInitError('Missing EXPO_PUBLIC_YANDEX_MAPKIT_API_KEY');
      return;
    }

    const init = async () => {
      try {
        await YamapInstance.setLocale('ru_RU');
        await YamapInstance.init(apiKey);
        if (isMounted) {
          setIsYamapReady(true);
          setInitError(null);
        }
      } catch (error: unknown) {
        console.warn(error);
        if (isMounted) {
          setInitError(error instanceof Error ? error.message : 'Failed to initialize Yamap');
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  if (!isYamapReady) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#111827" />
        <Text style={styles.loaderText}>
          {initError ? `Yamap init failed: ${initError}` : 'Initializing Yamap...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SelectOption selectedScreen={selectedScreen} setSelectedScreen={setSelectedScreen} />
      {selectedScreen === Screen.Map && <MapScreen />}
      {selectedScreen === Screen.ClusteredMap && <ClusteredMapScreen />}
      {selectedScreen === Screen.Search && <SearchScreen />}
      {selectedScreen === Screen.Suggest && <SuggestScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
  },
  loaderText: {
    color: '#111827',
    textAlign: 'center',
  },
});
