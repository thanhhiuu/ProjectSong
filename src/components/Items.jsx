/* eslint-disable react/prop-types */
import React from 'react';
import { checkFollow } from '../ultil/fn';
import * as actions from '../store-redux/actions/index';
import { useDispatch } from 'react-redux';

const Items = ({ data }) => {
  // console.log(data, ' dataTop');
  const dispatch = useDispatch();
  return (
    <>
      <div className="  ">
        <div
          className="h-[104px] bg-bg-slide gap-2 flex items-center flex-row px-[10px]"
          onClick={() => {
            data?.top?.objectType === 'artist'
              ? ''
              : dispatch(actions?.setSongId(data?.encodeId)),
              dispatch(actions?.setPlay(true)),
              dispatch(
                actions.setRecent({
                  encodeId: data?.encodeId,
                  thumbnailM: data?.thumbnailM,
                  title: data?.title,
                  artistsNames: data?.artistsNames,
                })
              );
          }}
        >
          <div className="h-[84px] w-[84px]">
            {' '}
            <img
              src={
                data?.top?.objectType === 'artist'
                  ? data?.top?.thumbnail
                  : data?.thumbnailM
              }
              alt={
                data?.top?.objectType === 'artist'
                  ? data?.top?.title
                  : data?.thumbnailM
              }
              className={`${
                data?.top?.objectType === 'artist'
                  ? 'h-full w-full  rounded-full object-cover'
                  : 'h-full w-full rounded-lg object-cover'
              }`}
            />
          </div>
          <div className="flex flex-col">
            {data?.top?.objectType === 'artist' ? (
              <span className="text-[12px] text-[#696969]">Nghệ sĩ</span>
            ) : (
              <span className="text-[12px] text-[#696969]">Bài hát</span>
            )}
            {data?.top?.objectType === 'artist' ? (
              <span className="text-[14px] text-[#32323D] font-bold my-1">
                {data?.top?.name?.length > 20
                  ? data?.top?.name.slice(0, 10)
                  : data?.top?.name}
              </span>
            ) : (
              <span className="text-[14px] text-[#32323D] font-bold my-1">
                {data?.title?.length > 20
                  ? data?.title?.slice(0, 20) + '...'
                  : data?.title}
              </span>
            )}
            {data?.top?.objectType === 'artist' ? (
              <span className="text-[12px] text-[#696969]">
                {checkFollow(data?.artists[0]?.totalFollow) + ' quan tâm'}
              </span>
            ) : (
              <span className="text-[12px] text-[#696969]">
                {' '}
                {data?.artistsNames}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Items;
