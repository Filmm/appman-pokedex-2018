import React, { Component } from 'react';
import { Button, Header, Icon, Input, Image, Modal, Segment } from 'semantic-ui-react';
import CardComponent from './CardComponent';
import search from '../search.png';

export default class AddItemModal extends Component {
  state = {
    openModal: false,
    searchValue: ''
  }

  handleOpenModal = () => {
    this.setState({ openModal : true });
  }

  handleCloseModal = () => {
    this.setState({ openModal : false, searchValue: '' });
  }

  handleSearch = (e) => {
    this.setState({
      searchValue: e.target.value
    }, () => console.log(this.state.searchValue))
  }

  render(){
    const { openModal, searchValue } = this.state;
    let userList;

    if(searchValue === ''){
      userList = this.props.user;
    }else {
      userList = this.props.user.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())
      || item.type.toLowerCase().includes(searchValue.toLowerCase()));
    }

    return (
      <Modal
        className="modal-display"
        onClose={this.handleCloseModal}
        onOpen={this.handleOpenModal}
        open={openModal}
        trigger={
        <Segment basic className="addItem-btn">
          <Icon name="add" circular className="icon-add"/>
        </Segment>
        }
      >
        <Modal.Header>
          <div className="input-withImage">
            <Input
              className="input-search"
              fluid
              placeholder='Find pokemon'
              onChange={this.handleSearch}
              value={searchValue}
              size="mini"
            />
            <Image src={search} size="mini"/>
          </div>
        </Modal.Header>

        <Modal.Content scrolling>
          {
          userList.length > 0 ?
            userList.map((item, index) =>
            <CardComponent item={item} key={index} handleAddItem={this.props.handleAddItem}/>) :
            <Segment textAlign="center" basic>
              <Icon  name="inbox" size="big" color='grey'/>
              <Header as="h5" textAlign="center" color="grey"> No data </Header>
            </Segment>
          }
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={this.handleCloseModal}> Close </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
