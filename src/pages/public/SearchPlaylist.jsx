import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store-redux/actions/index';
import { Lists, SelectionItems } from '../../components';
import * as apis from '../../apis/index';
const SearchPlaylist = () => {
  const { searchSong, searchSongArtist } = useSelector((state) => state.music);

  const [searchPlayList, setSearchPlayList] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apis.searchPlaylist(searchSong?.top?.alias);
        if (response?.data?.err === 0) {
          setSearchPlayList(response?.data?.data?.sections[1]);
        }
      } catch (error) {
        console.log('Lỗi ở searchPlayList');
      }
    };
    fetchData();
  }, [searchSong]);

  return (
    <>
      <div className="w-[97%] m-auto">
        <div className=" w-[98%] m-auto text-xl font-bold mb-4">
          Playlist/Album
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {searchPlayList?.items?.map((item) => (
            <div key={item.encodeId} className="min-h-[0] mb-6">
              <SelectionItems items={item} style sm />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPlaylist;
