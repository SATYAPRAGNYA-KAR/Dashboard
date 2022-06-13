import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components"; //Due to the index.js file in ./components folder, we can import all the required components in only one line
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  Line,
} from "./pages";
import { useStateContext } from "./contexts/ContextProvider";

import "./App.css";

const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
    setCurrentColor,
    setCurrentMode,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  //React Hook useEffect has missing dependencies: 'setCurrentColor' and 'setCurrentMode'. Either include them or remove the dependency array
  //This error was showing, so Dependency Array was removed
  //Not removed it as it might cause some problems afterwards

  return (
    /*<h1 className="underline text-3xl">App</h1>; Just to see that Tailwind is connected or not; we see it's actually connected as the Underline gets applied to the Heading here;*/
    <div className={currentMode === "Dark" ? "dark" : ""}>
      {/* Here we just say that if the currentMode is Dark, then the whole styling, etc. must follow the dark: portion of code given in the classnames */}
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                // Even if there is a curly brace around currentColor in every other place, here there's no curly brace around it, else the settings icon will disappear
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? ( //This activeMenu variable would come from our contexts folder
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div> //This w-? means the width is set to something
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            // className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
            //   activeMenu ? "md:ml-72" : "flex-2"
            // }`} To reduce the repeatitive lines of code, we can simply make a template string and replace it with the repeatitive lines of code in it
            //Refer to documentation given in Tailwind website to look for styles that you don't understand; Like w-full means the entire width of the div would be covered
            //Or even Tailwind CSS Intellisense extension in VS Code itself can help
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md-static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              {/* This means that the Theme settings sidebar is only shown if the themeSettings variable is true */}

              <Routes>
                {/* Ctrl+/ gives a comment section directly */}
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                {/*The element can be imported from pages section ofc but here for testing we just put a string in it*/}
                <Route path="/ecommerce" element={<Ecommerce />} />
                {/* Pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                {/* Just because the path was given as /calender instead of /calendar, the entire Calendar wasn't rendering; Becoz it was already written as /calendar in links portion of imported data */}
                <Route path="/color-picker" element={<ColorPicker />} />
                {/* Charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
                {/* Quickest way to change multiple lines of code at once is to press Alt and holding onto Alt click on the required places */}
                {/* Start by clicking at the beginning of each tag and then with Ctrl+Right arrow, we move to the end of the tag */}
                {/* To open a component's file directly from here, just hold Ctrl key and Left click on the required component */}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
//Our contexts folder will have the Context APIs, pages and components folder may have been similar but each page may have different number of components in them, and the data folder will have different images, etc. in it
//Use Alt+Shift+F to find for a word in a complete particular directory or go to the Search Editor directly i.e. the Magnifying glass option just below Explorer
