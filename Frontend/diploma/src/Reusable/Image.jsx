import React from "react";
import ServerRouter from "./../Network/ServerRouter";

const Picture = ({ name, height, width, className }) => {
	return (
		<img
			src={
				name ? ServerRouter.avatar + name : ServerRouter.avatar + "blank.png"
			}
			className={className}
			height={height}
			width={width}
		/>
	);
};

export default Picture;
