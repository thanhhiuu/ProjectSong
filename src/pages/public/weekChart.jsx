/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import path from '../../ultil/path';
import * as apis from '../../apis/index';
import icons from '../../ultil/icon';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store-redux/actions/index';

const WeekChart = ({ data }) => {
  const navigate = useNavigate();
  const { title, pid } = useParams();
  const location = useLocation();
  const [isValues, setIsValues] = useState();
  const [dataWeekChart, setDataWeekChart] = useState(null);
  const [fetchDataChart, setFetchDataChart] = useState(null);
  const { countryWeekchart } = useSelector((state) => state.music);
  console.log(fetchDataChart, ' fetchDataChart');
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
    try {
      const fetchData = async () => {
        const response = await apis.getdetailPlaylist(
          location.state?.playlistId
        );

        if (response) {
          setDataWeekChart(response);
        }
      };

      fetchData();
    } catch (error) {
      console.log('Lỗi ở weekchart' + error.message);
    }
  }, [location.state?.playlistId, isValues, pid]);

  useEffect(() => {
    if (!fetchDataChart || !countryWeekchart) {
      console.log('fetchDataChart hoặc countryWeekchart chưa sẵn sàng');
      return;
    }

    try {
      const fetchData = async () => {
        const playlistId =
          countryWeekchart === 'vn'
            ? fetchDataChart?.dataNewRelease?.weekChart?.vn?.playlistId
            : countryWeekchart === 'us'
            ? fetchDataChart?.dataNewRelease?.weekChart?.us?.playlistId
            : fetchDataChart?.dataNewRelease?.weekChart?.korea?.playlistId;

        if (!playlistId) {
          console.log('Không tìm thấy playlistId phù hợp.');
          return;
        }
        if (
          playlistId ===
          fetchDataChart?.dataNewRelease?.weekChart?.vn?.playlistId
        ) {
          setIsValues(0);
        } else if (
          playlistId ===
          fetchDataChart?.dataNewRelease?.weekChart?.us?.playlistId
        ) {
          setIsValues(1);
        } else {
          setIsValues(2);
        }
        const response = await apis.getdetailPlaylist(playlistId);

        if (response?.data?.err === 0) {
          setDataWeekChart(response);
          console.log('Data Week Chart:', response);
        }
      };

      fetchData();
    } catch (error) {
      console.log('Lỗi ở weekchart: ' + error.message);
    }
  }, [countryWeekchart, fetchDataChart]);

  console.log(dataWeekChart, 'jojhyu');

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await apis.getdetailPlaylist(dataWeekChart);
        console.log(response, ' res');
        if (response?.data?.err === 0) {
          setDataWeekChart(response);
        }
      };

      fetchData();
    } catch (error) {
      console.log('Lỗi ở weekchart' + error.message);
    }
  }, [location.state?.playlistId, isValues]);
  return (
    <>
      <div className="w-[94%] m-auto">
        <div className="my-7 flex gap-2 items-center">
          <h1 className="text-[40px] text-[#0D7373] font-bold">
            Bảng Xếp Hạng Tuần
          </h1>
          <span>{icons.PlayCircleIconLs}</span>
        </div>
        <div className="my-7 flex  items-center gap-10">
          <button
            type="button"
            onClick={() => {
              setIsValues(0);
              setDataWeekChart(
                fetchDataChart?.dataNewRelease?.weekChart.vn?.playlistId
              );
              navigate(
                fetchDataChart?.dataNewRelease?.weekChart?.vn?.link.split(
                  '.'
                )[0]
              );
            }}
            className={`${
              isValues === 0 ||
              `${location?.state?.country === 'vn' ? setIsValues(0) : ''}`
                ? 'py-[15px] text-[24px] border-b-[3px] border-[#0D7373] text-[#0D7373] font-bold '
                : 'py-[15px] text-[24px] text-[#32323D] font-bold '
            }cursor-pointer`}
          >
            VIỆT NAM
          </button>
          <button
            type="button"
            onClick={() => {
              setIsValues(1);
              setDataWeekChart(
                fetchDataChart?.dataNewRelease?.weekChart.us?.playlistId
              );
              navigate(
                fetchDataChart?.dataNewRelease?.weekChart?.us?.link.split(
                  '.'
                )[0]
              );
            }}
            className={`${
              isValues === 1 ||
              `${location?.state?.country === 'us' ? setIsValues(1) : ''}`
                ? 'py-[15px] text-[24px] border-b-[3px] border-[#0D7373] text-[#0D7373] font-bold '
                : 'py-[15px] text-[24px] text-[#32323D] font-bold '
            }cursor-pointer`}
          >
            US-UK
          </button>
          <button
            type="button"
            onClick={() => {
              setIsValues(2);
              setDataWeekChart(
                fetchDataChart?.dataNewRelease?.weekChart.korea?.playlistId
              );
              navigate(
                fetchDataChart?.dataNewRelease?.weekChart?.korea?.link.split(
                  '.'
                )[0]
              );
            }}
            className={`${
              isValues === 2 ||
              `${location?.state?.country === 'korea' ? setIsValues(2) : ''}`
                ? 'py-[15px] text-[24px] border-b-[3px] border-[#0D7373] text-[#0D7373] font-bold '
                : 'py-[15px] text-[24px] text-[#32323D] font-bold '
            } cursor-pointer`}
          >
            K-POP
          </button>
        </div>
        <div>
          {dataWeekChart?.data?.data?.song?.items?.map((item, index) => {
            return (
              <>
                {' '}
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
                    <div className="w-[5%]">
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
        </div>
        <div className="mb-44"></div>
      </div>
    </>
  );
};

export default WeekChart;
