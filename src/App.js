import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import auth from './services/authService';
import { ToastContainer } from 'react-toastify';
import NavBar from "./components/navbar";
import Login from "./components/login";
import TopCarousel from "./components/carousel";
import { Row, Col } from "react-bootstrap";
import Cart from './components/cart';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Homepage from "./components/homepage";
import Register from './components/register';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/logout';

class App extends Component {
  state = {
    user:"",
    flowers: [
      {
        name: "Orange Rose",
        img_url: "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        price: "50",
        tag: "valentine"
      },
      {
        name: "Lily",
        img_url: "https://images.pexels.com/photos/85773/pexels-photo-85773.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        price: "150",
        tag: "valentine"
      },
      {
        name: "Rose",
        img_url: "https://i.pinimg.com/736x/11/2b/74/112b746a2182417b2a947d949798c968.jpg",
        price: "50",
        tag: "valentine"
      },
      {
        name: "Rose",
        img_url: "https://d1whpkioiz600t.cloudfront.net/Images/product/ph-100-rr.jpg",
        price: "50",
        tag: "valentine"
      }
    ],
    cartItems:[ {
      name: "Orange Rose",
      img_url: "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: "50",
      tag: "valentine"
    },
    {
      name: "Lily",
      img_url: "https://images.pexels.com/photos/85773/pexels-photo-85773.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: "150",
      tag: "valentine"
    }]
  };



  addToCart=(item)=>{

    if(this.state.user)
    {
      console.log("Added :",item);
      let oldCart=this.state.cartItems;
      let cartItems=[...oldCart,item];
      console.log("Cart: ",cartItems);
      this.setState({cartItems:cartItems});

    }
    else
    {
      window.location='/login'
    }
  }

  deleteFromCart=(item)=>{
    let oldCart=this.state.cartItems;
    let cartItems=oldCart.filter((i)=>i!==item)
    this.setState({cartItems:cartItems});
    console.log("New Cart: ", cartItems);
  }
  componentDidMount() {
    const user= auth.getCurrentUser();

    if(user)
    {
      console.log("currentuser:",user);
      console.log(user);
     this.setState({ user });

    }
    return;
  }




  render() {
    return (
      <div className="App div">
       <ToastContainer/>
        <NavBar cartItems={this.state.cartItems.length} user={this.state.user} ></NavBar>

        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route path="/cart" render={()=><Cart cartItems={this.state.cartItems} deleteFromCart={this.deleteFromCart}/>} />
            {/* <Route path="/logout" component={Logout} /> */}
            <Route
              path="/home"
              render={() => <Homepage flowers={this.state.flowers} addToCart={this.addToCart} />}
            />
            <Redirect from="/" exact to="/home" />

           
            {/* <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" /> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
