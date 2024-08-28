import React from 'react';
import ArtistItems from './ArtistItems';
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Artist = ({ nameArtist }) => {
  return (
    <>
      <div className="flex justify-center items-center gap-4 ">
        {nameArtist?.map((item) => {
          return (
            <div
              key={item?.id}
              className="information_artist flex justify-between  "
            >
              <ArtistItems artist={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Artist;
