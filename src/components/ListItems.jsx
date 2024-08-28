/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/rules-of-hooks */
import moment from 'moment';
import * as actions from '../store-redux/actions/index';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../ultil/icon';
import '../App.css';

const lists = ({ songData, search, style }) => {
  const dispatch = useDispatch();
  const { currentRecent } = useSelector((state) => state.music);
  return (
    <>
      <div
        className="flex w-full animate-pulse items-center cursor-pointer "
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
            style ? 'w-[560px] flex gap-2' : 'w-[45.5%] flex gap-2 '
          }`}
        >
          <div className="song_img relative w-[40px]">
            <img
              src={songData?.thumbnail}
              className="w-[40px] h-[40px] rounded-lg"
              alt="thumbnail"
            />
            {/* {currentSongId === songData?.encodeId ? (
              <span className="loader absolute z-50 top-[45%] left-[50%] translate-x-[-50%] "></span>
            ) : (
              ''
            )} */}
          </div>
          <div className="">
            {' '}
            <span
              className={`album_song text-left flex-1 text-[14px] w-[38%] 
            `}
            >
              {songData?.title?.length > 30
                ? `${songData?.title?.slice(0, 30)}...`
                : songData?.title}{' '}
              <span>
                {songData?.hasOwnProperty('previewInfo') ? (
                  <span>{icons.WorkspacePremiumIcon}</span>
                ) : (
                  ''
                )}
              </span>
            </span>
            <p className="text-[12px] text-[#32323D80] ">
              {songData?.artistsNames?.length > 30
                ? `${songData?.artistsNames?.slice(0, 30)}...`
                : songData?.artistsNames}
            </p>
          </div>
        </div>
        <p className="text-[12px] text-[#32323D80] w-[50%]">
          {search ? '' : songData?.album?.title}
        </p>
        <div className="time_song text-right text-[12px] text-[#32323D80]">
          {moment.unix(songData?.duration).format('mm:ss')}
        </div>
      </div>
    </>
  );
};

export default memo(lists);
