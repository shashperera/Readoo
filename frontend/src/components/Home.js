import React, { Component } from "react";
import axios from "axios";
import BeautyStars from 'beauty-stars';
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CardActionArea from '@material-ui/core/CardActionArea';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLayout: 'k-card-list',
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        image: "",
        content_rating: "",
        readability_rating: "",
        comprehensibility_rating: "",
        update_at: "",
        completed: false
      },
      reviewsList: []
    };
  }

  handleOnChange = (e) => {
    this.setState({
      currentLayout: e.target.value
    })
  }


  useStyles = makeStyles({
    root: {
      maxWidth: 20,
    },
  })

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

    function rand() {
      return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
      const top = 50 + rand();
      const left = 50 + rand();

      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
      };
    };


    return newItems.map(item => (

      <Card className={this.useStyles.root} key={item.id} style={{ width: 300, marginLeft: "40px", marginRight: "40px" }}>
        <li key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`reviews-title mr-2 ${this.state.viewCompleted ? "completed-reviews" : ""
              }`}
            title={item.description}
          >

          </span>

        </li>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="image"
            height="100"
            width="100"
            image={item.image}

          />
          <CardContent>

            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}

            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">

            <Link class="nav-link" to="/add">
              Reviews
          </Link>
          </Button>
          <BeautyStars className="content_rating" size="10"
            value={item.content_rating} />

        </CardActions>
        <CardActions>
          <p>
            <small>Modified - {item.update_at}</small></p>

        </CardActions>
      </Card>


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
      <div className="home" >
        <h1 className="text-white text-uppercase text-center my-4"></h1>

        <div className="col-md-10 col-sm-10 mx-auto p-0">

          <div className="card p-5">

            <div className={this.state.currentLayout}>

              <MDBContainer>
                {this.renderTabList()}

                <MDBRow> {this.renderItems()}


                  <MDBCol md="4" class="mb-2">

                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          </div>
        </div>
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
export default Home;