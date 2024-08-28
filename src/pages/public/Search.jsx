import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { search } from '../../ultil/menu.js';
import { useSelector } from 'react-redux';
const Search = () => {
  const [isSearch, setIsSearch] = useState(0);
  const { keywords } = useSelector((state) => state.music);

  const activeStyle =
    'text-[#0E8080]  w-[140px] font-roboto text-center border-b-2 border-[#0E8080] text-[14px] py-[15px] hover:text-[#0E8080] ';
  const styleNav = ' text-[#32323D] w-[140px] font-roboto text-center';
  return (
    <>
      <div className="w-[100%] flex flex-row px-[36px] h-[47px] border-b border-slate-400 mb-5">
        <h1 className="text-[24px] pr-5 flex items-center justify-start flex-none font-bold font-sans ">
          Kết Quả Tìm Kiếm
        </h1>

        <div className="flex items-center justify-start h-full   ">
          {search?.map((item, index) => {
            return (
              <NavLink
                title={item.text}
                to={`${item.path}?q=${keywords}`}
                key={index}
                className={({ isActive }) =>
                  isActive ? activeStyle : styleNav
                }

                // {`text-[14px] py-[15px] hover:text-[#0E8080] ${
                //   isSearch === 0
                //     ? 'text-[#0E8080]  w-[140px] font-roboto text-center border-b-2 border-[#0E8080] '
                //     : ' text-[#32323D] w-[140px] font-roboto text-center'
                // }`}
              >
                {item.text}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </>
  );
};

export default Search;
