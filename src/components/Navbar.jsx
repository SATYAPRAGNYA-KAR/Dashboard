import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
      {/* As the span element was surrounding the {icons}, all the icons in the Navbar appeared smaller than usual */}
    </button>
    {/* We didn't put the customFunc directly here as an arrow function because all the Nav buttons won't have the same function and so each one's unique function is defined in them only */}
  </TooltipComponent>
); //Here we need to use Parenthesis and as I had used Curly braces initially, nothing was being rendered

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize); //Whenever the screen resizes, the value gets stored as that particar size

    handleResize();
    //Initially it's called once to take a note of the initial window size
    //Whenever we add EventListener, etc. in React, we should remove it at last

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // useEffect has a Dependency array as a parameter that tells us when it should be called; if the array is kept blank, then it'll be called only at the start and if screenSize is put in it, then it'll be called everytime the screen size changes
  //Here again the Dependency arrays are removed due to the warnings
  //But but but if the Dependency array is removed, then the Sidebar can't be toggled by pressing on the icon; so eventhough empty, the dependency array must be present

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        // customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}; This same thing can be written as below by replacing with handleActiveMenu
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notifications"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              src={avatar}
              className="rounded-full w-8 h-8"
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </p>
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
