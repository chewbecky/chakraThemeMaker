import sketch from "sketch";
import { SharedStyle } from "sketch/dom";
import { ChakraTheme } from "@chakra-ui/react";

export function generateChakraTheme() {
  const document = sketch.getSelectedDocument();
  const sharedTextStyles: SharedStyle[] = document.sharedTextStyles.length
    ? document.sharedTextStyles
    : [];

  const sharedLayerStyles: SharedStyle[] = document.sharedLayerStyles.length
    ? document.sharedTextStyles
    : [];

  const textStyles = sharedTextStyles.reduce((allTextStyles, textStyle) => {
    const {
      style: { fontSize, fontFamily, alignment, lineHeight, opacity, kerning },
    } = textStyle;

    allTextStyles[textStyle.name] = {
      fontSize: `${fontSize}px`,
      fontFamily,
      textAlign: alignment,
      lineHeight: lineHeight ? `${lineHeight}px` : "normal",
      opacity,
      letterSpacing: kerning ? `${kerning}px` : "normal",
    };

    return allTextStyles;
  }, {} as ChakraTheme["textStyles"]);

  const layerStyles = sharedLayerStyles.reduce((allLayerStyles, layerStyle) => {
    const {
      style: { opacity },
    } = layerStyle;

    allLayerStyles[layerStyle.name] = {
      opacity,
    };

    return allLayerStyles;
  }, {} as ChakraTheme["layerStyles"]);

  return {
    textStyles,
    layerStyles,
  };
}
