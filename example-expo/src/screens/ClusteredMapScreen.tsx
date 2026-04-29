import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ClusteredYamap, ClusteredYamapRef, Marker } from 'react-native-yamap-plus';
import { MapControls } from '../components/MapControls';

const markerImage = { uri: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f4cd.png' };
const clusterIcon = { uri: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f534.png' };

const markers = [
  {
    point: {
      lat: 56.754215,
      lon: 38.422504,
    },
    data: {},
  },
  {
    point: {
      lat: 56.7575,
      lon: 38.4288,
    },
    data: {},
  },
  {
    point: {
      lat: 56.7602,
      lon: 38.4342,
    },
    data: {},
  },
];

export const ClusteredMapScreen = () => {
  const clusteredMapRef = useRef<ClusteredYamapRef | null>(null);

  return (
    <View style={styles.container}>
      <ClusteredYamap
        ref={clusteredMapRef}
        clusterColor="green"
        clusterIcon={clusterIcon}
        clusterSize={{ width: 35, height: 35 }}
        clusterTextColor="red"
        initialRegion={{ lat: 56.754215, lon: 38.421242, zoom: 8 }}
        onMapLoaded={(event) => {
          console.log('clustered onMapLoaded', event.nativeEvent);
        }}
        onCameraPositionChange={(e) => {
          console.log('clustered onCameraPositionChange', e.nativeEvent);
        }}
        onCameraPositionChangeEnd={(e) => {
          console.log('clustered onCameraPositionChangeEnd', e.nativeEvent);
        }}
        onMapPress={(e) => {
          console.log('clustered map onPress', e.nativeEvent);
        }}
        onMapLongPress={(e) => {
          console.log('clustered map onLongPress', e.nativeEvent);
        }}
        clusteredMarkers={markers}
        renderMarker={(info) => (
          <Marker
            key={`${info.point.lat}_${info.point.lon}`}
            point={info.point}
            scale={0.8}
            source={markerImage}
            anchor={{ x: 0.5, y: 1 }}
          />
        )}
        style={styles.container}
      />

      <MapControls mapRef={clusteredMapRef} center={{ lat: 56.754215, lon: 38.421242 }} centerZoom={8} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
