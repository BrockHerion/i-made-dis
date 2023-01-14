import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

const Dropdown: React.FC<{
  button: React.ReactNode;
  items: Array<React.ReactNode>;
}> = ({ button, items }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button
        className="inline-flex
        w-full
        justify-center
        rounded-md
        text-sm
        font-medium"
      >
        {button}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          )}
        >
          {items.map((item, index) => (
            <Menu.Item key={`item-${index}`}>
              {({ active }) => (
                <div className="group flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                  {item}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </div>
  </Menu>
);

export default Dropdown;
