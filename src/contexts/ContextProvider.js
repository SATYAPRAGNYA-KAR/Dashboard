import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  //Here we're initially setting the theme color as the given color and initial mode as Light mode
  const [themeSettings, setThemeSettings] = useState(false); //This would be a simple boolean variable i.e. a yes or no saying if the right side bar is currently open or close

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    //Along with setting the mode to the one chosen by the user, we need to access the local storage so that when the user comes the next time, the same mode is activated
    localStorage.setItem("themeMode", e.target.value);
    //setThemeSettings(false); This is done so that immdeiately after selecting a mode or color, the Theme Settings sidebar must be closed
  };
  //The same thing is repeated for the Color setting as was for the Mode setting
  const setColor = (color) => {
    //To see what's wrong here we do:
    //console.log(e.target);
    //And we get this as Undefined
    // setCurrentColor(e.target.value);---->Error due to this
    setCurrentColor(color);

    //Along with setting the mode to the one chosen by the user, we need to access the local storage so that when the user comes the next time, the same storage is activated
    localStorage.setItem("themeColor", color);
    // setThemeSettings(false);
  };
  //Well we debugged the error. Error was becoz we were getting a string i.e. the color's hexcode but here we're using it as an event and destructuring it to get the value as e.target.value which isn't necessary at all
  //But for mode we need to pass an event and not only a string as for color; so here e and e.target.value needs to be written; Finally our code is Error free now

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
    // Can't simply place clicked inside parenthesis as it's an object and not a string
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setCurrentColor,
        setCurrentMode,
        setColor,
        setMode,
        themeSettings,
        setThemeSettings,
        initialState,
      }}
    >
      {/* Actually in the value we should write like- activeMenu: activeMenu, but when the key and the value match, the key can be simply omitted */}
      {/* The ContextProvider always has to return a StateContext.Provider and all the values passed in it will be passed through all components of our entire application */}
      {/* Also the Provider always returns the children i.e. whatever the Provideer is wrapped around is returned  */}
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
// Here we have only one Context in this App but for bigger apps, we may have multiple contexts
//To debug any error in functions, go to Console and first erase all the data in the console; Then press on the component or whatever you wanna test and the requisite error pops up
//Sometimes the $0 type thing is already set in the searchbar and then the error wont be visible; so first remove that from the search bar and then carry on the above operation
//Finally wherever we had written 'blue', we need to replace them with the currentColor imported from Context
