import React from 'react';
import styled from 'styled-components';
import Intro from './components/Intro';
import ParentContainer from './components/ParentContainer';

const ContentWrapper = styled.section`
  width: 85vw;
  margin: 6em auto;
`;

const App = () => (
  <ContentWrapper>
    <Intro />
    <ParentContainer />
  </ContentWrapper>
);

export default App;
