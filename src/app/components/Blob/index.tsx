import React from 'react';
import './index.scss';
import '../../stylesheets/variables.sass';
import theme from '../../stylesheets/theme.module.sass';

interface BlobProps {
  theme?: 'l' | 'd';
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  top?: string;
  left?: string;
}

const Blob: React.FC<BlobProps> = (props) => {
  const style = {
    '--width': props.width ?? 'auto',
    '--height': props.height ?? 'auto',
    '--top': props.top ?? 'auto',
    '--left': props.left ?? 'auto',
  } as React.CSSProperties;
  return (
    <div
      style={style}
      className={['blob', props.theme ? props.theme : null]
        .filter((p) => p)
        .join(' ')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 975 900"
        fill="none"
        style={props.style}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M515.623 201.027C566.993 194.192 616.316 222.747 658.928 249.222C699.433 274.387 729.661 309.541 752.833 348.406C775.455 386.348 785.499 427.795 790.857 470.497C796.736 517.35 810.56 567.888 785.585 609.445C760.5 651.185 709.711 678.748 658.38 690.927C611.161 702.13 564.462 672.146 515.623 673.495C464.546 674.907 418.148 706.015 367.663 698.96C307.475 690.549 228.1 680.561 205.437 630.148C181.631 577.191 242.364 523.874 264.958 470.497C280.043 434.859 293.825 400.297 316.417 367.967C338.368 336.556 364.808 309.677 395.055 284.329C432.744 252.745 464.462 207.833 515.623 201.027Z"
          fill={props.theme === 'l' ? theme.w : theme.d}
        />
      </svg>
    </div>
  );
};

export default Blob;
