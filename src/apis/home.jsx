import instance from '../axios';

export const getHome = () =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await instance({
        url: '/home',
        method: 'get',
      });
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
