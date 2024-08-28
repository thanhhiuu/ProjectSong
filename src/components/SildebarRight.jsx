/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from 'react';
import icons from '../ultil/icon';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from '../apis/index';
import { useParams } from 'react-router-dom';
import * as actions from '../store-redux/actions/index';
import SongItem from './SongItem';
import ListItems from './ListItems';
import moment from 'moment';
const SildebarRight = () => {
  const { title, pid } = useParams();
  const [isValue, setIsValue] = useState(true);
  const [isPlaylist, setIsPlaylist] = useState(null);

  const { currentPlaylist, currentSongId, currentRecent } = useSelector(
    (state) => state.music
  );
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const apiPlaylist = await apis.getdetailPlaylist(currentPlaylist);
        const apiSongs = await apis.getSongInfo(currentSongId);

        if (apiPlaylist?.data?.err === 0 && apiSongs?.data?.err === 0) {
          setIsPlaylist({
            dataPlaylist: apiPlaylist?.data?.data,
            dataSongs: apiSongs,
          });
        }
      };
      // console.log(isPlaylist, 'Right');
      fetchData();
    } catch (error) {
      console.log('Lỗi ở right: ' + error.message);
    }
    setIsValue(true);
  }, [currentSongId]);

  // console.log(currentRecent, ' currentRecent');
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="header_right flex-none w-[100%] px-2 h-[70px] gap-2 flex flex-row items-center justify-between">
          <div className="left_header  bg-[#DDE4E4] h-[40px] w-[80%] flex justify-center items-center gap-2 p-[3px] rounded-full">
            <span
              onClick={() => setIsValue((e) => !e)}
              className={`text-[12px] font-sans h-[32px] px-2 w-[50%] flex justify-center items-center  ${
                isValue ? 'rounded-full bg-[#E7EDED]' : ''
              }`}
            >
              Danh sách phát
            </span>
            <span
              onClick={() => setIsValue((e) => !e)}
              className={`text-[12px] font-sans h-[32px] px-2 w-[50%] flex justify-center items-center  ${
                !isValue ? 'rounded-full bg-[#E7EDED]' : ''
              }`}
            >
              Nghe gần đây
            </span>
          </div>
          <div className="right_header w-[25%] flex flex-row gap-1 ">
            <span className="h-[32px] w-[32px] flex justify-center bg-[#E7EDED] rounded-full items-center">
              {icons.AccessAlarmIcon}
            </span>
            <span
              className="h-[32px] w-[32px] flex justify-center bg-[#E7EDED] rounded-full items-center"
              onClick={() => handlerRemove()}
            >
              {icons.DeleteForeverIcon}
            </span>
          </div>
        </div>
        {isValue ? (
          <>
            {' '}
            <div className="songcurrent px-2">
              <SongItem
                songData={isPlaylist?.dataSongs?.data?.data}
                styles={'bg-[#0E8080]'}
                sm
              />
            </div>
            <div className="content_playlist w-[100%] py-1 px-2 h-[70px]">
              <span className="text-[#32323D] text-[14px] font-bold ">
                Tiếp theo
              </span>
              <div className="flex gap-1">
                {' '}
                <p className="text-[#919494]  text-[14px] ">Từ playlist</p>
                <span className="text-[#0E8080]  text-[14px] ">
                  {isPlaylist?.dataPlaylist?.title}
                </span>
              </div>
            </div>
            <div className="list_songs px-2 w-full flex-auto  overflow-hidden overflow-y-auto mt-2  scrollbar-hide">
              {isPlaylist?.dataPlaylist?.song?.items?.map((item) => {
                return (
                  <div
                    key={item.encodeId}
                    className="flex animate-pulse  hover:bg-[#DDE4E4] rounded-l-lg rounded-r-lg items-center h-[60px] cursor-pointer  "
                    onClick={() => {
                      dispatch(actions.setSongId(item?.encodeId));
                      dispatch(actions.setPlay(true));
                    }}
                  >
                    <div className="w-[100%] flex gap-2 px-2 ">
                      <div className="song_img relative w-[40px]">
                        <img
                          src={item?.thumbnail}
                          className="w-[40px] h-[40px] rounded-sm"
                          alt="thumbnail"
                        />
                      </div>
                      <div className="">
                        {' '}
                        <span
                          className={`album_song text-left flex-1 text-[14px] w-[38%] `}
                        >
                          {item?.title?.length > 30
                            ? `${item?.title?.slice(0, 30)}...`
                            : item?.title}{' '}
                          <span>
                            {item?.hasOwnProperty('previewInfo') ? (
                              <span>{icons.WorkspacePremiumIcon}</span>
                            ) : (
                              ''
                            )}
                          </span>
                        </span>
                        <p className="text-[12px] text-[#32323D80] ">
                          {item?.artistsNames?.length > 30
                            ? `${item?.artistsNames?.slice(0, 30)}...`
                            : item?.artistsNames}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="mb-[100px]"></div>
            </div>
          </>
        ) : (
          <div className="list_songs px-2 w-full flex-auto  overflow-hidden overflow-y-auto mt-2  scrollbar-hide">
            {currentRecent?.map((item) => {
              return (
                <div
                  key={item.encodeId}
                  className="flex animate-pulse  hover:bg-[#DDE4E4] rounded-l-lg rounded-r-lg items-center h-[60px] cursor-pointer  "
                  onClick={() => {
                    dispatch(actions.setSongId(item?.encodeId));
                    dispatch(actions.setPlay(true));
                  }}
                >
                  <div className="w-[100%] flex gap-2 px-2 ">
                    <div className="song_img relative w-[40px]">
                      <img
                        src={item?.thumbnailM}
                        className="w-[40px] h-[40px] rounded-sm"
                        alt="thumbnail"
                      />
                    </div>
                    <div className="">
                      {' '}
                      <span
                        className={`album_song text-left flex-1 text-[14px] w-[38%] `}
                      >
                        {item?.title?.length > 30
                          ? `${item?.title?.slice(0, 30)}...`
                          : item?.title}{' '}
                        <span>
                          {item?.hasOwnProperty('previewInfo') ? (
                            <span>{icons.WorkspacePremiumIcon}</span>
                          ) : (
                            ''
                          )}
                        </span>
                      </span>
                      <p className="text-[12px] text-[#32323D80] ">
                        {item?.artistsNames?.length > 30
                          ? `${item?.artistsNames?.slice(0, 30)}...`
                          : item?.artistsNames}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="mb-[100px]"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default SildebarRight;
