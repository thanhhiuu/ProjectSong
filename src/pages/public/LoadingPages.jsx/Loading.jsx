import React from 'react';

const Loading = () => {
  return (
    <div className="flex w-[89%] m-auto gap-2 mt-5">
      <div className="playlist_header w-[30%] h-full animate-pulse">
        <div className="img_header w-full relative overflow-hidden">
          <div className="w-full h-[200px] bg-gray-400 rounded-xl"></div>
          <div className="absolute z-10 top-[45%] left-[50%] translate-x-[-50%]">
            <div className="w-[40px] h-[40px] bg-gray-400 rounded-full"></div>
          </div>
        </div>
        <div className="content_header text-center mt-4">
          <div className="h-[24px] bg-gray-400 rounded mb-2"></div>
          <div className="h-[16px] bg-gray-400 rounded mb-2"></div>
          <div className="h-[16px] bg-gray-400 rounded mb-2"></div>
          <div className="h-[16px] bg-gray-400 rounded mb-2"></div>
          <button className="w-[180px] h-[50px] bg-gray-400 rounded-full text-white mt-4 mb-4"></button>
        </div>
      </div>

      <div className="playlist_song w-[70%] animate-pulse">
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
        <div className="description flex pl-[10px] gap-1 mb-4">
          <div className="h-[16px] bg-gray-400 rounded w-[10%]"></div>
          <div className="h-[16px] bg-gray-400 rounded flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
