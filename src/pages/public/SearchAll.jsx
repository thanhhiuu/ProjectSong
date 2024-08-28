/* eslint-disable no-prototype-builtins */
import React from 'react';
import { useSelector } from 'react-redux';
import { Items, SelectionItems } from '../../components';
import ListItems from '../../components/ListItems';
import ArtistItems from '../../components/ArtistItems';
import icons from '../../ultil/icon';

const SearchAll = () => {
  const { searchSong } = useSelector((state) => state.music);

  // console.log(searchSong, ' searchSong');
  return (
    <>
      {searchSong?.counter?.artist !== 0 ? (
        <>
          <div className="w-full">
            <div className="  px-[36px] pb-[20px] ">
              <h1 className="text-[20px] font-bold">Nổi Bật</h1>
            </div>
            <div className="container_top mb-[20px] ">
              {searchSong?.top?.hasOwnProperty('name') ? (
                <div className="top_artist flex w-full justify-between flex-wrap px-[36px] flex-row ">
                  <div className=" w-[30%]  ">
                    <Items data={searchSong} />
                  </div>
                  {searchSong?.songs?.slice(0, 2).map((item) => {
                    return (
                      <div key={item.encodeId} className=" w-[33%] ">
                        <div>
                          <Items data={item} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="top_artist flex w-full justify-between flex-wrap px-[36px] flex-row ">
                  {searchSong?.songs?.slice(0, 3).map((item) => {
                    return (
                      <div key={item.encodeId} className=" w-[30%] ">
                        <div>
                          <Items data={item} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="  px-[36px] pb-[20px] ">
              <h1 className="text-[20px] font-bold">Bài Hát</h1>
            </div>
            <div className="container_song mb-[20px]">
              <div className="top_artist flex w-full justify-between gap-3 flex-wrap px-[36px] flex-row ">
                {searchSong?.songs?.slice(0, 6).map((item) => {
                  return (
                    <div
                      key={item.encodeId}
                      className=" w-[40%] h-[60px] border-b-[0.5px] flex justify-center items-center hover:bg-bg-slide  border-slate-400"
                    >
                      <ListItems songData={item} search style />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="  px-[36px] ">
              <h1 className="text-[20px] font-bold">Playlist/Album</h1>
            </div>
            <div className="top_artist w-[97%] m-auto h-full flex mb-[20px]  items-center mt-5 justify-center">
              {searchSong?.playlists?.slice(0, 5).map((item) => {
                return (
                  <SelectionItems key={item?.encodeId} items={item} style />
                );
              })}
            </div>
            <div className="  px-[36px] flex items-center justify-between ">
              <h1 className="text-[20px] font-bold">Nghệ sĩ/OA</h1>
              <span className="flex items-center gap-1 text-[14px]">
                Tất cả <span> {icons.ArrowForwardIosIcon}</span>
              </span>
            </div>
            <div className="artists flex w-full px-[36px] gap-1 justify-center items-center">
              {searchSong?.artists?.slice(0, 5).map((item, index) => {
                return <ArtistItems key={index} artist={item} style />;
              })}
            </div>
            <div className="mb-96"></div>
          </div>
        </>
      ) : (
        <div className="h-full w-full">
          <span className="flex h-full w-full justify-center items-center text-[20px]">
            {' '}
            Hiện tại không có thông tin bạn đang tìm kiếm !
          </span>
        </div>
      )}
    </>
  );
};

export default SearchAll;
