import { HomeIcon } from "@heroicons/react/outline";
import { navigationList } from "./NavigationRoutes";
import { Transition } from "@headlessui/react";
import { classNames } from "../utilities";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function SidebarTransition({ children, show }) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}

function DropdownTransition({ children, show }) {
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
}

function NestedSidebarNavItem({ item }) {
  return (
    <NavLink to={item.path}>
      <button className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        {item.name}
      </button>
    </NavLink>
  );
}

function DropdownSidebarItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      >
        <span>{item.name}</span>
      </button>
      <DropdownTransition show={isOpen}>
        <div className="right-0 w-full mt-2 origin-top-right rounded-md shadow-lg">
          <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
            {item.items.map((nested, key) => (
              <NestedSidebarNavItem key={key} item={nested} />
            ))}
          </div>
        </div>
      </DropdownTransition>
    </div>
  );
}

function SidebarNavItem({ item }) {
  if (item.hasOwnProperty("items")) {
    return <DropdownSidebarItem item={item} />;
  } else {
    return (
      <NavLink to={item.path}>
        <button className="block w-full px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
          {item.name}
        </button>
      </NavLink>
    );
  }
}

function SidebarNav({ isOpen }) {
  return (
    <nav
      className={classNames(
        isOpen ? "block" : "hidden",
        "flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto"
      )}
    >
      {navigationList.map((item, key) => (
        <SidebarNavItem key={key} item={item} />
      ))}
    </nav>
  );
}

export default function Sidebar({ children, isOpen, setIsOpen }) {
  return (
    <SidebarTransition show={isOpen}>
      <div className="w-64 h-screen bg-slate-500 pt-4 z-50">
        <SidebarNav isOpen={isOpen} />
      </div>
    </SidebarTransition>
  );
}
