import * as React from "react";
import {
  Box,
  Button,
  Code,
  Flex,
  HStack,
  useClipboard,
} from "@chakra-ui/react";
import { useGenerateTheme } from "../hooks/useGenerateTheme";

export type ThemeGeneratorProps = {};

export const ThemeGenerator: React.FC<ThemeGeneratorProps> = () => {
  const { data, mutate, isLoading } = useGenerateTheme();
  const content = JSON.stringify(data, null, 2);
  const { onCopy, hasCopied } = useClipboard(content);

  return (
    <HStack align="flex-start">
      <Flex flex="1" flexDir="column" justify="center">
        <Box p="8">
          <Button onClick={() => mutate()} isLoading={isLoading}>
            Create Chakra UI Theme
          </Button>
        </Box>
      </Flex>
      <Box pos="relative" flex="1">
        <Code
          as="pre"
          whiteSpace="pre-wrap"
          h="100vh"
          w="full"
          overflow="auto"
        >
          {content}
        </Code>
        {content && (
          <Button onClick={onCopy} pos="absolute" top="0" right="0" m="2">
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        )}
      </Box>
    </HStack>
  );
};
