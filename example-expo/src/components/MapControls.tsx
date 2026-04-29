import React, { RefObject, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Animation } from 'react-native-yamap-plus';

type MapControlsApi = {
  setCenter: (center: { lat: number; lon: number }, zoom?: number) => void;
  setZoom: (zoom: number, duration?: number, animation?: Animation) => void;
  getCameraPosition: (callback: (position: { zoom: number }) => void) => void;
  fitAllMarkers: () => void;
  setTrafficVisible: (isVisible: boolean) => void;
};

type Props = {
  mapRef: RefObject<MapControlsApi | null>;
  center: { lat: number; lon: number };
  centerZoom: number;
};

export const MapControls = ({ mapRef, center, centerZoom }: Props) => {
  const [trafficVisible, setTrafficVisible] = useState(false);

  const zoomBy = (delta: number) => {
    mapRef.current?.getCameraPosition((position) => {
      const nextZoom = Math.min(20, Math.max(2, position.zoom + delta));
      mapRef.current?.setZoom(nextZoom, 0.35, Animation.SMOOTH);
    });
  };

  return (
    <View style={styles.controls}>
      <Pressable style={styles.button} onPress={() => mapRef.current?.setCenter(center, centerZoom)}>
        <Text style={styles.buttonText}>Center</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => zoomBy(-1)}>
        <Text style={styles.buttonText}>Zoom -</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => zoomBy(1)}>
        <Text style={styles.buttonText}>Zoom +</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => mapRef.current?.fitAllMarkers()}>
        <Text style={styles.buttonText}>Fit</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          const next = !trafficVisible;
          setTrafficVisible(next);
          mapRef.current?.setTrafficVisible(next);
        }}
      >
        <Text style={styles.buttonText}>{trafficVisible ? 'Traffic off' : 'Traffic on'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    right: 12,
    bottom: 20,
    gap: 8,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
