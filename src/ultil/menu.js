import icon from './icon';
const menu = [
  {
    path: 'thuvien',
    text: 'Thư Viện',
    icon: icon.LibraryMusicIcon,
  },

  {
    path: 'khampha',
    text: 'Khám Phá',
    icon: icon.Bubble,
  },
  {
    path: 'zingchart',
    text: '#zingchart',
    icon: icon.InsightsIconChart,
  },
  {
    path: ':title/:pid',
    text: 'Radio',
    icon: icon.RadioIcon,
  },
];

export default menu;
