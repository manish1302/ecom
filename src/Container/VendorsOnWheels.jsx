import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { isEmpty } from "lodash";
import vendorImg from "../Assets/vendorbg.png";
import { Input, Select, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import bellPepper from "../Assets/bell-pepper.png";
import brocolli from "../Assets/broccoli.png";
import cabbage from "../Assets/cabbage.png";
import carrot from "../Assets/carrot.png";
import potato from "../Assets/potato.png";
import pumpkin from "../Assets/pumpkin.png";
import spinach from "../Assets/spinach.png";

const CenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return null;
};

const veggies = [
  {
    name: "bell-pepper",
    logo: bellPepper,
  },
  {
    name: "spinach",
    logo: spinach,
  },
  {
    name: "potato",
    logo: potato,
  },
  {
    name: "cabbage",
    logo: cabbage,
  },
  {
    name: "carrot",
    logo: carrot,
  },
  {
    name: "brocolli",
    logo: brocolli,
  },
  {
    name: "pumpkin",
    logo: pumpkin,
  },
];

const VendorsOnWheels = () => {
  const [marker, setMarker] = useState({});
  const [currentPosition, setCurrentPosition] = useState([12.999, 80.2106]);
  //   {
  //     geocode: [13.0109, 80.2025], // Ekkattutangal
  //     popUp: "Hello, I am pop up for Ekkattutangal",
  //     customIcon: new Icon({
  //       iconUrl: "https://cdn-icons-png.flaticon.com/128/1048/1048361.png",
  //       iconSize: [38, 38],
  //     }),
  //   },
  //   {
  //     geocode: [13.0067, 80.2206], // Guindy
  //     popUp: "Hello, I am pop up for Guindy",
  //     customIcon: new Icon({
  //       iconUrl: "https://cdn-icons-png.flaticon.com/128/1048/1048313.png",
  //       iconSize: [38, 38],
  //     }),
  //   },
  //   {
  //     geocode: [12.9863, 80.2002], // Adambakkam
  //     popUp: "Hello, I am pop up for Adambakkam",
  //     customIcon: new Icon({
  //       iconUrl: "https://cdn-icons-png.flaticon.com/128/1048/1048320.png",
  //       iconSize: [38, 38],
  //     }),
  //   },
  // ];

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const success = (position) => {
    let locationCoords = [];
    locationCoords.push(position.coords.latitude);
    locationCoords.push(position.coords.longitude);
    setCurrentPosition(locationCoords);
    const markerObject = {
      geocode: locationCoords,
      popUp: "Hello, I am here",
      customIcon: new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/11088/11088020.png",
        iconSize: [18, 18],
      }),
    };
    setMarker(markerObject);
  };

  const error = () => {
    alert(
      "This browser does not support location based features. Change the browser to continue."
    );
  };

  if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(success, error);
    navigator.geolocation.watchPosition(success, error);
  }

  const options = [
    {
      value: "Chennai",
      label: "Chennai",
    },
    {
      value: "Hyderabad",
      label: "Hyderabad",
    },
    {
      value: "bangalore",
      label: "bangalore",
    },
  ];

  const websocket = new WebSocket("wss://localhost:7272/ws");

  useEffect(() => {
    websocket.onopen = () => {
      console.log("connection is open");
    };

    websocket.onmessage = (event) => {
      console.log(event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    websocket.onclose = () => {
      console.log("connection is closed");
    };

    setWs(websocket)
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && message.trim() !== "") {
      ws.send(message);
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div className="Home">
      <div className="App" style={{ margin: "50px" }}>
        <h1>Simple Chat App</h1>

        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            height: "300px",
            overflowY: "scroll",
          }}
        >
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          style={{ width: "80%", marginRight: "10px" }}
        />
        <button onClick={sendMessage} style={{ width: "15%" }}>
          Send
        </button>
      </div>
      <div className="w-100 wheels-header mb-3 d-flex">
        <div className="w-50 d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex justify-content-center flex-column">
            <div className="wheels-main-text mb-2">
              Fruits and Veggies, <br />
              Vendors on wheels.
            </div>
            <div className="wheels-subheading mb-3">
              We deliver fresh and organic, <br />
              fruits and veggies
            </div>
            <div className="d-flex">
              <Space direction="vertical" size="middle">
                <Space.Compact>
                  <Select
                    style={{
                      width: "180px", // Adjust width
                      height: "40px", // Adjust height
                      lineHeight: "40px", // Ensure vertical alignment of text
                    }}
                    defaultValue="Chennai"
                    options={options}
                  />
                  <Input defaultValue="Ekkattutangal, 4th Cross street" />
                </Space.Compact>
              </Space>
              <button className="wheels-city-button">Search</button>
            </div>
          </div>
        </div>
        <div className="w-50 text-end">
          <img src={vendorImg} alt="vendor" />
        </div>
      </div>
      <hr />
      <div className="w-100 d-flex justify-content-between mb-3">
        {veggies.map((item) => {
          return (
            <div className="d-flex align-items-center justify-content-center flex-column veggie-blocks">
              <img
                height={"40px"}
                width={"40px"}
                src={item.logo}
                alt={item.name}
              />
              <div>{item.name}</div>
            </div>
          );
        })}
      </div>
      <MapContainer center={[12.999, 80.2106]} zoom={20}>
        <TileLayer
          attribution='&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contribution'
          url="https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=HozduPqIM4X9amXzzMTcCjobMuUUslbjOzjuAAhWFnIH3XYcZPXDw00NKRHfc8Iv"
        />
        <CenterMap position={currentPosition} />
        {!isEmpty(marker) && (
          <Marker position={marker?.geocode} icon={marker?.customIcon}>
            <Popup>Hi</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default VendorsOnWheels;
