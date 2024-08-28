import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider } from 'react-redux';
import reduxConfig from './redux.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Banner,
  Home,
  Login,
  Playlist,
  Public,
  Radio,
  Search,
  SearchAll,
  SearchPlaylist,
  SearchSongs,
  Singer,
  WeekChart,
  ZingChart,
} from './pages/public';
import ErrorPages from './error-pages.jsx';
import path from './ultil/path.js';
import { PersistGate } from 'redux-persist/integration/react';
import NewReleaseChart from './components/NewReleaseChart.jsx';
import HubMusic from './components/HubMusic.jsx';
import TopMusic from './components/TopMusic.jsx';
import History from './components/History.jsx';
import LikeMusics from './components/LikeMusics.jsx';
import PlayListMusic from './components/PlayListMusic.jsx';
import AlbumMusic from './components/AlbumMusic.jsx';
import Library from './components/Library.jsx';

const { persistor, store } = reduxConfig();

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <ErrorPages />,
  },
  {
    path: path.PUBLIC,
    element: <Public />,
    children: [
      { index: true, element: <Home /> },
      { path: path.HOME, element: <Home /> },

      { path: path.PLAYLIST__TITLE_PID, element: <Playlist /> },
      { path: path.MY_MUSIC, element: <Banner /> },
      { path: path.CHILL__TITLE_PID, element: <Playlist /> },
      { path: path.WEEKCHART_TITLE_PID, element: <WeekChart /> },
      { path: path.RADIO_TITLE_PID, element: <Radio /> },
      { path: path.RADIO, element: <Radio /> },
      { path: path.LIBRARY_MUSIC, element: <Library /> },
      { path: path.SINGER__NAME, element: <Singer /> },
      { path: path.ZING_CHART, element: <ZingChart /> },
      { path: path.NEW_RELEASE_CHART, element: <NewReleaseChart /> },
      { path: path.HUB_MUSIC, element: <HubMusic /> },
      { path: path.TOP_100, element: <TopMusic /> },
      { path: path.HISTORY_MUSIC, element: <History /> },
      { path: path.LIKE_MUSIC, element: <LikeMusics /> },
      { path: path.PLAYLIST_MUSIC, element: <PlayListMusic /> },
      { path: path.ALBUM_MUSIC, element: <AlbumMusic /> },

      {
        path: path.SEARCH,
        element: <Search />,
        children: [
          { path: path.SEARCH_ALL, element: <SearchAll /> },
          { path: path.SEARCH_SONGS, element: <SearchSongs /> },
          { path: path.SEARCH_PLAYLIST, element: <SearchPlaylist /> },
        ],
      },

      {
        path: path.LOGIN,
        element: <Login />,
        errorElement: <ErrorPages />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
