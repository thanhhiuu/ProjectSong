import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../src/App.css';
import * as actions from '../../store-redux/actions/index';
import { useNavigate } from 'react-router-dom';

const Banners = () => {
  const { banner } = useSelector((state) => state.app);

  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!banner || banner.length === 0) return;

    const maxIndex = banner.length - 5;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [banner]);
  const hanlClickSong = (item) => {
    if (item?.type === 4) {
      dispatch(actions.setPlaylist(item?.encodeId));
      const path = item?.link?.split('.')[0];
      // console.log(path, ' bannerPath');
      navigate(path);
    } else if (item?.type === 1) {
      dispatch(actions.setSongId(item?.encodeId));
      dispatch(actions.setPlay(true));
      // dispatch(
      //   actions.setRecent({
      //     encodeId: songData?.encodeId,
      //     thumbnailM: songData?.thumbnailM,
      //     title: songData?.title,
      //     artistsNames: songData?.artistsNames,
      //   })
      // );
    }
  };
  return (
    <>
      {/* <div className="absolute left-[18%] z-10 text-[#fff]">Pre</div> */}

      <div className="w-[95%] m-auto flex gap-5">
        {banner?.slice(currentIndex, currentIndex + 3).map((item, index) => (
          <div
            key={index}
            className=" transition-all ease-out gap  w-[33%] mt-6 mb-7"
          >
            <img
              src={item.banner}
              alt=""
              className="w-full h-full cursor-pointer rounded-3xl object-contain"
              onClick={() => hanlClickSong(item)}
            />
          </div>
        ))}
      </div>

      {/* <div className="absolute z-10 right-[24%] text-[#fff]">Next</div> */}
    </>
  );
};

export default Banners;
