import React from 'react';
import styled from 'styled-components';
import SANS_FONT from '../utils/typography';
import { PRIMARY_DARK } from '../utils/colors';

const IntroWrapper = styled.div`
  max-width: 45em;
  margin-bottom: 1.5em;
  font-family: ${SANS_FONT};
  color: ${PRIMARY_DARK};

  > p {
    line-height: 1.4;
  }
`;

const Intro = () => (
  <IntroWrapper>
    <h1>Drag-and-Drop / Apollo / Graphql</h1>
    <p>
      Item creation uses Apollo's Optimistic UI to update the list immediately. Then drag and drop
      the items around! When you reload the items will be right where you left them.
    </p>
  </IntroWrapper>
);

export default Intro;
