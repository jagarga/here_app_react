import React, { Component } from "react";
import "./Map.css";

class Map extends Component {
  constructor(props) {
    super(props);

    this.platform = null;
    this.map = null;
    this.ui= null;

    this.state = {
      app_id: props.app_id,
      app_code: props.app_code,
      center: {
        lat: props.lat,
        lng: props.lng
      },
      zoom: props.zoom,
      map: null,
      theme: props.theme,
      style: props.style,
      margin: "0px"
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.addLocationsToMap = this.addLocationsToMap.bind(this);
  }

  getPlatform() {
    return new window.H.service.Platform(this.state);
  }

  getMap(container, layers, settings) {
    return new window.H.Map(container, layers, settings);
  }

  getEvents(map) {
    return new window.H.mapevents.MapEvents(map);
  }

  getBehavior(events) {
    return new window.H.mapevents.Behavior(events);
  }

  getUI(map, layers) {
    var ui = window.H.ui.UI.createDefault(map, layers);
    return ui;
    //return new window.H.ui.UI.createDefault(map, layers);
  }

  componentDidMount() {
    this.platform = this.getPlatform();

    var layers = this.platform.createDefaultLayers();
    var element = document.getElementById("here-map");
    this.map = this.getMap(element, layers.normal.map, {
      center: this.state.center,
      zoom: this.state.zoom
    });

    var events = this.getEvents(this.map);
    // eslint-disable-next-line
    var behavior = this.getBehavior(events);
    // eslint-disable-next-line
    this.ui= this.getUI(this.map, layers);
    //Managing the Position of UI Controls
    var zoom = this.ui.getControl("zoom");
    zoom.setAlignment("top-right");
  }

  shouldComponentUpdate(props, state) {
    /*      this.changeTheme(props.theme, props.style);
        return false; */
  }

  /*     changeTheme(theme, style) {
        var tiles = this.platform.getMapTileService({'type': 'base'});
        var layer = tiles.createTileLayer(
            'maptile', 
            theme,
            256,
            'png',
            {'style': 'default'}
        );
        this.map.setBaseLayer(layer);
    } */

    //Metodo que recoje la dirección introducida por el usuario hace una peticion al api geocode y devuelve los datos
  showDirection(direction) {
    //alert(direction);
    this.platform = this.getPlatform();
    var geocoder = this.platform.getGeocodingService(),
      geocodingParameters = {
        searchText: direction,
        jsonattributes: 1
      };

    geocoder.geocode(geocodingParameters, this.onSuccess, this.onError);
  }

  onSuccess(result) {
    var locations = result.response.view[0].result;
    this.addLocationsToMap(locations);
  }

  onError(error) {
    alert("Ha habido algun problema con el servicio de Geocodes");
  }

  //Añade las localizaciones buscadas al mapa
  addLocationsToMap(locations) {
    var group = new window.H.map.Group(),
      position,
      i;

    // Add a marker for each location found, Ponemos 1 en lugar de "locations.length" para evitar duplicidades en al direccion
    for (i = 0; i < 1; i += 1) {
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };
      this.marker = new window.H.map.Marker(position);
      this.marker.label = locations[i].location.address.label;
      group.addObject(this.marker);
    }
    
    // Add the locations group to the map
    this.map.addObject(group);

    group.addEventListener('tap', (evt) => {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        var bubble =  new window.H.ui.InfoBubble(evt.target.getPosition(), {
          // read custom data
          content: evt.target.label
        });
        // show info bubble
        this.ui.addBubble(bubble);
      }, false);

    this.map.setCenter(group.getBounds().getCenter());
    this.map.setZoom(16);
  }

  render() {
    return (
      //He puesto padding top para que el mapa no se quede debajo del navbar
      <div
        className="here-map"
        id="here-map"
        func={this.handleClick}
        style={{
          position: "absolute",
          paddingTop: "55px",
          bottom: 0,
          width: "100%",
          height: "100vh",
          background: "grey",
          marginLeft: this.state.margin
        }}
      />
    );
  }
}

export default Map;
