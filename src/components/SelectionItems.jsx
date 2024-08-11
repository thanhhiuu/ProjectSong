/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../store-redux/actions';
import { useNavigate } from 'react-router-dom';
import icons from '../ultil/icon';
const SelectionItems = ({ items }) => {
  const [isHover, setIsHover] = useState(false);
  const isScale = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerPlaylist = (item) => {
    dispatch(actions.setPlaylist(item?.encodeId));
    const path = item?.link?.split('.')[0];
    console.log(path, 'oathhh');
    navigate(path, { state: { playLists: false } });
  };
  const handlerEnter = (e) => {
    setIsHover(true);
    isScale.current?.classList?.remove('animate-scale-down-img');
    isScale.current?.classList?.add('animate-scale-up-img');
  };
  const handlerLeave = (e) => {
    setIsHover(false);
    isScale.current?.classList?.remove('animate-scale-up-img');
    isScale.current?.classList?.add('animate-scale-down-img');
  };
  return (
    <>
      <div
        key={items?.encodeId}
        onClick={() => handlerPlaylist(items)}
        className={`h-65 w-72  flex flex-col  items-center justify-center pl-[14px] pr-[14px]`}
      >
        <div
          className="img_chill h-full w-full flex justify-start overflow-hidden items-start relative"
          onMouseEnter={handlerEnter}
          onMouseLeave={handlerLeave}
        >
          {isHover && (
            <div className="absolute w-full z-10 h-full bg-bg-overlay">
              <div className="flex justify-center gap-6 items-center h-full">
                <div className="item_1 text-[#fff]">{icons.Heaths}</div>
                <div
                  className="item_2 text-[#fff] "
                  onClick={(e) => {
                    // Ngăn hiện tượng sủi bọt
                    e.stopPropagation();
                    navigate(items?.link?.split('.')[0], {
                      state: { playLists: true },
                    });
                  }}
                >
                  {icons.Players}
                </div>
                <div className="item_3 text-[#fff] ">{icons.MoreHorizIcon}</div>
              </div>
            </div>
          )}
          <img
            ref={isScale}
            src={items?.thumbnailM}
            className="cursor-pointer object-cover h-[95%] rounded-lg w-[100%] "
            alt=""
          />
        </div>
        <div className="content_chill h-45 w-full mt-2">
          <p className="text-[12px] w-full h-8 font-sans text-[#000]  text-left">
            {items?.sortDescription.length > 50
              ? `${items?.sortDescription.slice(0, 50)}...`
              : items?.sortDescription}
          </p>
          <span className="text-[12px] w-full  font-sans  text-[#6C6D6D] text-left">
            {items?.artistsNames?.length > 50
              ? `${items?.artistsNames?.slice(0, 50)}...`
              : items?.artistsNames}
          </span>
        </div>
      </div>
    </>
  );
};

export default SelectionItems;
