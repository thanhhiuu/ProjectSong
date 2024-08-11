import React from 'react';
import Logo from '../accset/images/logo.png';
import menu from '../ultil/menu';
import { NavLink } from 'react-router-dom';
import path from '../ultil/path';
import { useNavigate } from 'react-router-dom';
const SildebarLeft = () => {
  const activeStyle = 'mb-6 ml-[25px] text-[#0f7070]  ';
  const styleNav = 'mb-6 ml-[25px]  ';
  const navigator = useNavigate();
  return (
    <>
      <div id="container_slideleft " className="h-full w-full flex flex-col">
        <div
          onClick={() => navigator(path.HOME)}
          className="h-[70px] flex items-center w-full justify-start"
        >
          <img className="w-28 h-[40px] ml-[25px]" src={Logo} alt="" />
        </div>
        <div id="menu" className="flex flex-col mt-4 text-center ">
          {menu?.map((item, index) => (
            <NavLink
              className={({ isActive }) => (isActive ? activeStyle : styleNav)}
              title={item.text}
              to={item.path}
              key={index}
            >
              <div className="w-full h-full ">
                <span key={index} className=" flex gap-4 justify-stretch">
                  <div className="text-sm">{item.icon}</div>
                  <div>{item.text}</div>
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default SildebarLeft;
