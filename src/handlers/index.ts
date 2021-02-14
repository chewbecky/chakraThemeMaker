import { generateChakraTheme } from "./generate-chakra-theme";

export const handlers = {
  "generate-theme": generateChakraTheme,
};

export type HandlerName = keyof typeof handlers;
