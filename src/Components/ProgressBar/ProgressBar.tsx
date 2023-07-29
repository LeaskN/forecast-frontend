import React from "react";
import './ProgressBar.css';

const ProgressBar = ({ temp }: { temp: string }) => {
  const containerStyles: string | number | string | {} = {

  }

  const fillerStyles: string | number | string | {} = {
    width: `${temp}%`,
  }

  const labelStyles: string | number | string | {} = {

  }

  return (
    <div className='progressBarContainer' style={containerStyles}>
      <div className='progressBarFill' style={fillerStyles}>
        <span className='progressBarLabel' style={labelStyles}>{`${temp}`}&deg;</span>
      </div>
    </div>
  );
};

export default ProgressBar;