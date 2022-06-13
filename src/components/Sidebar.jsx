import React from "react";
import { Link, NavLink } from "react-router-dom"; //This will allow us to switch between different pages in our application
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      //Warning was showing as we wrote != instead of !==
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware />
              <span>Shoppy</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={
                  () => setActiveMenu(!activeMenu)
                  // setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                // prevActiveMenu is the previous state and that can be used to toggle the previous value
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                style={{ color: currentColor }}
              >
                <MdOutlineCancel />
                {/* The Cross button isn't visible in the window possibly because the laptop screen falls in the category of medium devices and for medium devices, it's hidden */}
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {/* A function is called that goes over each entry of the links section and prints their names in order in the Sidebar */}
            {links.map((item) => (
              <div key={item.title}>
                {/* key is given to make each title unique here */}
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    // Meaning for a mobile device, when we click on an option in the sidebar, we go to that page and the sidebar automatically closes as well
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {/* Can define two different classnames for active and inactive links so that when a link is active, the corresponding classname gets applied */}
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
