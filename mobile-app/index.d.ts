declare module '*.jpg';
declare module '*.png';
declare module 'react-native-remote-svg';
declare module 'react-native-reanimated-carousel';

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
