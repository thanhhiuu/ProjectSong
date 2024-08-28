/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React from 'react';

import * as actions from '../store-redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import icons from '../ultil/icon';

const SongItem = ({ songData, styles, sm }) => {
  const dispatch = useDispatch();
  const { currentRecent } = useSelector((state) => state.music);
  return (
    <>
      <div
        className={`${
          styles
            ? `${styles} flex items-center p-2 flex-wrap rounded-r-lg my-1 rounded-l-lg flex-auto w-[100%]  h-[56px]  gap-2 `
            : ' flex items-center p-2 flex-wrap rounded-l-lg rounded-r-lg  hover:bg-[#f0f4f4]  flex-auto w-[100%]  h-[80px]  gap-2'
        }`}
        onClick={() => {
          dispatch(actions.setSongId(songData?.encodeId));
          dispatch(actions.setPlay(true));
          dispatch(
            actions.setRecent({
              encodeId: songData?.encodeId,
              thumbnailM: songData?.thumbnailM,
              title: songData?.title,
              artistsNames: songData?.artistsNames,
            })
          );
        }}
      >
        <div
          className={`${
            sm
              ? `w-[40px] h-[40px] relative`
              : 'song_img relative w-[60px] h-[60px]'
          }`}
        >
          <img
            src={songData?.thumbnail}
            className="w-full h-full rounded-sm"
            alt="thumbnail"
          />
        </div>
        <div className={`${sm ? ` h-[40px]  w-[80%]` : ' h-[60px]  w-[60%]'}`}>
          <div className="flex flex-col items-start justify-start">
            <span
              className={`${
                sm
                  ? 'album_song font-bold text-left flex-1 text-[14px] h-1 text-[#ffff]'
                  : 'album_song  text-left flex-1 text-[14px] h-1'
              }`}
            >
              {sm
                ? songData?.title?.length > 20
                  ? `${songData?.title?.slice(0, 20)}...`
                  : songData?.title
                : songData?.title?.length > 30
                ? `${songData?.title?.slice(0, 30)}...`
                : songData?.title}
              <span className="ml-1">
                {songData?.hasOwnProperty('previewInfo') ? (
                  <span>{icons.WorkspacePremiumIcon}</span>
                ) : (
                  ''
                )}
              </span>
            </span>
            <span
              className={`${
                sm
                  ? 'text-[12px] text-[#9DCBCB]'
                  : 'text-[12px] text-[#32323D80]'
              }`}
            >
              {songData?.artistsNames?.length > 30
                ? `${songData?.artistsNames?.slice(0, 30)}...`
                : songData?.artistsNames}
            </span>
            {sm ? (
              ''
            ) : (
              <span className="text-[12px] text-[#32323D80] ">
                {moment(songData?.releaseDate * 1000).fromNow()}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SongItem;
