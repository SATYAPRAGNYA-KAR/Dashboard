import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import {
  stackedCustomSeries,
  stackedPrimaryXAxis,
  stackedPrimaryYAxis,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

const Stacked = ({ width, height }) => {
  const { currentMode } = useStateContext();

  return (
    <ChartComponent
      width={width}
      height={height}
      id="charts"
      //The tooltip wasn't working as how we had defined our demo data, the id should be charts and not stack chart
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      //If the above two lines are commented out, then the chart doesn't appear most probably because X and Y axes can't be decided on its own
      chartArea={{ border: { width: 0 } }}
      //With just one line here, we remove the border
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      {/* Services basically contains things we want to have in our Chart */}
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
        {/* We spread all the data from dummy data file using the ...item */}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
