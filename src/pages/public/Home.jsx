import React, { useEffect, useState } from 'react';
import { Banner, Radio, WeekChart, ZingChart } from './index';
// import * as apis from '../../apis/index';
import { useDispatch, useSelector } from 'react-redux';
import { getHome } from '../../store-redux/actions';
import Playlist from './Playlist';
import { Chart, Newrelease, SelectionHome } from '../../components';
import * as apis from '../../apis/index';
import moment from 'moment';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import icons from '../../ultil/icon';
import * as actions from '../../store-redux/actions/index';
import Slider from 'react-slick';
import path from '../../ultil/path';

const Home = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const dispatch = useDispatch();
  const {
    chill,
    title,
    top100,
    remix,
    weekchart,
    halbum,
    liveradio,
    newreleases,
  } = useSelector((state) => state.app);
  const { currentLoading } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(actions?.setLoading(false));

    dispatch(getHome());
    dispatch(actions?.setLoading(true));
  }, []);
  // console.log(weekchart, ' weekchart');
  const [fetchDataChart, setFetchDataChart] = useState(null);

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(newreleases, 'new');
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
  useEffect(() => {
    try {
      const fetchDataChart = async () => {
        const response = await apis.getHomeChart();
        setFetchDataChart({
          dataNewRelease: response?.data?.data,
        });
      };
      fetchDataChart();
    } catch (error) {
      console.log('Lỗi ở chart' + error.message);
    }
  }, []);
  const handlerPlaylist = (item) => {
    dispatch(actions.setPlaylist(item?.encodeId));
    const path = item?.link?.split('.')[0];
    console.log(path, 'oathhh');
    navigate(path);
  };
  return (
    <>
      {currentLoading ? (
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
          <div className=" m-auto w-[96%] mb-8">
            <div className="flex max-w-[98%] justify-between m-auto mt-4 mb-6  items-center">
              <div className="text-[20px] font-bold font-sans text-black  ">
                {newreleases?.title}
              </div>
              <div className="text-[14px] font-bold font-sans text-black">
                Tất cả <span> {icons.ArrowForwardIosIcon}</span>
              </div>
            </div>
            <div className="max-w-[98%] m-auto ">
              <Slider {...settings} className="">
                {newreleases?.items?.map((item, index) => {
                  return (
                    <div
                      key={item?.encodeId}
                      className="w-[35%] h-[150px] p-[10px] item_slider rounded-lg bg-bg-slide"
                    >
                      <div className="max-w-[40%] h-full flex  items-center">
                        <img
                          src={item?.album?.thumbnail}
                          alt=""
                          className="w-[120px] h-[130px] rounded-lg object-cover"
                        />
                      </div>
                      <div className=" h-[100%] w-[60%]">
                        <div className="h-[90px]">
                          <span className="text-[14px] font-semibold text-[#32323D] ">
                            {item?.album?.title?.length > 20
                              ? `${item?.album?.title?.slice(0, 20)}...`
                              : item?.album?.title}
                          </span>
                          <p className="text-[12px] text-[#696969] ">
                            {' '}
                            {item?.album?.artistsNames?.length > 30
                              ? `${item?.album?.artistsNames?.slice(0, 30)}...`
                              : item?.album?.artistsNames}
                          </p>
                        </div>
                        <div className="flex gap-4 items-center justify-between h-[40%] ">
                          <span className="text-[40px] text-[#696969]">
                            #{index + 1}
                          </span>
                          <p className="text-[14px] text-[#696969]">
                            {item?.album?.releaseDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className=" m-auto w-[96%] mb-8">
            <Chart />
          </div>
          <div className=" w-[96%] flex gap-5 justify-between m-auto  mb-8">
            {weekchart?.map((item, index) => {
              return (
                <NavLink
                  className="  w-[96%] m-auto flex flex-1 justify-center"
                  to={item?.link?.split('.')[0]}
                  key={index}
                  onClick={() => {
                    dispatch(actions?.setCountry(item?.country));
                  }}
                >
                  <div className="overflow-hidden w-[94%]">
                    <img
                      src={item?.cover}
                      className="hover:scale-125 bg-cover object-cover"
                      alt=""
                    />
                  </div>{' '}
                </NavLink>
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
              {halbum?.items
                ?.slice(currentIndex, currentIndex + 5)
                .map((item) => {
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
                          {item?.title?.length > 30
                            ? `${item?.title?.slice(0, 30)}...`
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
      ) : (
        <div className="w-full h-full flex items-center justify-center ">
          <span className="loader_pages_home"></span>
        </div>
      )}
    </>
  );
};

export default Home;
