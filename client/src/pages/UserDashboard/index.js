import React, { useEffect } from "react";
import "../styles/style.css"
import { Header, Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
// import the core library.
import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import { RadarChart } from "echarts/charts";
// import components, all suffixed with Component
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";
import { useState } from "react";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  RadarChart,
  CanvasRenderer,
]);

// The usage of ReactEChartsCore are same with above.

export const UserDashboard = () => {
  // access to the currentUser property from the auth reducer state
  const [genres, setGenres] = useState([]);
  const [userPrefs, setUserPrefs] = useState(null);
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
  const currentUser = useSelector(state=>state.auth.currentUser);
  const token = useSelector(state=>state.auth.token);

  const apiBaseURL = 'http://localhost:3001';

  // fetch the user's genre preferences
  useEffect(()=>{

    const url = `${apiBaseURL}/movies/stats`; // saving movie url
    
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(async response=>{
      if(response.ok) {
        let json = await response.json()
        setGenres(Object.keys(json));
        setUserPrefs(json);
      } else {
        setUserPrefs(null);
        setGenres([]);
        console.error(`could not get user preferences: ${response.statusText} - ${response.statusText}`);
      }
    })
    .catch (err=>{
      setUserPrefs(null);
      setGenres([]);
      console.error(`could not get user preferences: caught error`, err);
    })
  }, []);

  const indicators = (pref) => [
    { name: "Action", max: 10 },
    { name: "Animation", max: 10 },
    { name: "Comedy", max: 10 },
    { name: "Romance", max: 10 },
    { name: "Thriller", max: 10 },
    { name: "Adventure", max: 10 },
    { name: "Documentary", max: 10 },
  ];

  const data = (pref) => [
    {
      value: [5.6, 6, 2, 3, 8, 3, 0],
      name: "User",
    },
  ];

  return (
    <>
      <Message className="message-container" size="huge" secondary="true">
        <Header size="huge"> User Dashboard </Header>
        <p>This is a Protected Route</p>
        <p>Welcome {currentUser ? currentUser.email : ""}</p>
      </Message>
      {(true)? 
        <div className="radarChart">
          <ReactEChartsCore
            echarts={echarts}
            option={{
              title: {
                text: "",
              },
              legend: {
                data: [
                  "",
                  "",
                ],
              },
              radar: {
                // shape: 'circle',
                indicator: indicators(userPrefs),
              },
              series: [
                {
                  name: "test",
                  type: "radar",
                  data: data(userPrefs),
                },
              ],
            }}
            notMerge={true}
            lazyUpdate={true}
          />
        </div>
      : 
            <h1>loading ...</h1>
      }
    </>
  );
};

export default UserDashboard;
