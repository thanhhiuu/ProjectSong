/* eslint-disable react/prop-types */
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from '../apis/index';
import icons from '../ultil/icon';
import * as actions from '../store-redux/actions/index';
import moment from 'moment';

const Player = ({ setIsOnOff }) => {
  const { currentSongId, currentPlay, currentPlaylist } = useSelector(
    (state) => state.music
  );
  const [song, setSong] = useState(null);
  const [isShuffles, setIsShuffles] = useState(false);
  const [isRepeat, setRepeat] = useState(0);
  const [isLoadingSource, setIsLoadingSource] = useState(false);
  const [isKeyEvent, setIsKeyEvent] = useState(false);

  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingSource(true);
        const [fechApiSong, fechApiInfoSong, fechApiDetalPlaylist] =
          await Promise.all([
            apis?.getSongID(currentSongId),
            apis?.getSongInfo(currentSongId),
            apis?.getdetailPlaylist(currentPlaylist),
          ]);

        if (
          fechApiSong?.data?.err === 0 &&
          fechApiInfoSong?.data?.err === 0 &&
          fechApiDetalPlaylist?.data?.err === 0
        ) {
          setSong({
            dataSong: fechApiSong?.data?.data,
            dataInfoSong: fechApiInfoSong?.data?.data,
            dataPlaylist: fechApiDetalPlaylist?.data?.data,
          });
        }
        setIsLoadingSource(false);
        // console.log(song, 'Player');
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    };
    fetchData();
    console.log(song, 'song');
  }, [currentPlaylist, currentSongId]);
  console.log(song, ' Song');
  console.log(currentSongId, ' currentSongId');
  useEffect(() => {
    const handlePlayback = async () => {
      try {
        if (currentPlay) {
          if (audioRef.current.readyState >= 2) {
            await audioRef.current.play();
          } else {
            audioRef.current.addEventListener(
              'canplay',
              async () => {
                await audioRef.current.play();
              },
              { once: true }
            );
          }
        } else {
          audioRef.current.pause();
        }
      } catch (error) {
        console.error('Playback error:', error);
        dispatch(actions.setPlay(false));
      }
    };

    handlePlayback();
  });

  useEffect(() => {
    // console.log('shuffle ', isShuffles);
    // console.log('repeat ', isRepeat);
    // console.log('songs ', song?.dataPlaylist.song.items);
    // console.log('songsID ', currentSongId);
    const handlerEndSong = async () => {
      if (isShuffles) {
        await handleShuffle();
        // console.log('1');
      } else if (isRepeat === 2) {
        if (song?.dataPlaylist?.song?.items) {
          await handleNext();
        }

        // console.log('2');
      } else if (isRepeat === 1) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } else {
        dispatch(actions.setPlay(false));
      }
    };

    audioRef?.current?.addEventListener('ended', handlerEndSong);
    return () => {
      audioRef?.current?.removeEventListener('ended', handlerEndSong);
    };
  }, [
    isShuffles,
    isRepeat,
    audioRef,
    dispatch,
    currentSongId,
    currentPlaylist,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && song?.dataInfoSong?.duration) {
        setProgress(
          (audioRef.current.currentTime / song.dataInfoSong.duration) * 100
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [song?.dataInfoSong?.duration, audioRef?.current?.currentTime, progress]);

  const handleBeforeUnload = () => {
    dispatch(actions.setPlay(false));
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  const handlePlay = async () => {
    if (currentPlay) {
      dispatch(actions.setPlay(false));
      audioRef.current.pause();
    } else {
      dispatch(actions.setPlay(true));
      // try {
      //   if (audioRef.current.readyState >= 2) {
      //     await audioRef.current.play();
      //   } else {
      //     audioRef.current.addEventListener(
      //       'canplay',
      //       async () => {
      //         await audioRef.current.play();
      //       },
      //       { once: true }
      //     );
      //   }
      // } catch (error) {
      //   console.error('Failed to play audio:', error);
      //   dispatch(actions.setPlay(false));
      // }
    }
  };

  const handleShuffle = () => {
    if (song?.dataPlaylist?.song?.items) {
      let randomSong;
      do {
        randomSong = Math.floor(
          Math.random() * song.dataPlaylist.song.items.length
        );
      } while (
        song.dataPlaylist.song.items[randomSong].encodeId === currentSongId
      );

      dispatch(
        actions.setSongId(song.dataPlaylist.song.items[randomSong].encodeId)
      );
      dispatch(actions.setPlay(true));
    }
  };

  const handleNext = async () => {
    if (song?.dataPlaylist?.song?.items) {
      const currentIndex = song.dataPlaylist.song.items.findIndex(
        (element) => element.encodeId === currentSongId
      );

      if (
        currentIndex !== -1 &&
        currentIndex < song.dataPlaylist.song.items.length - 1
      ) {
        const nextSong = song.dataPlaylist.song.items[currentIndex + 1];
        dispatch(actions.setSongId(nextSong?.encodeId));
        dispatch(actions.setPlay(true));
        dispatch(
          actions.setRecent({
            encodeId: song.dataInfoSong.encodeId,
            thumbnailM: song.dataInfoSong.thumbnailM,
            title: song.dataInfoSong.title,
            artistsNames: song.dataInfoSong.artistsNames,
          })
        );
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error('Failed to play next song:', error);
          dispatch(actions.setPlay(false));
        }
      }
    }
  };

  const handlePrev = async () => {
    if (song?.dataPlaylist?.song?.items) {
      const currentIndex = song.dataPlaylist.song.items.findIndex(
        (element) => element.encodeId === currentSongId
      );

      if (currentIndex > 0) {
        const prevSong = song.dataPlaylist.song.items[currentIndex - 1];

        dispatch(actions.setSongId(prevSong.encodeId));
        dispatch(actions.setPlay(true));
        dispatch(
          actions.setRecent({
            encodeId: song.dataInfoSong.encodeId,
            thumbnailM: song.dataInfoSong.thumbnailM,
            title: song.dataInfoSong.title,
            artistsNames: song.dataInfoSong.artistsNames,
          })
        );
        try {
          await new Promise((resolve) => {
            const checkReadyState = () => {
              if (audioRef.current.readyState >= 2) {
                resolve();
              } else {
                setTimeout(checkReadyState, 100);
              }
            };
            checkReadyState();
          });

          await audioRef.current.play();
        } catch (error) {
          console.error('Failed to play previous song:', error);
          dispatch(actions.setPlay(false));
        }
      }
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    if (audioRef.current && song?.dataInfoSong?.duration) {
      audioRef.current.currentTime =
        (newProgress / 100) * song.dataInfoSong.duration;
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  // useEffect(() => {
  //   audioRef.current.addEventListener('keydown', (e) => {
  //     if (e.key === 'Enter') {
  //       dispatch(actions.setPlay(true));
  //     }
  //   });
  // }, [audioRef]);

  return (
    <div className="container_player w-screen bg-[#c0d8d8] h-[90px]">
      <div className="layout_player w-[95%] flex justify-between items-center m-auto h-full">
        <div className="gap-3 flex items-center w-[30%] h-[64px]">
          <img
            className="h-full w-24 rounded-md font-sans"
            src={
              song?.dataInfoSong?.thumbnail
                ? song?.dataInfoSong?.thumbnail
                : 'https://s120-ava-talk-zmp3.zmdcdn.me/b/7/7/a/14/120/c248d7eedc145cba6e901d453d5bede5.jpg'
            }
            alt="Hong có nhạc"
          />
          <div className="title_song w-full">
            <p className="text-[14px] font-sans">
              {song?.dataInfoSong?.title
                ? song?.dataInfoSong?.title
                : 'Còn nhạc phi phai nghe hong ?'}
            </p>
            <p className="text-[12px] text-[#696969]">
              {song?.dataInfoSong?.artistsNames
                ? song?.dataInfoSong?.artistsNames
                : 'Hiếu Thứ Ba'}
            </p>
          </div>
          <div className="choose_setting flex items-center gap-2">
            <p className="text-[#474B53]" title="Thêm vào thư viện">
              {icons.FavoriteBorderIcon}
            </p>
            <p className="text-[#474B53]" title="Xem thêm">
              {icons.NotesIcon}
            </p>
          </div>
        </div>
        <div className="h-[64px] flex w-1/3 flex-col">
          <div className="open_music flex gap-6 justify-center items-center h-full">
            <p
              className={`item_icon ${
                isShuffles ? 'text-[#96BDBD]' : 'text-[#2D2D37]'
              }`}
              title={`${
                isShuffles ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'
              }`}
              onClick={() => setIsShuffles((prev) => !prev)}
            >
              {icons.ShuffleIcon}
            </p>
            <p className="item_icon text-[#2D2D37]" onClick={handlePrev}>
              {icons.SkipPreviousIcon}
            </p>
            <p
              className={`item_play ${
                isLoadingSource ? 'animate-spin' : ''
              } text-[#2D2D37] hover:text-[#0D6565]`}
              onClick={handlePlay}
            >
              <audio
                className="audio_song"
                loop={isRepeat === 1}
                ref={audioRef}
                src={song?.dataSong['128']}
              ></audio>
              {isLoadingSource ? (
                <span className="loader_pages"></span>
              ) : (
                <span>
                  {' '}
                  {currentPlay
                    ? icons.PauseCircleOutlineIcon
                    : icons.PlayCircleOutlineIcon}
                </span>
              )}
            </p>
            <p className="item_icon text-[#2D2D37]" onClick={handleNext}>
              {icons.SkipNextIcon}
            </p>
            <p
              className={`item_icon text-[#2D2D37] ${
                isRepeat === 0
                  ? 'text-[#2D2D37]'
                  : isRepeat === 1
                  ? 'text-[#2D2D37]'
                  : 'text-[#96BDBD]'
              }`}
              title={`${
                isRepeat === 0
                  ? 'Bật phát một bài'
                  : isRepeat === 1
                  ? 'Bật phát tất cả'
                  : 'Tắt bật phát'
              }`}
              onClick={() => setRepeat((prev) => (prev === 2 ? 0 : prev + 1))}
            >
              {isRepeat === 1 ? icons.RepeatOneIcon : icons.RepeatIcon}
            </p>
          </div>
          <div className="range_time w-full flex flex-row gap-4">
            <div>
              {!moment.unix(audioRef?.current?.currentTime).format('mm:ss')
                ? '00:00'
                : moment.unix(audioRef?.current?.currentTime).format('mm:ss')}
            </div>

            <input
              type="range"
              className="w-full outline-none"
              value={isNaN(progress) ? 0 : progress}
              onChange={handleProgressChange}
            />

            <div>
              {!moment.unix(song?.dataInfoSong?.duration).format('mm:ss')
                ? '00:00'
                : moment.unix(song?.dataInfoSong?.duration).format('mm:ss')}
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-center w-[30%] h-full">
          <div className="volum_audio flex justify-center gap-2 items-center w-full h-full">
            <div className="text-[#]" onClick={() => setVolume(50)}>
              {' '}
              {volume > 0 ? icons.VolumeUpIcon : icons.VolumeOffIcon}
            </div>
            <div className="w-[70px] h-[15px]  flex justify-center items-center">
              <input
                id="volume-slider"
                type="range"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full h-[4px]"
              />
            </div>
            <div className="onoff_slideright">
              <div
                className="cursor-pointer"
                onClick={() => setIsOnOff((e) => !e)}
              >
                {icons.QueueMusicIcon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
