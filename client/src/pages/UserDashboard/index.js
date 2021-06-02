import React from "react";
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
  DatasetComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

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
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <>
      <Message className="message-container" size="huge" secondary="true">
        <Header size="huge"> User Dashboard </Header>
        <p>This is a Protected Route</p>
        <p>Welcome {user ? user.email : ""}</p>
      </Message>
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
            indicator: [
              { name: "Action", max: 10 },
              { name: "Animation", max: 10 },
              { name: "Comedy", max: 10 },
              { name: "Romance", max: 10 },
              { name: "Thriller", max: 10 },
              { name: "Adventure", max: 10 },
              { name: "Documentary", max: 10 },
            ],
          },
          series: [
            {
              name: "test",
              type: "radar",
              data: [
                {
                  value: [5.6, 6, 2, 3, 8, 3, 7],
                  name: "User",
                },
              ],
            },
          ],
        }}
        notMerge={true}
        lazyUpdate={true}
      />
      </div>
    </>
  );
};

export default UserDashboard;
