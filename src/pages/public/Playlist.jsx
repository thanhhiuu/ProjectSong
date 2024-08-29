import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from '../../apis/index';
import icon from '../../ultil/icon';
import moment from 'moment';
import '../../App.css';
import * as actions from '../../store-redux/actions/index';
import { Artist, List } from '../../components/index';
import { Loading } from './LoadingPages.jsx/index';
import { useLocation, useParams } from 'react-router-dom';
const Playlist = () => {
  const { currentSongId, currentPlaylist, currentPlay, currentLoading } =
    useSelector((state) => state.music);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState({});
  const [isRandomSong, setIsRandomSong] = useState(true);
  const { title, pid } = useParams();
  const location = useLocation();

  useEffect(() => {
    try {
      const fechApiSong = async () => {
        dispatch(actions?.setLoading(false));
        const response = await apis.getdetailPlaylist(currentPlaylist);

        // console.log('Hihi ', response);
        if (response?.data.err === 0) {
          setPlaylist(response?.data?.data);
          dispatch(actions?.setLoading(true));
        }
      };

      fechApiSong();
    } catch (error) {
      error;
    }
  }, [pid, title, currentPlaylist, dispatch, currentPlay]);

  useEffect(() => {
    if (currentPlay) {
      dispatch(actions?.setPlay(true));
      setIsRandomSong(false);
    } else {
      dispatch(actions?.setPlay(false));
    }
  }, [currentPlay, isRandomSong, dispatch]);

  useEffect(() => {
    if (location?.state?.playLists) {
      const random = Math.round(Math.random() * playlist?.song?.items?.length);
      dispatch(actions?.setSongId(playlist?.song?.items[random]?.encodeId));
      dispatch(actions?.setPlay(true));
    }
  }, [pid]);
  return (
    <>
      {currentLoading ? (
        <>
          <div className={`flex w-[89%] m-auto gap-2 mt-5 `}>
            <div
              className={`playlist_header w-[30%] h-full  ${
                currentLoading ? 'animate-pulse' : ''
              }`}
            >
              <div className="img_header w-full relative overflow-hidden">
                <img
                  src={playlist?.thumbnailM}
                  className={`w-full hover:scale-110 bg-cover   transition duration-300  rounded-xl drop-shadow-lg `}
                  alt=""
                />

                {playlist?.song?.items?.some(
                  (e) => e.encodeId === currentSongId
                ) && currentPlay ? (
                  <span className="loader absolute z-10 top-[45%] left-[50%] translate-x-[-50%] "></span>
                ) : (
                  <span className=" absolute z-10 top-[45%] left-[50%] translate-x-[-50%] ">
                    {icon.PlayArrowIconPlay}
                  </span>
                )}
              </div>
              <div className="content_header text-center mt-4">
                <h1 className="font-bold text-xl ">{playlist?.title}</h1>
                <a className="text-xs text-gray-400">
                  {playlist?.artistsNames}
                </a>
                <p>
                  {/* Cập nhật:{' '} */}
                  {/* {dates.getDay() + ' ' + dates.getDate() + ' ' + dates.getYear()}{' '} */}
                </p>
                <p className="text-xs text-gray-400">
                  {moment
                    .unix(playlist?.contentLastUpdate)
                    .format('DD/MM/YYYY')}
                </p>
                <p className="text-xs text-gray-400">
                  {playlist?.like}K người yêu thích{' '}
                </p>
                <div className=" flex justify-center items-center">
                  <button
                    type="button"
                    className="w-[180px] btn_playpause rounded-full  text-[#fff] h-[50px] mt-4 mb-4 bg-[#0D7373]"
                    onClick={() =>
                      playlist?.song?.items?.some(
                        (e) => e.encodeId === currentSongId
                      )
                        ? dispatch(actions.setPlay(false))
                        : dispatch(actions.setPlay(true))
                    }
                  >
                    {!playlist?.song?.items?.some(
                      (e) => e.encodeId === currentSongId
                    ) ? (
                      <div className="flex justify-center items-center gap-1">
                        <span>{icon.PlayArrowIcon}</span>
                        <p className="text-[14px] "> PHÁT NGẪU NHIÊN</p>
                      </div>
                    ) : !currentPlay ? (
                      <div className="flex justify-center items-center gap-1">
                        <span>{icon.PlayArrowIcon}</span>
                        <p className="text-[14px] "> PHÁT BÀI HÁT </p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-1">
                        <span>{icon.PauseIcon}</span>
                        <p className="text-[14px] ">TẠM DỪNG PHÁT</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="playlist_song w-[70%] ">
              <div className="description flex pl-[10px] gap-1">
                <span className="text-gray-600 w-[15%] ">Lời tựa </span>
                <div className="">
                  {' '}
                  {playlist?.description?.length > 100 ? (
                    <>
                      {playlist?.description?.slice(0, 150)}
                      <span>...</span>
                      <span className="font-bold text-[#0e8080] cursor-pointer">
                        Xem thêm
                      </span>
                    </>
                  ) : (
                    playlist?.description
                  )}
                </div>
              </div>
              <div className="playlist_song">
                <div className="table_note flex  text-[12px] items-center text-[#696969] font-bold p-[10px] border-b">
                  <div className="flex-1">BÀI HÁT</div>
                  <div className="flex-1">ALBUM</div>
                  <div>THỜI GIAN</div>
                </div>
                <div className="overflow-y-scroll h-screen scrollbar-hide">
                  <List songs={playlist?.song} />
                </div>
              </div>
              <div className="pt-4 pl-[10px] text-[14px] text-[#696969]">
                {playlist?.song?.items?.length}{' '}
                <span className="">
                  bài hát -{' '}
                  <span>
                    {moment
                      .utc(playlist?.song?.totalDuration * 1000)
                      .format('HH [giờ] mm [phút]')}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="w-[89%] m-auto h-full mt-10 ">
            <div>
              <p>Nghệ sĩ tham gia</p>
            </div>
            <Artist nameArtist={playlist?.artists} />
          </div>
          <div className="mb-60 "></div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default memo(Playlist);
