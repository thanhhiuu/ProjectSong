import React from 'react';
import icon from '../ultil/icon';
const Header = () => {
  return (
    <>
      <div className="container_header  h-[70px] w-full">
        <div className="header_in h-full w-[95%] m-auto flex gap-7 justify-center items-center ">
          <div className="header_search flex gap-4 w-full ">
            <div className="icon_arrow flex items-center justify-center gap-2 mr-2">
              <div className="text-slate-500 ">{icon.ArrowBackIcon}</div>
              <div className="text-slate-500 ">{icon.ArrowForwardIcon}</div>
            </div>
            <div className="search_song flex items-center justify-center relative w-[29vw] ">
              <div className="text-slate-500 absolute z-10 left-0 ml-3 ">
                {' '}
                {icon.SearchIcon}{' '}
              </div>
              <input
                type="text"
                name=""
                id=""
                placeholder="Tìm kiếm bài nhạc bạn yêu thích"
                className="relative h-[40px] w-[100%] bg-[#DDE4E4]  rounded-full  outline-none pl-11 text-slate-700 "
              />
            </div>
          </div>
          <div className="header_profile flex justify-center items-center gap-4 w-full  h-full">
            <div className="upgrade_account font-bold font-sans w-[40%]  text-[#fff] bg-[#0e8080] flex justify-center items-center h-[40px] text-[14px] p-[10px] rounded-full ">
              Nâng cấp tài khoản
            </div>
            <div className="download bg-[#fff] flex text-[#0e8080]  w-[40%] font-bold font-sans  justify-center gap-1 items-center h-[40px] text-[14px] p-[10px] rounded-full">
              {icon.LaptopWindowsIcon} Tải bản Windows
            </div>
            <div className="setting flex justify-center items-center  bg-[#fff] w-10 h-[40px] rounded-full">
              {icon.SettingsIcon}
            </div>
            <div className="profile flex justify-center items-center bg-[#fff] w-10 h-[40px] rounded-full">
              <img
                src="https://s120-ava-talk-zmp3.zmdcdn.me/b/7/7/a/14/120/c248d7eedc145cba6e901d453d5bede5.jpg"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
