import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ThemeGenerator } from "./ThemeGenerator";

const customTheme = extendTheme({
  styles: {
    global: {
      "*, *:before, *:after": {
        backgroundColor: "inherit",
        fontFamily: 'inherit',
      },
      body: {
        display: 'flex',
        flexDir: 'column',
        alignItems: 'stretch',
        overflow: 'auto',
        height: '100vh'
      }
    },
  },
});

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={customTheme}>
        <ThemeGenerator />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
