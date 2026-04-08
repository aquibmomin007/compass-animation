import React from 'react';

const CompassSvg = ({ id, url, alt, style, className }) => {
  return <img id={id} src={url} alt={alt} style={style} className={className} />;
};

export default CompassSvg;
