import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import { ALL_CARDS } from './ParentContainer';
import CreateCardForm from './CreateCardForm';

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      yourName: '',
    };
  }

  emptyState = {
    content: '',
    yourName: '',
  };

  clearForm = () => {
    this.setState(() => this.emptyState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { createCard, count } = this.props;
    const { content, yourName } = this.state;
    createCard(content, yourName, count);
    this.clearForm();
  };

  updateValue = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  render() {
    return (
      <CreateCardForm
        onSubmit={this.handleSubmit}
        updateValue={this.updateValue}
        values={this.state}
      />
    );
  }
}

CreateCard.propTypes = {
  createCard: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

const CREATE_CARD = gql`
  mutation CreateCard($content: String!, $name: String!, $order: Int!) {
    createCard(content: $content, name: $name, order: $order) {
      id
      content
      name
      order
    }
  }
`;

export default graphql(CREATE_CARD, {
  props: ({ mutate }) => ({
    createCard: (content, name, order) =>
      mutate({
        variables: { content, name, order },
        optimisticResponse: {
          __typename: 'Mutation',
          createCard: {
            id: 'abc123',
            __typename: 'Card',
            content,
            name,
            order,
          },
        },
        update: (store, { data: { createCard } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: ALL_CARDS });
          // Add our comment from the mutation to the end.
          data.allCards.push(createCard);
          // Write our data back to the cache.
          store.writeQuery({ query: ALL_CARDS, data });
        },
      }),
  }),
})(CreateCard);
