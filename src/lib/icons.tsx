// @ts-nocheck
// Inline SVG icon set — minimal, consistent stroke
import * as React from 'react';

const PATHS: Record<string, string[]> = {
  home:        ['M3 11l9-8 9 8','M5 9v12h14V9'],
  dashboard:   ['M3 3h7v9H3z','M14 3h7v5h-7z','M14 12h7v9h-7z','M3 16h7v5H3z'],
  trophy:      ['M8 3h8v4a4 4 0 01-8 0z','M5 5H3v3a3 3 0 003 3','M19 5h2v3a3 3 0 01-3 3','M10 14h4','M9 21h6','M12 14v7'],
  flag:        ['M4 21V4','M4 4h13l-3 5 3 5H4'],
  qr:          ['M3 3h7v7H3z','M14 3h7v7h-7z','M3 14h7v7H3z','M14 14h2v2h-2z','M19 14h2','M14 19h2v2','M19 17v4'],
  bracket:     ['M3 5h6','M3 19h6','M9 5v14','M9 12h6','M15 12V8','M15 12v4','M21 8h-6','M21 16h-6'],
  bell:        ['M6 8a6 6 0 1112 0c0 7 3 8 3 8H3s3-1 3-8','M10 21a2 2 0 004 0'],
  mail:        ['M3 5h18v14H3z','M3 5l9 7 9-7'],
  search:      ['M11 4a7 7 0 100 14 7 7 0 000-14z','M21 21l-5.2-5.2'],
  user:        ['M12 12a4 4 0 100-8 4 4 0 000 8z','M4 21a8 8 0 0116 0'],
  users:       ['M9 11a4 4 0 100-8 4 4 0 000 8z','M2 21a7 7 0 0114 0','M16 4a4 4 0 010 8','M22 21a6 6 0 00-6-6'],
  settings:    ['M12 8a4 4 0 100 8 4 4 0 000-8z','M19 12l2 1-2 4-2-1a7 7 0 01-3 2v2h-4v-2a7 7 0 01-3-2l-2 1-2-4 2-1a7 7 0 010-2l-2-1 2-4 2 1a7 7 0 013-2V3h4v2a7 7 0 013 2l2-1 2 4-2 1a7 7 0 010 2z'],
  check:       ['M5 12l5 5 9-11'],
  x:           ['M5 5l14 14','M19 5L5 19'],
  plus:        ['M12 5v14','M5 12h14'],
  arrow_right: ['M5 12h14','M13 5l7 7-7 7'],
  arrow_left:  ['M19 12H5','M11 5l-7 7 7 7'],
  arrow_up:    ['M12 19V5','M5 11l7-7 7 7'],
  arrow_down:  ['M12 5v14','M5 13l7 7 7-7'],
  calendar:    ['M3 6h18v15H3z','M3 10h18','M8 3v4','M16 3v4'],
  clock:       ['M12 6v6l3 2'],
  pin:         ['M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z','M12 11a2 2 0 100-4 2 2 0 000 4z'],
  tennis:      ['M3 12a9 9 0 1018 0 9 9 0 00-18 0z','M3.5 8s4 1 8.5 1 8.5-1 8.5-1','M3.5 16s4-1 8.5-1 8.5 1 8.5 1'],
  filter:      ['M3 5h18','M6 12h12','M10 19h4'],
  download:    ['M12 4v12','M6 12l6 6 6-6','M4 21h16'],
  upload:      ['M12 20V8','M6 12l6-6 6 6','M4 4h16'],
  camera:      ['M3 8h4l2-3h6l2 3h4v12H3z','M12 17a4 4 0 100-8 4 4 0 000 8z'],
  eye:         ['M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z','M12 9a3 3 0 100 6 3 3 0 000-6z'],
  eye_off:     ['M3 3l18 18','M10.5 6.3A8.5 8.5 0 0112 6c6 0 10 7 10 7a18 18 0 01-3.2 4','M6.7 7a18 18 0 00-4.7 5s4 7 10 7a8.5 8.5 0 005.3-1.7'],
  menu:        ['M4 6h16','M4 12h16','M4 18h16'],
  grid:        ['M3 3h8v8H3z','M13 3h8v8h-8z','M3 13h8v8H3z','M13 13h8v8h-8z'],
  list:        ['M8 6h13','M8 12h13','M8 18h13','M3 6h.01','M3 12h.01','M3 18h.01'],
  chart:       ['M3 3v18h18','M7 14l4-4 4 4 5-7'],
  shield:      ['M12 3l8 4v5c0 5-4 9-8 10-4-1-8-5-8-10V7z'],
  sparkle:     ['M12 3v4','M12 17v4','M3 12h4','M17 12h4','M5 5l3 3','M16 16l3 3','M19 5l-3 3','M8 16l-3 3'],
  star:        ['M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z'],
  logout:      ['M14 8V4H4v16h10v-4','M10 12h11','M18 8l4 4-4 4'],
  edit:        ['M4 20h4l11-11-4-4L4 16z','M14 6l4 4'],
  trash:       ['M4 7h16','M9 7V4h6v3','M6 7v13h12V7','M10 11v6','M14 11v6'],
  flash:       ['M13 2L4 14h7l-1 8 9-12h-7z'],
  court:       ['M3 5h18v14H3z','M12 5v14','M3 12h18','M7 5v14','M17 5v14'],
  copy:        ['M9 9h11v11H9z','M5 15H3V3h12v2'],
  print:       ['M6 9V3h12v6','M6 18H4v-7h16v7h-2','M6 14h12v7H6z'],
  message:     ['M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z'],
  ban:         ['M12 22a10 10 0 100-20 10 10 0 000 20z','M5 5l14 14'],
  heart:       ['M12 21s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11z'],
  tag:         ['M20 12V4h-8L4 12l8 8z','M9 9h.01'],
  send:        ['M22 2L11 13','M22 2l-7 20-4-9-9-4z'],
  play:        ['M6 4l14 8-14 8z'],
  lock:        ['M5 11h14v10H5z','M8 11V7a4 4 0 018 0v4'],
  broadcast:   ['M5 9a7 7 0 010 6','M19 9a7 7 0 010 6','M2 6a12 12 0 010 12','M22 6a12 12 0 010 12','M12 13a1 1 0 100-2 1 1 0 000 2z'],
  stop:        ['M6 6h12v12H6z'],
  info:        ['M12 22a10 10 0 100-20 10 10 0 000 20z','M12 8h.01','M11 12h1v5h1'],
  help:        ['M12 22a10 10 0 100-20 10 10 0 000 20z','M9.5 9a2.5 2.5 0 015 0c0 1-1.5 2-2.5 2v2','M12 17h.01'],
  logo:        ['M12 22a10 10 0 100-20 10 10 0 000 20z','M3.5 8s4 1 8.5 1 8.5-1 8.5-1','M3.5 16s4-1 8.5-1 8.5 1 8.5 1'],
  ball:        ['M12 22a10 10 0 100-20 10 10 0 000 20z','M3.5 8s4 1 8.5 1 8.5-1 8.5-1'],
  drag:        ['M9 6h.01','M9 12h.01','M9 18h.01','M15 6h.01','M15 12h.01','M15 18h.01'],
  target:      ['M12 22a10 10 0 100-20 10 10 0 000 20z','M12 18a6 6 0 100-12 6 6 0 000 12z','M12 14a2 2 0 100-4 2 2 0 000 4z'],
  external:    ['M14 4h6v6','M10 14L20 4','M19 13v7H5V5h7'],
};

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, className = '', strokeWidth = 1.75 }) => {
  const paths = PATHS[name] || PATHS.help;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
};

export default Icon;
