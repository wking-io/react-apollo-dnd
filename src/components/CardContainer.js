import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { graphql, gql, compose } from 'react-apollo';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';

const style = {
  width: '100%',
};

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
    };
  }

  componentWillReceiveProps(nextProps) {
    const lastItem = a => a[a.length - 1];
    const lastPrev = lastItem(this.props.cards);
    const lastNext = lastItem(nextProps.cards);

    if (lastPrev.id !== lastNext.id) {
      this.setState(() => ({ cards: nextProps.cards }));
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    );
  };

  updateOrder = () => {
    const { cards } = this.state;
    const { updateCard } = this.props;
    cards.map((card, i) => updateCard(i, card.id));
  };

  render() {
    const { cards } = this.state;

    return (
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            content={card.content}
            yourName={card.name}
            moveCard={this.moveCard}
            updateOrder={this.updateOrder}
          />
        ))}
      </div>
    );
  }
}

CardContainer.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateCard: PropTypes.func.isRequired,
};
const UPDATE_CARD_ORDER = gql`
  mutation UpdateCardOrder($order: Int!, $id: ID!) {
    updateCard(order: $order, id: $id) {
      id
      order
    }
  }
`;

export default compose(
  graphql(UPDATE_CARD_ORDER, {
    props: ({ mutate }) => ({
      updateCard: (order, id) =>
        mutate({
          variables: { order, id },
        }),
    }),
  }),
  DragDropContext(HTML5Backend),
)(CardContainer);
