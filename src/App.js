import React, { Component } from "react";
import "./App.css";
import Map from "./Mapas/Map.js";
import FormPlaces from "./Formularios/FormPlaces/FormPlaces";
import NavBar from "./NavBar//NavBar";
/* import ThemeSelector from "./ThemeSelector.js"; */
import { slide as Menu } from "react-burger-menu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "reduced.day"
    };

    //funcion para aplicar margen al mapa y cambiar el width del mapa dependiendo de si el menu esta abierto o cerrado
    this.isMenuOpen = function(state) {

        var menuWidth = (document.getElementById('Menu').style.width).slice(0, -2);
        var screenWidth = window.screen.width;
        var menuWidthPercentage = (( screenWidth - menuWidth ) / screenWidth)*100 ;
        document.getElementById('here-map').style.transition = "all 0.5s";

        if(state.isOpen){
            document.getElementById('here-map').style.marginLeft = document.getElementById('Menu').style.width;
            document.getElementById('here-map').style.width = menuWidthPercentage + '%';
        }else{
            document.getElementById('here-map').style.marginLeft = '0px';
            document.getElementById('here-map').style.width = '100%';
        }
      };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }
  

  onChange(evt) {
    evt.preventDefault();

    var change = evt.target.id;
    console.log("selected " + change);
    this.setState({
      theme: change,
    });
  }

  render() {
    return (
      <div id="App" className="App">
           <NavBar id="navbar"/>
        <Menu id="Menu" onStateChange={ this.isMenuOpen } noOverlay pageWrapId={ "page-wrap" } outerContainerId={"App"}>
          <FormPlaces></FormPlaces>
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
        </Menu>
        <Map
                app_id="3aAoGPS0CJpmUF0Rp7AL"
                app_code="Du1FfeCrYxgPgGlPvO836g"
                lat="39.4697"
                lng="-0.3774"
                zoom="13"
                theme={this.state.theme}
              />

     
      </div>
    );
  }
}

export default App;
