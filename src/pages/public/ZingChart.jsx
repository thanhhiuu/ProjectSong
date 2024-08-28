/* eslint-disable no-prototype-builtins */
import React, { useEffect, useRef, useState } from 'react';
import { Chart, Lists } from '../../components';
import * as apis from '../../apis/index';
import moment from 'moment';
import icons from '../../ultil/icon';
import * as actions from '../../store-redux/actions/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ZingChart = () => {
  const navigate = useNavigate();
  const [fetchDataChart, setFetchDataChart] = useState(null);
  const [isCount, setIsCount] = useState(false);
  const dispatch = useDispatch();
  const refChart = useRef();
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
  useEffect(() => {
    refChart.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  });
  console.log(fetchDataChart?.dataNewRelease?.weekChart, 'fech');
  return (
    <>
      <div>
        <div ref={refChart}>
          <Chart display />
        </div>
        <div className="w-[94%] m-auto">
          {fetchDataChart?.dataNewRelease?.RTChart?.items
            ?.slice(0, `${isCount ? 100 : 10}`)
            .map((item, index) => {
              return (
                <>
                  <div
                    className="p-[10px] flex items-center  gap-4  border-b hover:bg-[#DDE4E4] "
                    key={item?.encodeId}
                  >
                    <div className="w-[4%]">
                      {' '}
                      <span
                        className={`${
                          +index === 0
                            ? 'text-[#4A90E2]'
                            : +index === 1
                            ? 'text-[#E35050]'
                            : +index === 2
                            ? 'text-[#27BD9C]'
                            : 'text-[#696969]'
                        }  text-[32px] font-semibold `}
                      >
                        {index + 1}
                      </span>
                    </div>{' '}
                    <strong className="h-[2px] w-3 bg-[#747575]"></strong>
                    <Lists songData={item} />
                  </div>
                </>
              );
            })}
          <div className="flex justify-center">
            <button
              type="button"
              className={`${' text-center mt-10 px-12 py-2 text-[#218888] rounded-full border border-[#218888]'}`}
              onClick={() => setIsCount((e) => !e)}
            >
              {isCount ? 'Đóng xem top' : 'Xem top 100'}
            </button>
          </div>
        </div>
        <div className="w-[94%] m-auto">
          <div>
            <h1 className="text-[#0F7070] text-[40px] font-bold">
              Bảng xếp hạng tuần{' '}
            </h1>
          </div>
          <div className="flex items-center justify-between gap-5 mt-5">
            <div className="vn w-[430px] rounded-lg h-[440px] bg-[#E0E5E5] overflow-hidden px-[15px] py-[10px]">
              <div className="flex gap-2 items-center mb-5">
                {' '}
                <span className="ml-2 text-[#0D7373] text-[24px] font-bold">
                  VIỆT NAM
                </span>
                <span>{icons.PlayCircleIconLp}</span>
              </div>
              {fetchDataChart?.dataNewRelease?.weekChart?.vn?.items
                .slice(0, 5)
                ?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="p-[10px] h-[60px]  py-2 flex items-center gap-4  border-b hover:bg-[#ebf2f2]  "
                        key={item?.encodeId}
                      >
                        <div className="w-[8%]">
                          {' '}
                          <span
                            className={`${
                              +index === 0
                                ? 'text-[#4A90E2]'
                                : +index === 1
                                ? 'text-[#E35050]'
                                : +index === 2
                                ? 'text-[#27BD9C]'
                                : 'text-[#696969]'
                            }  text-[32px] font-semibold `}
                          >
                            {index + 1}
                          </span>
                        </div>{' '}
                        <strong className="h-[2px] w-2 bg-[#747575]"></strong>
                        <div
                          className="w-full flex gap-1 items-center "
                          onClick={() => {
                            dispatch(actions.setSongId(item?.encodeId));
                            dispatch(actions.setPlay(true));
                            dispatch(
                              actions.setRecent({
                                encodeId: item?.encodeId,
                                thumbnailM: item?.thumbnailM,
                                title: item?.title,
                                artistsNames: item?.artistsNames,
                              })
                            );
                          }}
                        >
                          <div className="w-[18%]">
                            <img
                              src={item?.thumbnailM}
                              alt=""
                              className="h-[40px] w-[40px]"
                            />
                          </div>
                          <div className="w-[70%] flex flex-col">
                            <span className="text-[14px]  w-full">
                              {item?.title?.length > 20
                                ? `${item?.title?.slice(0, 20)}...`
                                : item?.title}{' '}
                              <span>
                                {item?.hasOwnProperty('previewInfo') ? (
                                  <span>{icons.WorkspacePremiumIcon}</span>
                                ) : (
                                  ''
                                )}
                              </span>
                            </span>
                            <span className="text-[12px] text-[#32323D80] ">
                              {item?.artistsNames?.length > 20
                                ? `${item?.artistsNames?.slice(0, 20)}...`
                                : item?.artistsNames}
                            </span>
                          </div>
                          <div className="time_song w-[10%] text-right text-[12px] text-[#32323D80]">
                            {moment.unix(item?.duration).format('mm:ss')}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              <div className="flex justify-center w-full">
                <button
                  type="button"
                  className="text-center mt-5 px-12 py-2 text-[#218888] rounded-full border border-[#218888]"
                  onClick={() =>
                    navigate(
                      fetchDataChart?.dataNewRelease?.weekChart?.vn?.link.split(
                        '.'
                      )[0],
                      {
                        state: {
                          playlistId:
                            fetchDataChart?.dataNewRelease?.weekChart?.vn
                              ?.playlistId,
                          country: 'vn',
                        },
                      }
                    )
                  }
                >
                  Xem thêm
                </button>
              </div>
            </div>
            <div className="us w-[430px] h-[440px] rounded-lg bg-[#E0E5E5] px-[15px] py-[10px]">
              <div className="flex gap-2 items-center mb-5">
                {' '}
                <span className="ml-2 text-[#0D7373] text-[24px] font-bold">
                  US - UK
                </span>
                <span>{icons.PlayCircleIconLp}</span>
              </div>
              {fetchDataChart?.dataNewRelease?.weekChart?.us?.items
                .slice(0, 5)
                ?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="p-[10px] h-[60px] py-2 flex items-center gap-4  border-b hover:bg-[#ebf2f2] "
                        key={item?.encodeId}
                      >
                        <div className="w-[4%]">
                          {' '}
                          <span
                            className={`${
                              +index === 0
                                ? 'text-[#4A90E2]'
                                : +index === 1
                                ? 'text-[#E35050]'
                                : +index === 2
                                ? 'text-[#27BD9C]'
                                : 'text-[#696969]'
                            }  text-[32px] font-semibold `}
                          >
                            {index + 1}
                          </span>
                        </div>{' '}
                        <strong className="h-[2px] w-3 bg-[#747575]"></strong>
                        <div
                          className="w-full flex gap-1 items-center"
                          onClick={() => {
                            dispatch(actions.setSongId(item?.encodeId));
                            dispatch(actions.setPlay(true));
                            dispatch(
                              actions.setRecent({
                                encodeId: item?.encodeId,
                                thumbnailM: item?.thumbnailM,
                                title: item?.title,
                                artistsNames: item?.artistsNames,
                              })
                            );
                          }}
                        >
                          <div className="w-[18%]">
                            <img
                              src={item?.thumbnailM}
                              alt=""
                              className="h-[40px] w-[40px]"
                            />
                          </div>
                          <div className="w-[70%] flex flex-col">
                            <span className="text-[14px]  w-full">
                              {item?.title?.length > 20
                                ? `${item?.title?.slice(0, 20)}...`
                                : item?.title}{' '}
                              <span>
                                {item?.hasOwnProperty('previewInfo') ? (
                                  <span>{icons.WorkspacePremiumIcon}</span>
                                ) : (
                                  ''
                                )}
                              </span>
                            </span>
                            <span className="text-[12px] text-[#32323D80] ">
                              {item?.artistsNames?.length > 20
                                ? `${item?.artistsNames?.slice(0, 20)}...`
                                : item?.artistsNames}
                            </span>
                          </div>
                          <div className="time_song w-[10%] text-right text-[12px] text-[#32323D80]">
                            {moment.unix(item?.duration).format('mm:ss')}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              <div className="flex justify-center w-full">
                <button
                  type="button"
                  className="text-center mt-5 px-12 py-2 text-[#218888] rounded-full border border-[#218888]"
                  onClick={() =>
                    navigate(
                      fetchDataChart?.dataNewRelease?.weekChart?.us?.link?.split(
                        '.'
                      )[0],
                      {
                        state: {
                          playlistId:
                            fetchDataChart?.dataNewRelease?.weekChart?.us
                              ?.playlistId,
                          country: 'us',
                        },
                      }
                    )
                  }
                >
                  Xem thêm
                </button>
              </div>
            </div>
            <div className="korea w-[430px] h-[440px] rounded-lg bg-[#E0E5E5] px-[15px] py-[10px]">
              <div className="flex gap-2 items-center mb-5">
                {' '}
                <span className=" ml-2 text-[#0D7373] text-[24px] font-bold">
                  K-Pop
                </span>
                <span>{icons.PlayCircleIconLp}</span>
              </div>
              {fetchDataChart?.dataNewRelease?.weekChart?.korea?.items
                .slice(0, 5)
                ?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="p-[10px] h-[60px] py-2 flex items-center gap-4  border-b hover:bg-[#ebf2f2] "
                        key={item?.encodeId}
                      >
                        <div className="w-[4%]">
                          {' '}
                          <span
                            className={`${
                              +index === 0
                                ? 'text-[#4A90E2]'
                                : +index === 1
                                ? 'text-[#E35050]'
                                : +index === 2
                                ? 'text-[#27BD9C]'
                                : 'text-[#696969]'
                            }  text-[32px] font-semibold `}
                          >
                            {index + 1}
                          </span>
                        </div>{' '}
                        <strong className="h-[2px] w-3 bg-[#747575]"></strong>
                        <div
                          className="w-full flex gap-1 items-center"
                          onClick={() => {
                            dispatch(actions.setSongId(item?.encodeId));
                            dispatch(actions.setPlay(true));
                            dispatch(
                              actions.setRecent({
                                encodeId: item?.encodeId,
                                thumbnailM: item?.thumbnailM,
                                title: item?.title,
                                artistsNames: item?.artistsNames,
                              })
                            );
                          }}
                        >
                          <div className="w-[18%]">
                            <img
                              src={item?.thumbnailM}
                              alt=""
                              className="h-[40px] w-[40px]"
                            />
                          </div>
                          <div className="w-[70%] flex flex-col">
                            <span className="text-[14px]  w-full">
                              {item?.title?.length > 20
                                ? `${item?.title?.slice(0, 20)}...`
                                : item?.title}{' '}
                              <span>
                                {item?.hasOwnProperty('previewInfo') ? (
                                  <span>{icons.WorkspacePremiumIcon}</span>
                                ) : (
                                  ''
                                )}
                              </span>
                            </span>
                            <span className="text-[12px] text-[#32323D80] ">
                              {item?.artistsNames?.length > 20
                                ? `${item?.artistsNames?.slice(0, 20)}...`
                                : item?.artistsNames}
                            </span>
                          </div>
                          <div className="time_song w-[10%] text-right text-[12px] text-[#32323D80]">
                            {moment.unix(item?.duration).format('mm:ss')}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              <div className="flex justify-center w-full">
                <button
                  type="button"
                  className="text-center mt-5 px-12 py-2 text-[#218888] rounded-full border border-[#218888]"
                  onClick={() =>
                    navigate(
                      fetchDataChart?.dataNewRelease?.weekChart?.korea?.link.split(
                        '.'
                      )[0],
                      {
                        state: {
                          playlistId:
                            fetchDataChart?.dataNewRelease?.weekChart?.korea
                              ?.playlistId,
                          country: 'korea',
                        },
                      }
                    )
                  }
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-56"></div>
      </div>
    </>
  );
};

export default ZingChart;
