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
      theme: "reduced.day",
      Geocode: ""
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

    this.onChangeGeocode = this.onChangeGeocode.bind(this);
  }

  componentDidMount() {
  }
  
/* 
  onChange(evt) {
    evt.preventDefault();

    var change = evt.target.id;
    console.log("selected " + change);
    this.setState({
      theme: change,
    });
  }
 */

 //Metodo que actualiza la direccion a partir del textbox del elemento Formplaces
  onChangeGeocode = (evt) => {
    evt.preventDefault();

    var direction = evt.target.value;

    this.setState({
      Geocode: direction,
    });
  }

  //Metodo que se ejecutar al clickar el boton de Formplaces y llama a la funcion para mostrar la direccion del elemento Map
  ongotoGeocode = () => {
    this.refs.map.showDirection(this.state.Geocode);
  }

  render() {
    return (
      <div id="App" className="App">
           <NavBar id="navbar"/>
        <Menu id="Menu" onStateChange={ this.isMenuOpen } noOverlay pageWrapId={ "page-wrap" } outerContainerId={"App"}>
          <FormPlaces changeGeocode={ this.onChangeGeocode } gotoGeocode={ this.ongotoGeocode }></FormPlaces>
        </Menu>
        <Map  ref="map"
                app_id="3aAoGPS0CJpmUF0Rp7AL"
                app_code="Du1FfeCrYxgPgGlPvO836g"
                lat="39.4697"
                lng="-0.3774"
                zoom="13"
                theme="normal.day"
                /* theme={this.state.theme} */
              />

{/*  <ThemeSelector changeTheme={ this.onChange } /> */}
     
      </div>
    );
  }
}

export default App;
