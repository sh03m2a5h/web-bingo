import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { unusedNumbersAtom } from "../states/bingoNumbers";
import ConfettiExplosion from "react-confetti-explosion";

type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onFixed?: (n: number) => void;
  children?: React.ReactNode;
};

const acceleration = 0.03;
const maxSpeed = 60; // fps
const minSpeed = 0.25; // 1 / 4 (seconds^-1)

export default function RandomNumberModal(props: ModalProps) {
  const isOpen = props.isOpen;
  const [randomNumber, setRandomNumber] = useState(0);
  const [isAccererating, setIsAccerating] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const unusedNumbers = useRecoilValue(unusedNumbersAtom);

  useEffect(() => {
    if (!isOpen) return;
    setIsFixed(false);

    let previousShownAt = 0;
    let speed = 20;
    let duration = (1 / speed) * 1000;
    let rnd = 0;
    const interval = setInterval(() => {
      // 最低速度に達していたら以降の処理は実行しない
      if (speed === minSpeed) {
        props.onFixed?.(rnd);
        setIsFixed(true);
        clearInterval(interval);
        return;
      }

      // 加減速処理
      if (isAccererating) {
        speed = Math.min(speed + acceleration, maxSpeed);
      } else {
        speed = Math.max(speed - acceleration, minSpeed);
      }

      duration = (1 / speed) * 1000;
      if (Date.now() - previousShownAt > duration) {
        const currentIdx = Math.floor(Math.random() * unusedNumbers.length);
        rnd = unusedNumbers[currentIdx];
        setRandomNumber(rnd);
        previousShownAt = Date.now();
      }
    }, 1000 / 60);

    return () => {
      clearInterval(interval);
    };
  }, [isOpen, isAccererating]);

  const handleMouseDown = () => {
    if (isFixed) return;
    console.log("handleMouseDown");
    setIsAccerating(true);
  };

  const handleMouseUp = () => {
    if (isFixed) return;
    console.log("handleMouseUp");
    setIsAccerating(false);
  };

  const handleClose = () => {
    if (!isFixed) return;
    props.onClose();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2 flex flex-col justify-center items-center">
                    <p className="text-5xl text-black">
                      {randomNumber}
                      {isFixed && (
                        <ConfettiExplosion
                          zIndex={100}
                          duration={3000}
                          onComplete={handleClose}
                        />
                      )}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      disabled={isFixed}
                    >
                      加速
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
