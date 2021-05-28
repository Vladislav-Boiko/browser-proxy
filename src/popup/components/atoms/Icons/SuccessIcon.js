import React from 'react';

export default ({ text, className } = { text: 'Copied!' }) => (
  <svg
    className={className}
    viewBox="0 0 52 52"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text className="success_svg__text" y="42" font-size="40">
      {text}
    </text>
    <g className="success_svg__circle-with-arrow">
      <circle
        className="success_svg__circle"
        cx="26"
        cy="26"
        r="26"
        stroke="var(--primary)"
        stroke-width="3.5"
        fill="none"
      />
      <path
        stroke="var(--primary)"
        stroke-width="2.5"
        d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406
		l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411
		C39.251,14.885,38.62,14.922,38.252,15.336z"
      />
    </g>
  </svg>
);
