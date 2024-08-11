/* eslint-disable react/prop-types */
import React from 'react';

const ArtistItems = ({ artist }) => {
  return (
    <>
      <div className="container_artists mt-5">
        <img src={artist?.thumbnail} alt="" className="img_artist w-32 h-32 " />
        <p className="name_artist"></p>
        <p className="concerned"></p>
        <button className="click_concerned"></button>
      </div>
    </>
  );
};

export default ArtistItems;
