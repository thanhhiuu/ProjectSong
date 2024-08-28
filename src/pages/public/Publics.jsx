/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Header,
  Player,
  SildebarLeft,
  SildebarRight,
} from '../../components/index.js';

const publics = () => {
  const [isOnOff, setIsOnOff] = useState(true);
  return (
    <>
      <div className=" w-full h-screen flex flex-col relative ">
        <div className="flex w-full flex-auto h-full ">
          <div className={`bg-[#DDE4E4] w-[240px] h-full flex-none  `}>
            <SildebarLeft />
          </div>
          <div
            className={`bg-[#ced9d9] w-[50%] flex-auto flex flex-col h-full mb-[150%] `}
          >
            <div className=" w-full flex-none flex items-center ">
              <Header />
            </div>

            <div className="w-full flex-auto  overflow-y-auto scrollbar-hide ">
              <Outlet />
            </div>
          </div>
          {isOnOff ? (
            <div
              className={`bg-[#ced9d9] flex-none hidden responsePublic:flex  w-[333px] `}
            >
              <SildebarRight />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="player  h-[90px] fixed z-40 bottom-0 left-0 right-0 ">
          <Player setIsOnOff={setIsOnOff} />
        </div>
      </div>
    </>
  );
};

export default publics;
