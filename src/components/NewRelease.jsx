/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import icons from '../ultil/icon';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from '@mui/material';
import { SongItems } from '.';
import * as actions from '../store-redux/actions/index';
import NewReleaseLd from '../pages/public/LoadingPages.jsx/NewReleaseLd';

const newRelease = ({ title }) => {
  const { newrelease } = useSelector((state) => state.app);
  const { currentLoading } = useSelector((state) => state.music);
  const [isActive, setIsActive] = useState(0);
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  console.log(newrelease, 'llll');
  useEffect(() => {
    dispatch(actions?.setLoading(false));
    isActive === 0
      ? setSongs(newrelease?.all)
      : isActive === 1
      ? setSongs(newrelease?.vPop)
      : setSongs(newrelease?.others);
    dispatch(actions?.setLoading(true));
  }, [isActive, newrelease]);

  return (
    <>
      {currentLoading ? (
        <>
          {' '}
          <div className="flex max-w-[98%] justify-between m-auto mt-4 mb-6  items-center">
            <div className="text-[20px] font-bold font-sans text-black  ">
              {title}
            </div>
            <div className="text-[14px] font-bold font-sans text-black">
              Tất cả <span> {icons.ArrowForwardIosIcon}</span>
            </div>
          </div>
          <div className="newrelease_other flex m-auto  max-w-[98%] gap-6">
            <div>
              <button
                type="button"
                onClick={() => setIsActive(0)}
                className={`${
                  isActive === 0
                    ? 'bg-[#0e8080] text-[#fff]'
                    : ' text-[#000] border border-slate-400'
                }  px-[24px] py-[4px] text-[12px] rounded-l-full rounded-r-full `}
              >
                TẤT CẢ
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsActive(1)}
                className={`${
                  isActive === 1
                    ? 'bg-[#0e8080] text-[#fff]'
                    : 'text-[#000] border border-slate-400'
                }  px-[24px] py-[4px]  text-[12px] rounded-l-full rounded-r-full  `}
              >
                VIỆT NAM
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsActive(2)}
                className={`${
                  isActive === 2
                    ? 'bg-[#0e8080] text-[#fff]'
                    : ' text-[#000] border border-slate-400'
                } px-[24px] py-[4px]  text-[12px] rounded-l-full rounded-r-full  `}
              >
                QUỐC TẾ
              </button>
            </div>
          </div>
          <div className="container_item w-[98%] h-[550px] flex min-[1024px]:h-[340px] flex-wrap  flex-col  m-auto mt-4 mb-6">
            {songs?.slice(0, 12).map((item) => {
              return (
                <div key={item.encodeId} className="flex flex-wrap  ">
                  <SongItems songData={item} />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <NewReleaseLd />
      )}
    </>
  );
};

export default newRelease;
