import React from 'react';
import AnimatedLoader from "react-native-animated-loader";
import { View, Text, StyleSheet } from "react-native";

export const Loader = () => {
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text style={styles.text}>Cargando...</Text>
      </AnimatedLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 240,
    height: 240,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Roboto-Black",
    color: '#333',
    textAlign: 'center',
  },
});
