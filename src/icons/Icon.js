import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

function Icon() {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="70.667"
        height="65.333"
        version="1"
        viewBox="0 0 53 49"
      >
        <Path
          d="M380 363C252 318 156 202 143 75l-6-56 44 7c66 9 162 57 208 103 51 51 88 123 99 195l9 56h-36c-20-1-56-8-81-17z"
          transform="matrix(.1 0 0 -.1 0 49)"
        />
      </Svg>
    </View>
  );
}

export default Icon;
