import React, { useEffect, useState } from 'react';
import { Banner, Radio, WeekChart } from './index';
// import * as apis from '../../apis/index';
import { useDispatch, useSelector } from 'react-redux';
import { getHome } from '../../store-redux/actions';
import Playlist from './Playlist';
import { Newrelease, SelectionHome } from '../../components';

import { Link, useNavigate } from 'react-router-dom';
import icons from '../../ultil/icon';
import * as actions from '../../store-redux/actions/index';

const Home = () => {
  const dispatch = useDispatch();
  const { chill, title, top100, remix, weekchart, halbum, liveradio } =
    useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getHome());
  }, []);

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!halbum || halbum?.items?.length === 0) return;

    const maxIndex = halbum?.items?.length - 5;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [halbum]);
  const handlerPlaylist = (item) => {
    dispatch(actions.setPlaylist(item?.encodeId));
    const path = item?.link?.split('.')[0];
    console.log(path, 'oathhh');
    navigate(path);
  };
  return (
    <div className="h-full w-full ">
      <div className="w-full">
        <Banner />
      </div>
      <div className="container_chill w-[96%] m-auto  mb-8">
        <SelectionHome
          data={chill}
          title={title?.find((e) => e.sectionId === 'hEditorTheme')?.title}
        />
      </div>
      <div className=" w-[96%] m-auto  mb-8">
        <SelectionHome
          data={remix}
          title={title?.find((e) => e.sectionId === 'hEditorTheme3')?.title}
        />
      </div>{' '}
      <div className=" w-[96%] m-auto  mb-8">
        <Newrelease
          title={title?.find((e) => e.sectionType === 'new-release')?.title}
        />
      </div>
      <div className=" w-[96%] flex gap-5 justify-between m-auto  mb-8">
        {weekchart?.map((item, index) => {
          return (
            <Link
              className="  w-[96%] m-auto flex flex-1 justify-center"
              to={item?.link?.split('.')[0]}
              key={item.Link}
            >
              <div className="overflow-hidden w-[94%]">
                <img
                  src={item?.cover}
                  className="hover:scale-125 bg-cover object-cover"
                  alt=""
                />
              </div>{' '}
            </Link>
          );
        })}
      </div>
      <div className=" w-[96%] m-auto  mb-8">
        <SelectionHome
          data={top100}
          title={title?.find((e) => e.sectionId === 'h100')?.title}
        />
      </div>
      <div className=" w-[96%] m-auto  mb-8">
        <div>
          <div className="flex max-w-[98%] justify-between m-auto mt-4 mb-6  items-center">
            <div className="text-[20px] font-bold font-sans text-black  ">
              {halbum?.title}
            </div>
            <div className="text-[14px] font-bold font-sans text-black">
              Tất cả <span> {icons.ArrowForwardIosIcon}</span>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex  items-center mt-5 justify-center">
          {halbum?.items?.slice(currentIndex, currentIndex + 5).map((item) => {
            return (
              <div
                key={item?.encodeId}
                onClick={() => handlerPlaylist(item)}
                className={`h-65 w-72  flex flex-col  items-center justify-center pl-[14px] pr-[14px]`}
              >
                <div className="img_chill h-full w-full flex justify-start items-start  ">
                  <img
                    src={item?.thumbnailM}
                    className="cursor-pointer h-[95%] rounded-lg w-[100%] "
                    alt=""
                  />
                </div>
                <div className="content_chill h-30 w-full mt-2">
                  <p className="text-[12px] w-full h-4 font-sans text-[#000] text-left">
                    {item?.title.length > 30
                      ? `${item?.title.slice(0, 30)}...`
                      : item?.title}
                  </p>
                  <span className="text-[12px] w-full  font-sans text-[#6C6D6D] text-left">
                    {item?.artistsNames?.length > 30
                      ? `${item?.artistsNames?.slice(0, 30)}...`
                      : item?.artistsNames}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" m-auto mb-8">
        <Radio />
      </div>
      <div className="w-full h-[500px]">{/* <Loading />x{' '} */}</div>
    </div>
  );
};

export default Home;
