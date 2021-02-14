import { useCommunication } from "./useCommunication";
import { ChakraTheme } from "@chakra-ui/react";

export function useGenerateTheme() {
  return useCommunication<ChakraTheme>("generate-theme");
}
