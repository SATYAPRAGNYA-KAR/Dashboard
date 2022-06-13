import React from "react";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";

import { Header } from "../components";

const change = (args) => {
  document.getElementById("preview").style.backgroundColor =
    args.currentValue.hex;
  //The id of the Pen component is preview only and so used here
};

const CustomColorPicker = ({ id, mode }) => (
  <ColorPickerComponent
    id={id}
    mode={mode}
    modeSwitcher={false}
    inline
    showButtons={false}
    change={change}
  />
);

const ColorPicker = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Color Picker" />
      <div className="text-center">
        <div id="preview" />
        {/* This Preview is for the Pen that is showing on the top portion */}
        <div className="flex justify-center items-center gap-20 flex-wrap">
          <div>
            <p className="text-2xl font-semibold mt-2 mb-4">Inline Palette</p>
            <CustomColorPicker
              id="inline-palette"
              mode="Palette"
              modeSwitcher={false}
              //modeSwitcher is set to false because we wanna determine the mode ourselves and not automatcally
              inline
              showButtons={false}
              change={change}
            />
          </div>
          <div>
            <p className="text-2xl font-semibold mt-2 mb-4">Inline Picker</p>
            <CustomColorPicker
              id="inline-palette"
              mode="Picker"
              modeSwitcher={false}
              //modeSwitcher is set to false because we wanna determine the mode ourselves and not automatcally
              inline
              showButtons={false}
              change={change}
            />
            {/* The output of the color picker can be used anywhere, like here we just use it to change the color of the Pen showing above */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
