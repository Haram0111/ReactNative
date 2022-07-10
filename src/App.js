import React from 'react';
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme';
import Input from './src/components/input';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar style="auto" />
        <Title>TODO List</Title>
        <Input />
      </Container>
    </ThemeProvider>
  );
}
