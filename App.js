import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, Button, Animated, Easing } from "react-native";

/* =========================
   ProgressBar Component
========================= */

const ProgressBar = ({ value }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // anima sempre que value muda
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 600,
      easing: Easing.ease, // easeOut-like
      useNativeDriver: false,
    }).start();
  }, [value]);

  // largura animada
  const widthInterpolate = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const colorInterpolate = animatedValue.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ["#ef4444", "#eab308", "#22c55e"],
  });

  return (
    <View
      style={{
        height: 30,
        width: "100%",
        backgroundColor: "#e5e7eb",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          height: "100%",
          width: widthInterpolate,
          backgroundColor: colorInterpolate,
        }}
      />
    </View>
  );
};

/* =========================
   APP
========================= */

export default function App() {
  const [progress, setProgress] = useState(10);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <ProgressBar value={progress} />

      <View style={{ marginTop: 30 }}>
        <Button title="10%" onPress={() => setProgress(10)} />
        <Button title="50%" onPress={() => setProgress(50)} />
        <Button title="90%" onPress={() => setProgress(90)} />
        <Button title="100%" onPress={() => setProgress(100)} />
      </View>
    </SafeAreaView>
  );
}
