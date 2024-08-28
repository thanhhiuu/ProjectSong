/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { checkFollow } from '../ultil/fn';
import icons from '../ultil/icon';
import { NavLink, useNavigate } from 'react-router-dom';
const ArtistItems = ({ artist }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="container_artists h-[340px] w-full justify-center flex items-center  relative mt-5 px-[15px] flex-col">
        <div className="w-[180px] h-[180px] rounded-full overflow-hidden  flex items-center justify-center relative">
          <div
            className={`w-[180px] h-[180px] ${
              isHover ? 'animate-scale-up-img' : 'animate-scale-down-img'
            } `}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={(e) => {
              // Ngăn hiện tượng sủi bọt
              e.stopPropagation();
              console.log('hơhow');
            }}
          >
            {' '}
            <NavLink
              to={artist.link}
              key={artist.encodeId}
              onClick={(e) => {
                // Ngăn hiện tượng sủi bọt
                e.stopPropagation();
              }}
            >
              {isHover && (
                <div className="absolute w-[180px] h-[180px] bg-bg-overlay rounded-full">
                  <div className="flex justify-center gap-6 items-center h-full">
                    <div className="item_2 text-[#fff] ">
                      {icons.ShuffleIcon}
                    </div>
                  </div>
                </div>
              )}

              <img
                src={artist?.thumbnail}
                alt=""
                className="img_artist w-[180px] h-[180px]  rounded-full object-cover "
              />
            </NavLink>
          </div>
        </div>
        <NavLink to={artist.link} key={artist.encodeId}>
          <p className="name_artist text-center hover:underline hover:text-[#218888] w-full text-[14px] pt-[15px] pb-[4px] font-semibold  text-[#32323D]">
            {artist?.name}
          </p>
        </NavLink>

        <p className="concerned text-center w-full text-[12px] text-[#696969]">
          {checkFollow(artist?.totalFollow) + ' quan tâm'}
        </p>
        <div className="w-full flex justify-center py-[15px]">
          <button className="click_concerned flex gap-2 rounded-full items-center justify-center bg-[#218888] max-w-[80%] py-[6px] px-[19px]">
            <span className="text-[#FFFF] h-7">{icons.PersonAddIcon}</span>
            <span className="text-[#FFFF] text-[12px]">QUAN TÂM</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ArtistItems;
