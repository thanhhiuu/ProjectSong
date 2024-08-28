import React from 'react';
import path from '../ultil/path';
import { useNavigate } from 'react-router-dom';

const TopMusic = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full w-full ">
        <div className="flex flex-col items-center justify-center mt-[20%] ">
          <h1 className="text-[30px] text-[#32323D] mb-5">
            Hiện tại dữ liệu đang được update !
          </h1>
          <button
            type="button"
            className="text-[16px] py-2 px-16 border border-[#32323D] w-[20%] hover:bg-[#0E8080] hover:text-[#fff]  rounded-full"
            onClick={() => navigate(path.HOME)}
          >
            Về Home
          </button>
        </div>
      </div>
    </>
  );
};

export default TopMusic;
