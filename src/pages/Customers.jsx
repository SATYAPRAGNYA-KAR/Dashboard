import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        allowSorting
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        width="auto"
      >
        {/* Only by writing allowPaging, we restrict the no. of items visibke at one time and divide it into multiple pages */}
        {/* Just by writing allowSorting simply, we can sort all the column data easily */}
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
        {/* We can now edit the fields in the Grid but upon refreshing the data goes back to normal as no Crud functionality yet; mixing Syncfusion components with MERN like application would be great */}
      </GridComponent>
    </div>
  );
};

export default Customers;
