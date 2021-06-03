import React, { Component, memo } from "react";

const Video = ({ video }) => {
	return video ? (
		<video
			playsInline
			muted
			ref={video}
			autoPlay
			style={{ width: "100px", height: "100px" }}
		/>
	) : null;
};

export default Video;
