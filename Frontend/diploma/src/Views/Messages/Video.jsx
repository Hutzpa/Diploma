import React, { Component, memo } from "react";

import "../Messages/Video.css";

const Video = ({ video, style, className }) => {
	return video ? (
		<video
			playsInline
			muted
			ref={video}
			className={className}
			autoPlay
			style={style}
		/>
	) : null;
};

export default Video;
