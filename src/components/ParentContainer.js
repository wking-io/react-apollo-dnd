import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import CreateCard from './CreateCard';
import CardContainer from './CardContainer';

const ParentContainer = ({ cards: { error, loading, allCards } }) => {
  if (loading) return <div>loading...</div>;
  if (error) return <ErrorMessage message="Error loading cards." />;

  return (
    <section>
      <CreateCard count={allCards.length} />
      <CardContainer cards={allCards} />
    </section>
  );
};

ParentContainer.propTypes = {
  cards: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    allCards: PropTypes.array,
  }).isRequired,
};

export const ALL_CARDS = gql`
  query AllCards {
    allCards(orderBy: order_ASC) {
      id
      content
      name
    }
  }
`;

export default graphql(ALL_CARDS, { name: 'cards' })(ParentContainer);
