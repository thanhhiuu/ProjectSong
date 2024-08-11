/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Lists } from '.';
// eslint-disable-next-line react/prop-types
const List = ({ songs }) => {
  return (
    <>
      <div>
        {songs?.items?.map((item) => {
          return (
            <div
              className="p-[10px]  border-b hover:bg-[#DDE4E4] "
              key={item?.encodeId}
            >
              <Lists songData={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default memo(List);
