import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Canvas, Group, Path, Skia } from '@shopify/react-native-skia';
import { interpolate } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  oceanBlue: "#17222D",
  concreteTurquoise: "#13404D",
  babyBlue: "#1DCDFE",
};

interface DeerManProps {
  width?: number;
  height?: number;
}

export const DeerMan: React.FC<DeerManProps> = ({
  width = SCREEN_WIDTH * 0.8,
  height = SCREEN_WIDTH * 1.2,
}) => {
  const rotation = useSharedValue(0);
  const position = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Rotating animation
    rotation.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
        withTiming(15, { duration: 1000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    // Bouncing animation
    position.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 800, easing: Easing.inOut(Easing.sin) }),
        withTiming(-20, { duration: 800, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    // Breathing animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.95, { duration: 1500, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: position.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  // Create deer path
  const createDeerPath = () => {
    const path = Skia.Path.Make();
    // Body
    path.moveTo(width * 0.5, height * 0.3);
    path.lineTo(width * 0.7, height * 0.5);
    path.lineTo(width * 0.5, height * 0.7);
    path.lineTo(width * 0.3, height * 0.5);
    path.close();
    
    // Head and antlers (simplified for this example)
    path.moveTo(width * 0.5, height * 0.3);
    path.lineTo(width * 0.45, height * 0.2);
    path.lineTo(width * 0.4, height * 0.1);
    path.moveTo(width * 0.5, height * 0.3);
    path.lineTo(width * 0.55, height * 0.2);
    path.lineTo(width * 0.6, height * 0.1);
    
    return path;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.deerContainer, animatedStyle]}>
        <Canvas style={{ width, height }}>
          <Group>
            {/* Main body */}
            <Group
              color={COLORS.babyBlue}
              style="stroke"
              strokeWidth={2}>
              <Path path={createDeerPath()} />
            </Group>
            
            {/* Shadow overlay */}
            <Group
              color={COLORS.oceanBlue}
              style="fill"
              opacity={0.3}>
              <Path path={createDeerPath()} />
            </Group>
          </Group>
        </Canvas>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  deerContainer: {
    width: SCREEN_WIDTH * 0.8,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeerMan;