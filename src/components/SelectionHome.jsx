/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../ultil/icon';
import * as actions from '../store-redux/actions/index';
import { useNavigate } from 'react-router-dom';
import SelectionItems from './SelectionItems';
const Chill = ({ data, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const maxIndex = data.length - 5;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [data]);
  // const handlerPlaylist = (item) => {
  //   dispatch(actions.setPlaylist(item?.encodeId));
  //   const path = item?.link?.split('.')[0];
  //   console.log(path, 'oathhh');
  //   navigate(path);
  // };
  return (
    <>
      <div className="flex max-w-[98%] justify-between m-auto mt-4 mb-6  items-center">
        <div className="text-[20px] font-bold font-sans text-black  ">
          {title}
        </div>
        <div className="text-[14px] font-bold font-sans text-black">
          Tất cả <span> {icons.ArrowForwardIosIcon}</span>
        </div>
      </div>

      <div className="w-full h-full flex  items-center mt-5 justify-center">
        {data.slice(currentIndex, currentIndex + 5).map((item) => {
          return <SelectionItems key={item.encodeId} items={item} />;
        })}
      </div>
    </>
  );
};

export default Chill;
