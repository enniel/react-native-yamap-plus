import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle, Marker, MarkerRef, Polygon, Polyline, Yamap, YamapRef } from 'react-native-yamap-plus';
import { MapControls } from '../components/MapControls';

const markerImage = { uri: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f4cd.png' };
export const MapScreen = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<YamapRef | null>(null);
  const markerRef = useRef<MarkerRef | null>(null);
  const angleRef = useRef(0);
  const [dashLength, setDashLength] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => setDashLength((v) => (v === 15 ? 20 : 15)), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      mapRef.current?.getCameraPosition((position) => {
        console.log('getCameraPosition', position);
      });
    }
  }, [mapLoaded]);

  return (
    <View style={styles.container}>
      <Yamap
        ref={mapRef}
        initialRegion={{ lat: 55.751244, lon: 37.618423, zoom: 12 }}
        style={styles.container}
        logoPosition={{ horizontal: 'right', vertical: 'top' }}
        onMapLoaded={(e) => {
          console.log('onMapLoaded', e.nativeEvent);
          setMapLoaded(true);
        }}
        onCameraPositionChange={(e) => console.log('onCameraPositionChange', e.nativeEvent)}
        onCameraPositionChangeEnd={(e) => console.log('onCameraPositionChangeEnd', e.nativeEvent)}
        onMapPress={(e) => {
          console.log('map onPress', e.nativeEvent);
          markerRef.current?.animatedMoveTo(e.nativeEvent, 500);
        }}
        onMapLongPress={(e) => {
          console.log('map onLongPress', e.nativeEvent);
        }}
      >
        <Marker
          ref={markerRef}
          point={{ lat: 55.751244, lon: 37.618423 }}
          rotated
          onPress={() => console.log('marker onPress')}
          anchor={{ x: 0.5, y: 1 }}
          scale={0.5}
          source={markerImage}
        />
        <Circle
          center={{ lat: 55.74, lon: 37.64 }}
          radius={500}
          handled
          strokeWidth={5}
          strokeColor="red"
          fillColor="blue"
          onPress={() => {
            console.log('circle onPress');
            angleRef.current += 180;
            markerRef.current?.animatedRotateTo(angleRef.current, 300);
          }}
          zIndex={100}
        />
        <Polygon
          points={[
            { lat: 55.74, lon: 37.57 },
            { lat: 55.7, lon: 37.6 },
            { lat: 55.72, lon: 37.64 },
            { lat: 55.77, lon: 37.64 },
          ]}
          fillColor="green"
          strokeColor="blue"
          strokeWidth={3}
          handled={false}
          onPress={() => console.log('polygon press')}
          zIndex={5}
          innerRings={[[{ lat: 55.735, lon: 37.58 }, { lat: 55.71, lon: 37.61 }, { lat: 55.72, lon: 37.63 }]]}
        />
        <Polygon
          points={[
            { lat: 55.77, lon: 37.57 },
            { lat: 55.7, lon: 37.62 },
            { lat: 55.78, lon: 37.6 },
          ]}
          fillColor="red"
          strokeWidth={0}
          handled
          onPress={() => console.log('polygon press')}
          zIndex={7}
        />
        <Polyline
          points={[
            { lat: 55.78, lon: 37.6 },
            { lat: 55.76, lon: 37.57 },
            { lat: 55.78, lon: 37.64 },
            { lat: 55.79, lon: 37.6 },
          ]}
          strokeWidth={4}
          strokeColor="rgb(10,10,10)"
          outlineColor="orange"
          outlineWidth={2}
          gapLength={5}
          dashLength={dashLength}
          handled
          onPress={() => console.log('polyline press')}
          zIndex={11}
        />
      </Yamap>

      <MapControls mapRef={mapRef} center={{ lat: 55.751244, lon: 37.618423 }} centerZoom={12} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
