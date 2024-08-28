/* eslint-disable no-prototype-builtins */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store-redux/actions/index';
import { Lists } from '../../components';
const SearchSongs = () => {
  const { searchSong, searchSongArtist } = useSelector((state) => state.music);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions?.apiSearchSong(searchSong?.top?.id));
  }, [searchSong]);
  // console.log(searchSongArtist, ' iugiyfg8ioy');
  // console.log(searchSong, ' iugiydsadasdsadasfg8ioy');
  return (
    <>
      {searchSong.hasOwnProperty('top') ? (
        <div className="w-[96%] m-auto ">
          <p className="text-[20px] text-[#32323D] font-bold mb-5">Bài hát</p>
          {searchSongArtist?.items?.map((item) => {
            return (
              <div
                key={item.encodeId}
                className=" border-b py-3 border-[#aba9a9] hover:bg-bg-slide"
              >
                <Lists songData={item} />
              </div>
            );
          })}
          <div className="mb-52"></div>
        </div>
      ) : (
        <div className="w-[96%] m-auto ">
          <p className="text-[20px] text-[#32323D] font-bold mb-5">Bài hát</p>
          {searchSong?.songs?.map((item) => {
            return (
              <div
                key={item.encodeId}
                className=" border-b py-3 border-[#aba9a9] hover:bg-bg-slide"
              >
                <Lists songData={item} />
              </div>
            );
          })}
          <div className="mb-52"></div>
        </div>
      )}
    </>
  );
};

export default SearchSongs;
