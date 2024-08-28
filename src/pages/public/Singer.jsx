/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store-redux/actions/index';
import { Items, Lists, SelectionItems } from '../../components';
import * as apis from '../../apis/index';
import icons from '../../ultil/icon';
import ListItems from '../../components/ListItems';
import ArtistItems from '../../components/ArtistItems';

const Singer = () => {
  const { searchSong, searchSongArtist } = useSelector((state) => state.music);
  const refView = useRef();
  const [singer, setSinger] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apis.searchPlaylist(searchSong?.top?.alias);
        // console.log(response, ' Singer');
        if (response?.data?.err === 0) {
          setSinger(response?.data?.data);
        }
      } catch (error) {
        console.log('Lỗi ở searchPlayList');
      }
    };
    fetchData();
  }, [searchSong]);
  useEffect(() => {
    refView.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [singer]);

  return (
    <>
      <div className="container_singer w-[93%] m-auto pt-14">
        <div className="introduce_artist w-full flex  justify-between">
          <div ref={refView} className="artist_profile w-full  flex  gap-10">
            <div className="w-[140px] h-[140px] ">
              <img src={singer?.thumbnailM} alt="" className="rounded-full" />
            </div>
            <div className="profile flex flex-col items-start justify-start">
              <div className="w-full flex items-center gap-4">
                <h1 className="text-[60px] font-bold text-[#32323D]">
                  {singer?.name}
                </h1>
                <span>{icons.PlayCircleIconLs}</span>
              </div>
              <div className="flex  w-full  justify-start h-full items-center">
                <span className="text-[14px] text-[#32323D] font-semibold mr-5">
                  {singer?.follow.toLocaleString('vi-VN')} người quan tâm
                </span>

                <div className="flex justify-center items-center py-[4px] px-[24px] gap-2 rounded-full border cursor-pointer border-[#7e7e84]">
                  <span className="text-[#7e7e84] h-7">
                    {icons?.PersonAddAltIcon}
                  </span>
                  <p className="text-[#4a4a4f]">QUAN TÂM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-10">
          <div className="flex max-w-[95%] justify-between m-auto mt-4 mb-6  items-center">
            <div className="text-[20px]  font-medium text-[#32323D]  ">
              Bài Hát Nổi Bật
            </div>
            <div className="text-[14px] font-medium text-[#696969]">
              Tất cả <span> {icons.ArrowForwardIosIcon}</span>
            </div>
          </div>
          <div className="container_song mb-[20px]">
            <div className="top_artist flex w-full justify-between gap-3 flex-wrap px-[36px] flex-row ">
              {singer?.sections[0]?.items?.slice(0, 6).map((item) => {
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
        </div>
        <div className="mt-10 ">
          <div className="flex max-w-[95%] justify-between m-auto mt-4 mb-6  items-center">
            <div className="text-[20px] font-medium text-[#32323D]  ">
              Single & EP
            </div>
            <div className="text-[14px] font-medium text-[#696969]">
              Tất cả <span> {icons.ArrowForwardIosIcon}</span>
            </div>
          </div>
          <div className=" max-w-[96%] m-auto h-full flex  items-center mt-5 justify-center">
            {singer?.sections[1]?.items?.slice(0, 5).map((item) => {
              return <SelectionItems key={item.encodeId} style items={item} />;
            })}
          </div>
        </div>
        <div className="mt-10 ">
          <div className="flex justify-between mt-4 max-w-[94%] m-auto mb-6  items-center">
            <div className="text-[20px] font-medium text-[#32323D]  ">
              Album
            </div>
            <div className="text-[14px] font-medium text-[#696969]">
              Tất cả <span> {icons.ArrowForwardIosIcon}</span>
            </div>
          </div>
          <div
            className={`
              h-full flex  items-center mt-5 justify-center max-w-[96%] m-auto `}
          >
            {singer?.sections[2]?.items?.slice(0, 5).map((item) => {
              return <SelectionItems key={item.encodeId} items={item} style />;
            })}
          </div>
        </div>
        <div className="mt-10 ">
          <div className="flex justify-between mt-4 max-w-[94%] m-auto mb-6  items-center">
            <div className="text-[20px] font-medium text-[#32323D]  ">
              Tuyển tập
            </div>
            <div className="text-[14px] font-medium text-[#696969]">
              Tất cả <span> {icons.ArrowForwardIosIcon}</span>
            </div>
          </div>
          <div
            className={`
              h-full flex  items-center mt-5 justify-start max-w-[96%] m-auto  `}
          >
            {singer?.sections[4]?.items?.slice(0, 5).map((item) => {
              return <SelectionItems key={item.encodeId} items={item} style />;
            })}
          </div>
        </div>
        <div className="mt-10 ">
          <div className="flex justify-between mt-4 max-w-[94%] m-auto mb-6  items-center">
            <div className="text-[20px] font-medium text-[#32323D]  ">
              Xuất hiện trong
            </div>
            <div className="text-[14px] font-medium text-[#696969]">
              Tất cả <span> {icons.ArrowForwardIosIcon}</span>
            </div>
          </div>
          <div
            className={`
              h-full flex  items-center mt-5 justify-start max-w-[96%] m-auto  `}
          >
            {singer?.sections[5]?.items?.slice(0, 5).map((item) => {
              return <SelectionItems key={item?.encodeId} items={item} style />;
            })}
          </div>
        </div>
        <div className="mt-10 ">
          <div className="flex justify-between mt-4 max-w-[94%] m-auto mb-6  items-center">
            <div className="text-[20px] font-medium text-[#32323D]  ">
              Có thể bạn thích
            </div>
            <div className="text-[14px] font-medium text-[#696969]">
              Tất cả <span> {icons.ArrowForwardIosIcon}</span>
            </div>
          </div>
          <div
            className={`
              h-full flex  items-center mt-5 justify-between max-w-[96%] m-auto  `}
          >
            {singer?.sections[6]?.items?.slice(0, 5)?.map((item) => {
              return (
                <div key={item?.id} className="information_artist flex ">
                  <ArtistItems artist={item} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 ">
          <div className=" mt-4 px-[39px] m-auto mb-6 ">
            <div className="text-[20px] font-medium text-[#32323D] mb-5 ">
              Về <span className="font-bold">{singer?.name}</span>
            </div>
            <div className="flex gap-5">
              <div className=" w-45%">
                <img
                  src={singer?.thumbnailM}
                  alt=""
                  className="w-[400px] h-[260px] object-cover"
                />
              </div>
              <div className="`introduce w-[45%] h-[260px]">
                <div
                  className="text-[#4c4f4f] text-justify text-[14px] w-full mb-14"
                  dangerouslySetInnerHTML={{
                    __html: `${
                      singer?.biography?.length > 220
                        ? `${
                            singer?.biography?.slice(0, 295) +
                            '...<span style="color: blue;  cursor: pointer;">Xem thêm</span>'
                          }`
                        : singer?.biography
                    }`,
                  }}
                />
                <div className="flex flex-row gap-4">
                  <div className="text-center w-[30%]">
                    <span className="text-[20px] text-[#32323D] font-bold">
                      {' '}
                      {singer?.follow?.toLocaleString()}
                    </span>{' '}
                    <p className="text-[14px] text-[#696969] ">
                      Người quan tâm
                    </p>
                  </div>
                  <div className="text-center w-[30%]">
                    <span className="text-[20px] text-[#32323D] font-bold">
                      {' '}
                      {singer?.awards?.length > 0 ? singer?.awards?.length : 0}
                    </span>{' '}
                    <p className="text-[14px] text-[#696969] ">Giải thưởng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-52"></div>
      </div>
    </>
  );
};

export default Singer;
