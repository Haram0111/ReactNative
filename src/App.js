import React from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import { theme } from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container></Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  alignItems: center;
  justifyContent: center;
`;
