import React from 'react';
import Logo from '../accset/images/logo.png';
import { menu, menu_two } from '../ultil/menu';
import { NavLink } from 'react-router-dom';
import path from '../ultil/path';
import { useNavigate } from 'react-router-dom';
const SildebarLeft = () => {
  const activeStyle = 'mb-6 ml-[25px] text-[#218888]';
  const styleNav = 'mb-6 ml-[25px] text-[#32323D] ';
  const navigator = useNavigate();
  return (
    <>
      <div>
        <div id="container_slideleft " className="h-full w-full flex flex-col">
          <div
            onClick={() => navigator(path.HOME)}
            className="h-[70px] flex items-center w-full justify-start"
          >
            <img
              className="w-28 h-[40px] ml-[25px] object-contain"
              src={Logo}
              alt=""
            />
          </div>
          <div id="menu" className="flex flex-col mt-4 text-center ">
            {menu?.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : styleNav
                }
                title={item.text}
                to={item.path}
                key={index}
              >
                <div className="w-full h-full ">
                  <span key={index} className=" flex gap-4 justify-stretch">
                    <div className="text-sm">{item.icon}</div>
                    <div className="text-[14px]  font-semibold">
                      {item.text}
                    </div>
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="h-[220px] w-full flex flex-col pt-5  overflow-y-auto scrollbar-hide border-y-[1px] border-y-[#c1c1d3]">
          {menu_two?.map((item, index) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : styleNav
                }
                title={item.text}
                to={item.path}
                key={index}
              >
                <div className="w-full h-full ">
                  <span key={index} className=" flex gap-4 justify-stretch">
                    <div className="text-sm">{item.icon}</div>
                    <div className="text-[14px] font-semibold">{item.text}</div>
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
        <div className=" w-full text-center flex flex-col px-[16px] mt-3">
          <div className=" h-[130px] bg-[#9D60DD] pt-5 rounded-xl ">
            <p className="text-[12px] text-white pb-3 font-semibold">
              Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM
            </p>
            <button
              type="button"
              className=" py-[6px] px-[10px] bg-[#E5C500] rounded-full"
            >
              Nâng Cấp Tài Khoản
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SildebarLeft;
