/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React from 'react';

import * as actions from '../store-redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import icons from '../ultil/icon';

const SongItem = ({ songData }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className=" flex items-center flex-wrap  hover:bg-[#DDE4E4]  flex-auto w-[100%]  h-[80px]  gap-2 "
        onClick={() => {
          dispatch(actions.setSongId(songData?.encodeId));
          dispatch(actions.setPlay(true));
        }}
      >
        <div className="song_img relative  w-[60px] h-[60px]  ">
          <img
            src={songData?.thumbnail}
            className="w-full h-full rounded-sm"
            alt="thumbnail"
          />
        </div>
        <div className=" h-[60px]  w-[60%] ">
          <div className="flex flex-col items-start justify-start">
            <span className="album_song text-left flex-1 text-[14px] h-1">
              {songData?.title?.length > 30
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
            <span className="text-[12px] text-[#32323D80] ">
              {songData?.artistsNames?.length > 30
                ? `${songData?.artistsNames?.slice(0, 30)}...`
                : songData?.artistsNames}
            </span>
            <span className="text-[12px] text-[#32323D80] ">
              {moment(songData?.releaseDate * 1000).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongItem;
