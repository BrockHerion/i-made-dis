import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export function useModal() {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
}

type Props = {
  open: boolean;
  setOpen(open: boolean): void;
};

export default function Modal(props: Props) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={props.setOpen}
      ></Dialog>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>
    </Transition.Root>
  );
}
