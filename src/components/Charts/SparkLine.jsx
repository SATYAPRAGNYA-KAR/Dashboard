import React from "react";
import {
  SparklineComponent,
  Inject,
  SparklineTooltip,
} from "@syncfusion/ej2-react-charts";

const SparkLine = ({ id, height, width, color, data, type, currentColor }) => {
  return (
    <SparklineComponent
      id={id}
      height={height}
      width={width}
      lineWidth={1}
      valueType="Numeric"
      fill={color}
      border={{ color: currentColor, width: 2 }}
      dataSource={data}
      xName="x"
      yName="yval"
      //Changing the name of yName from yval to y makes the Sparkline chart disappear completely; maybe has to do something with the predefined yName
      type={type}
      markerSettings={{ visible: ["All"], size: 2.5, fill: currentColor }}
      tooltipSettings={{
        visible: true,
        format: "${x} : data ${yval}",
        //Some warning regarding the template string expression showing; but no idea how to fix it; But it's necessary as it gives extra info upon hovering over the graph
        trackLineSettings: {
          visible: true,
        },
      }}
    >
      <Inject services={[SparklineTooltip]} />
      {/* This SparklineTooltip inside the array would allow us to hover over all the points to see the data there */}
    </SparklineComponent>
  );
};

export default SparkLine;
//Excellent documentation of Syncfusion present with multiple examples demonstrating how to use a component
//One small bug is that if we resize the window, at some point, the app vanishes and that's bcoz we get to know from the Syncfusion documentation
//that for Sparkline, it's better to use Class based component and so the initial code is just tweaked a bit
