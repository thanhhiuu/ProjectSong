import React, { useEffect, useState } from 'react';
import icon from '../ultil/icon';
import { useNavigate } from 'react-router-dom';
import * as actions from '../store-redux/actions/index.js';
import path from '../ultil/path.js';
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
  const [keyword, setKeyword] = useState('');
  const { searchSong, keywords } = useSelector((state) => state.music);
  // console.log(keywords);
  // console.log(searchSong, ' searchSong');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handlerSearch = (e) => {
      if (e.keyCode === 13) {
        dispatch(actions?.apiSearch(keyword));
        const paths = `${path.SEARCH}/${path.SEARCH_ALL}`;
        navigate(paths);
      }
    };

    window.addEventListener('keyup', handlerSearch);

    return () => removeEventListener('keyup', handlerSearch);
  }, [keyword]);

  return (
    <>
      <div className="container_header  h-[70px] w-full flex px-[36px]">
        <div className="header_in h-full flex-auto flex gap-7 justify-center items-center ">
          <div className="header_search flex gap-1">
            <div className="icon_arrow flex items-center  justify-center gap-1 mr-2">
              <div className="text-slate-500 " onClick={() => navigate(-1)}>
                {icon.ArrowBackIcon}
              </div>
              <div className="text-slate-500 " onClick={() => navigate(1)}>
                {icon.ArrowForwardIcon}
              </div>
            </div>
            <div className="search_song flex items-center justify-center relative w-[25vw] ">
              <div className="text-slate-500 absolute z-10 left-0 ml-3 ">
                {' '}
                {icon.SearchIcon}{' '}
              </div>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="Tìm kiếm bài nhạc bạn yêu thích"
                className="relative h-[40px] w-[100%] bg-[#DDE4E4]  rounded-full  outline-none pl-11 text-slate-700 "
              />
            </div>
          </div>
          <div className="header_profile flex justify-end items-center gap-2 w-full  h-full">
            <div className="upgrade_account font-bold font-sans min-w-[200px]  text-[#fff] bg-[#0e8080] flex justify-center items-center h-[40px] text-[14px] p-[10px] rounded-full ">
              Nâng cấp tài khoản
            </div>
            <div className="download bg-[#fff] flex text-[#0e8080]   min-w-[200px] font-bold font-sans  justify-center gap-1 items-center h-[40px] text-[14px] p-[10px] rounded-full">
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
