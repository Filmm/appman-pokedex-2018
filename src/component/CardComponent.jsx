import React, { Component } from 'react';
import { Image, Grid, Header, Segment } from 'semantic-ui-react';
import cute from '../cute.png';

class CardComponent extends Component {
  power = (header, item) => {
    return  (
    <Grid>
      <Grid.Row style={{paddingBottom: '0', paddingTop: '10px'}}>
        <Grid.Column width={this.props.pokemonList ? 5 :4}>
          <Header>{header}</Header>
        </Grid.Column>

        <Grid.Column width={11}>
          <div className="div--progress">
            <div className="progress" style={{ width: `${item > 100 ? 0 : item}%` }}></div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }

  render() {
    const { item, pokemonList } = this.props;
    const str = item.attacks && item.attacks.length * 50;
    const hp = item.hp;
    const weak = item.weakness * 100;
    const damage = item.attacks && item.attacks.map((i) => parseInt(i.damage));
    console.log('damage', damage);

    const num = [0,0,0];

    return (
      <>
      <Segment className="container-card">
        <Grid>
        <Grid.Row>

          <Grid.Column width={pokemonList ? 6 : 3}>
            <Image src={item.imageUrl}/>
          </Grid.Column>

          <Grid.Column width={pokemonList ? 8 : 10}>
            <Header className="headerCard-name">{item.name.toUpperCase()}</Header>
            {this.power('HP', hp)}
            {this.power('STR', str)}
            {this.power('WEAK', weak)}

            <Segment basic style={{paddingLeft: '0', paddingBottom:'0'}}>
              <Image.Group size='mini'>
                <Image src={cute} />
                <Image src={cute} />
              </Image.Group>
            </Segment>
          </Grid.Column>

        <Grid.Column width={pokemonList ? 1 : 2} floated={pokemonList ? null : "right"}>
          {this.props.pokemonList ?
          <Header
          className="icon-delete"
          onClick={() => this.props.handleRemoveItem(this.props.item)}
          >
            X
          </Header> :
          <Header
            textAlign="right"
            className="header--add"
            onClick={()=> this.props.handleAddItem(this.props.item)}
          >
            Add
          </Header>
          }
        </Grid.Column>
    </Grid.Row>

      </Grid>
    </Segment>
    </>
    )
  }
}

export default CardComponent
