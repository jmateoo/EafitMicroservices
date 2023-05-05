import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { icon } from "leaflet"

const ICON = icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
})

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

class MapMarkers extends Component {

  render() {
    const markers = this.props.items.map((item, index) => {
      return (
        <Marker key={index} icon={ICON} position={[item.lat, item.long]}>
          <Popup>
            <p>Model: {item.model}</p>
            <p>Color: {item.color}</p>
            <p>Location: {item.lat}, {item.long}</p>
          </Popup>
        </Marker>
        )
      })

    return (
      <div className='map' id='map'>
        <MapContainer center={this.props.averageLocation} zoom={5} scrollWheelZoom={true}>
          <ChangeView center={this.props.averageLocation} zoom={5} /> 
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
        </MapContainer>
      </div>
    )
  }
}

export default MapMarkers;


// import React  from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// export function Map() {
//   const position = [52.51, 13.38]

//   return (
//     <section className='map-component' >
//       <div className='map'>
//       <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//           // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
//         />
//         <Marker position={position}>
//         </Marker>
//       </MapContainer>
//       {/* --- ---------------------------- --- */}
//       </div>
//     </section>
//   )
// }

// export default Map;