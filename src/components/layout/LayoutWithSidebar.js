import { useState } from "react";
import { Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import LogoLight from "../../assets/LogoLight.svg";
import { navigationList } from "../NavigationRoutes";
import SidebarButton from "./SidebarButton";
import Dropdown from "./Dropdown";

function OffCanvasMenuOverlay({ setShow }) {
  return (
    <Transition.Child
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute inset-0">
        <div
          onClick={() => setShow(false)}
          className="absolute inset-0 opacity-75 bg-gray-500"
        />
      </div>
    </Transition.Child>
  );
}

function SidebarNav({ setShow }) {
  return (
    <>
      {navigationList.map((item, key) =>
        item.hasOwnProperty("items") ? (
          <Dropdown key={key} item={item} setSidebarShow={setShow} />
        ) : (
          <SidebarButton key={key} item={item} setShow={setShow} />
        )
      )}
    </>
  );
}

function OffCanvasMenu({ setShow }) {
  return (
    <Transition.Child
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white"
    >
      <div className="absolute top-0 right-0 p-1 -mr-14">
        <Transition.Child
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-500"
          aria-label="Close sidebar"
          as="button"
          onClick={() => setShow(false)}
        >
          <XIcon className="w-6 h-6 text-white" />
        </Transition.Child>
      </div>
      <div className="flex items-center flex-shrink-0 px-4">
        <img className="w-auto h-5" src={LogoLight} alt="InvestPad Logo" />
      </div>
      <div className="flex-shrink-0 mt-5">
        <SidebarNav setShow={setShow} />
      </div>
    </Transition.Child>
  );
}

function Navbar({ setShow }) {
  return (
    <div className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none">
      <button
        className="px-4 text-cool-gray-400 focus:outline-none focus:bg-cool-gray-100 focus:text-cool-gray-600"
        aria-label="Open sidebar"
        onClick={() => setShow(true)}
      >
        <MenuIcon className="w-6 h-6 transition duration-150 ease-in-out" />
      </button>

      <div className="flex justify-between flex-1 pr-4 sm:pr-6 lg:max-w-6xl lg:mx-auto lg:pr-8 items-center">
        <img className="w-auto h-5" src={LogoLight} alt="InvestPad Logo" />
        <button className="bg-emerald-300 px-3 py-2 rounded-md">Connect</button>
      </div>
    </div>
  );
}

function Main({ children, setShow }) {
  return (
    <div
      className="flex-1 flex flex-col overflow-auto focus:outline-none"
      tabIndex={0}
    >
      <Navbar setShow={setShow} />
      <main className="relative z-0 flex-1 overflow-y-auto h-full">
        {children}
      </main>
    </div>
  );
}

export default function LayoutWithSidebar({ children }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex overflow-hidden h-full bg-gray-50">
      <Transition show={show} className="absolute inset-0 z-40 flex">
        {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
        <OffCanvasMenuOverlay setShow={setShow} />
        {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
        <OffCanvasMenu setShow={setShow} />
        {/* Dummy element to force sidebar to shrink to fit close icon */}
        <div className="flex-shrink-0 w-14" />
      </Transition>
      <Main setShow={setShow}>{children}</Main>
    </div>
  );
}
