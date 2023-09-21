import { Animated, Dimensions, View } from "react-native";
import React, { useRef, useState } from "react";

import { PanGestureHandler } from "react-native-gesture-handler";
import colors from "../../../../themes/colors.theme";

export const LeftCursor = ({ setLeftCursorOffset, rightCursorOffset }) => {
  const { width: width } = Dimensions.get("window");
  const translateX = useRef(new Animated.Value(0)).current;
  const [offset, setOffset] = useState(0);
  const handleGesture = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    setOffset(offset + event.nativeEvent.translationX);
    translateX.setOffset(offset + event.nativeEvent.translationX);
    setLeftCursorOffset(offset + event.nativeEvent.translationX);
    translateX.setValue(0);
  };

  return (
    <View>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={{
            height: 40,
            width: 15,
            position: "relative",
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [0, rightCursorOffset],
                  outputRange: [0, rightCursorOffset], // MARGIN + right cursors width: ;
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <View
            style={{ flex: 1, backgroundColor: colors.gray, borderRadius: 10 }}
          ></View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};