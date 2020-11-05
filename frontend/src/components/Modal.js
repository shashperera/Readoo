import React, { Component } from "react";
import { FaStar } from 'react-icons/fa'
import { StarRatingInput, StarRating, css } from 'react-star-rating-input'
import BeautyStars from 'beauty-stars';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };
  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    console.log('You have selected:', this.state.selectedOption);
  };
  state = { value: 0 };




  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> reviews Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Book Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter book title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Comment</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter your comments"
              />
            </FormGroup>
         
            <FormGroup>
              <Label for="content_rating">Content rating</Label>

              <BeautyStars name="content_rating"
                value={this.state.content_rating} onChange={content_rating => this.setState({ content_rating })} />
            </FormGroup>
            <FormGroup>
              <Label for="readability_rating">Readability rating</Label>

              <BeautyStars name="readability_rating"
                value={this.state.readability_rating} onChange={readability_rating => this.setState({ readability_rating })} />
            </FormGroup>
            <FormGroup>
              <Label for="comprehensibility_rating">Comprehensibility rating</Label>

              <BeautyStars name="comprehensibility_rating"
                value={this.state.comprehensibility_rating} onChange={comprehensibility_rating => this.setState({ comprehensibility_rating })} />
            </FormGroup>
            <FormGroup></FormGroup>

            <FormGroup>
              <Label for="image">
                <Input
                  type="file"
                  name="image"
                  value={this.state.activeItem.image}
                  onChange={this.handleChange}
                  placeholder="Upload your image"
                />
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>


          </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}