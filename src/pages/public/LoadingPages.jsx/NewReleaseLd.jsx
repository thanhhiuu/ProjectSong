import React from 'react';

const NewReleaseLd = () => {
  return (
    <>
      <div className="flex max-w-[98%] justify-between m-auto mt-4 mb-6 items-center animate-pulse">
        <div className="h-[20px] w-[150px] bg-gray-500 rounded"></div>
        <div className="h-[14px] w-[100px] bg-gray-500 rounded"></div>
      </div>
      <div className="newrelease_other flex m-auto max-w-[98%] gap-6 animate-pulse">
        <div className="w-[100px] h-[32px] bg-gray-500 rounded-l-full rounded-r-full"></div>
        <div className="w-[100px] h-[32px] bg-gray-500 rounded-l-full rounded-r-full"></div>
        <div className="w-[100px] h-[32px] bg-gray-500 rounded-l-full rounded-r-full"></div>
      </div>
      <div className="container_item w-[98%] justify-between flex flex-wrap h-[321px] m-auto mt-4 mb-6 animate-pulse">
        <div className="w-[400px] h-[300px] bg-gray-500 rounded mb-4"></div>
        <div className="w-[400px] h-[300px] bg-gray-500 rounded mb-4"></div>
        <div className="w-[500px] h-[300px] bg-gray-500 rounded mb-4"></div>
      </div>
    </>
  );
};

export default NewReleaseLd;
