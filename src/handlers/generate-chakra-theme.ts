import sketch from "sketch";
import { SharedStyle } from "sketch/dom";
import { ChakraTheme } from "@chakra-ui/react";

function createTextStyles() {
  const document = sketch.getSelectedDocument();
  const sharedTextStyles: SharedStyle[] = document.sharedTextStyles.length
    ? document.sharedTextStyles
    : [];

  const textStyles: ChakraTheme["textStyles"] = {};

  sharedTextStyles.forEach((textStyle) => {
    textStyles[textStyle.name] = (({
      fontSize,
      fontFamily,
      alignment,
      lineHeight,
      opacity,
      kerning,
    }) => {
      return {
        fontSize: fontSize + "px",
        fontFamily: fontFamily,
        textAlign: alignment,
        lineHeight: lineHeight ? lineHeight + "px" : "normal",
        opacity: opacity,
        letterSpacing: kerning ? kerning + "px" : "normal",
      };
    })(textStyle.style);
  });

  return textStyles;
}

function createLayerStyles() {
  const document = sketch.getSelectedDocument();
  const sharedLayerStyles: SharedStyle[] = document.sharedLayerStyles.length
    ? document.sharedLayerStyles
    : [];

  const layerStyles: ChakraTheme["layerStyles"] = {};

  // todo: Add gradient support and support for innerShadows and more than one shadow

  sharedLayerStyles.forEach((layerStyle) => {
    layerStyles[layerStyle.name] = (({
      opacity,
      borders,
      borderOptions,
      blur,
      fills,
      shadows,
    }) => {
      return {
        opacity: opacity,
        borderColor: borders.length > 0 ? borders[0].color : "none",
        borderStyle: borderOptions.dashPattern.length > 0 ? "solid" : "dashed",
        borderWidth: borders.length > 0 ? `${borders[0].thickness}px` : "none",
        filter: blur ? `blur(${blur.radius}px)` : "none",
        backgroundColor: fills.length > 0 ? fills[0].color : "none",
        boxShadow:
          shadows.length > 0
            ? `${shadows[0].x}px ${shadows[0].x}px ${shadows[0].blur}px ${shadows[0].spread}px ${shadows[0].color}`
            : "none",
      };
    })(layerStyle.style);
  });

  return layerStyles;
}

export function generateChakraTheme() {
  return {
    textStyles: createTextStyles(),
    layerStyles: createLayerStyles(),
  };
}
