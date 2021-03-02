import React, { Component } from 'react';
import { Icon, Grid, Header, Segment } from 'semantic-ui-react';
import AddItemModal from './AddItemModal';
import CardComponent from "./CardComponent";

class HomePageComponent extends Component {
  state = {
    itemList: [],
    user: []
  }

  componentDidMount(){
  fetch('http://localhost:3030/api/cards')
  .then((response) => response.json())
  .then((data) => this.setState({user: data.cards}, () => console.log(data.cards, this.state.user)));
  }

  handleAddItem = (id) => {
    this.setState((prevState)=> ({
      itemList: [...prevState.itemList, id],
      user: this.state.user.filter((i) => i !== id)
    }))
  }

  handleRemoveItem = (id) => {
    this.setState((prevState)=> ({
      itemList: this.state.itemList.filter((i) => i !== id),
      user: [...prevState.user, id]
    }))
  }

  render() {
    return (
      <>
        <Header className="homepage-header">My Pokedex</Header>
        <Segment basic className="segment-scroll">
        <Grid doubling columns={2}>
          {this.state.itemList.map((item, index) =>
            <Grid.Column key={index}>
              <CardComponent item={item} index={index} pokemonList={true} handleRemoveItem={this.handleRemoveItem}/>
            </Grid.Column>
          )}
        </Grid>
        </Segment>

        <AddItemModal user={this.state.user} handleAddItem={this.handleAddItem}/>
      </>
    )
  }
}

export default HomePageComponent
