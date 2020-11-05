import React, { Component } from "react";
import axios from "axios";
import Modal from './Modal';
import BeautyStars from 'beauty-stars';
import IconButton from '@material/react-icon-button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap';

import {
  FormGroup,
  Input,
  Label
} from "reactstrap";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        image: "",
        content_rating: "",
        readability_rating: "",
        comprehensibility_rating: "",
        completed: false
      },
      reviewsList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/reviews/")
      .then(res => this.setState({ reviewsList: res.data }))
      .catch(err => console.log(err));
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.reviewsList.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`reviews-title mr-2 ${this.state.viewCompleted ? "completed-reviews" : ""
            }`}
          title={item.description}
        >
          {item.title}

        </span>
        <span>
          <img src={item.image} alt={item.title} height="80" width="50" />

        </span>

        <span>
          Content
          <BeautyStars className="content_rating" size="20"
            value={item.content_rating} />
          Redability
           <BeautyStars className="readability_rating" size="20"
            value={item.readability_rating} />
          Comprehensibility
           <BeautyStars className="comprehensibility_rating" size="20"
            value={item.comprehensibility_rating} />
        </span>
        <span>

          <IconButton onClick={() => this.editItem(item)}>  <CreateOutlinedIcon />
          </IconButton> <br></br> <br></br>
          <IconButton aria-label="delete" onClick={() => this.handleDelete(item)}>  <DeleteIcon />
          </IconButton>
          {/* <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup> */}

        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`/api/reviews/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("/api/reviews/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`/api/reviews/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <div className="add" id="add" >
        <h1 className="text-white text-uppercase text-center my-4"></h1>

        <div class="row">

          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div className="card p-5" >
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add reviews
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}

              </ul>
              <br></br>
            </div>
          </div>
        </div>
        <br></br>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        <br></br>

      </div>
    );
  }
}
export default Add;