/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import icons from '../../ultil/icon';
import * as actions from '../../store-redux/actions/index';
import { useSelector } from 'react-redux';
const Radio = () => {
  const { liveradio, title } = useSelector((state) => state.app);

  return (
    <>
      {' '}
      <div>
        <div className="flex w-[94%] justify-between m-auto mt-4 mb-6  items-center">
          <div className="text-[20px] font-bold font-sans text-black  ">
            {title?.find((e) => e.sectionId === 'hLiveRadio')?.title}
          </div>
          <div className="text-[14px] font-bold font-sans text-black">
            Tất cả <span> {icons.ArrowForwardIosIcon}</span>
          </div>
        </div>
      </div>
      <div className=" w-[96%] m-auto flex flex-wrap   justify-between items-center">
        {liveradio?.slice(0, 7).map((item) => {
          return (
            <Link key={item?.encodeId} to={item?.link?.split('.')[0]}>
              <div className="w-[152px] flex-1 h-[180px] flex flex-col items-center ">
                <div className="img_radio w-[120px]  h-[120px]  rounded-full  overflow-hidden">
                  <img
                    src={item?.program?.thumbnail}
                    className="rounded-full  w-[120px] h-[120px]  overflow-hidden  m-auto hover:scale-110"
                    alt=""
                  />
                </div>
                <div className="title_radio text-[16px] font-bold text-[#18191b] text-center mt-2">
                  {item?.host?.name}
                </div>
                <div className="title_radio text-center text-[12px] text-[#636b6b]">
                  {item?.activeUsers} <span>đang nghe</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Radio;
