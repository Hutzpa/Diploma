import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import Video from "./Video";

import "./Video.css";

const VideoDialog = ({
	_socket,
	nickname,
	id_my,
	id_companion,
	isVideoOn,
	nameToCall,
}) => {
	const [me, setMe] = useState("");
	const [socket, setSocket] = useState(_socket);
	const [stream, setStream] = useState(); //
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState("");
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	const [idToCall, setIdToCall] = useState("");
	const [callEnded, setCallEnded] = useState(false);
	const [isHolographic, setIsHolographic] = useState(false);
	const [name, setName] = useState("");
	const [amIHitCall, setAmIHitCall] = useState(false);
	const [playCall, setPlayCall] = useState(true);
	const myVideo = useRef(); //
	const userVideo = useRef();
	const userVideo1 = useRef();
	const userVideo2 = useRef();
	const userVideo3 = useRef();
	const userVideo4 = useRef();
	const connectionRef = useRef();

	const audio = new Audio(
		"https://samplelib.com/lib/preview/mp3/sample-15s.mp3"
	);
	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
				myVideo.current.srcObject = stream;
			});

		setMe(id_my);

		socket.on("callUser", (data) => {
			togglePlay();
			setReceivingCall(true);
			setCaller(data.from);
			setName(data.name);
			setCallerSignal(data.signal);
		});
	}, []);

	const togglePlay = () => {
		setPlayCall(!playCall);
		playCall ? audio.play() : audio.pause();
	};
	const callUser = (id, isHolog) => {
		setAmIHitCall(true);
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id_companion,
				signalData: data,
				from: me,
				name: nickname,
			});
		});

		peer.on("stream", (stream) => {
			if (userVideo.current) userVideo.current.srcObject = stream;
			if (isHolog) {
				setIsHolographic(true);
				userVideo1.current.srcObject = stream;
				userVideo2.current.srcObject = stream;
				userVideo3.current.srcObject = stream;
				userVideo4.current.srcObject = stream;
			}
		});

		socket.on("callAccepted", (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});

		if (connectionRef.current) connectionRef.current = peer;
		isVideoOn();
	};

	const answerCall = (holographic) => {
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller });
		});
		peer.on("stream", (stream) => {
			if (holographic) {
				setIsHolographic(true);
				userVideo1.current.srcObject = stream;
				userVideo2.current.srcObject = stream;
				userVideo3.current.srcObject = stream;
				userVideo4.current.srcObject = stream;
			} else {
				userVideo.current.srcObject = stream;
			}
		});

		//Отключение и включение текстового чата
		isVideoOn();
		peer.signal(callerSignal);
		if (connectionRef.current) connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);
		isVideoOn();
		window.location.reload();
	};

	return (
		<div className={!isHolographic ? "container" : ""}>
			<div className="row">
				<div className="video-container col-6 ">
					<div>
						<div className="video">
							{stream && (
								<div>
									{!isHolographic ? (
										<div>
											<Video
												video={myVideo}
												style={{ width: "150px", height: "150px" }}
											></Video>
										</div>
									) : null}
								</div>
							)}
						</div>
						<div className="video">
							{callAccepted && !callEnded ? (
								<div>
									{!isHolographic ? (
										<div>
											<Video
												video={userVideo}
												style={{ width: "400px", height: "400px" }}
											></Video>
										</div>
									) : (
										<div
											style={{
												backgroundColor: "black",
												height: "1200px",
												width: "2500px",
											}}
										>
											<div className="container">
												<div className="row">
													<Video
														video={userVideo1}
														className="topOne"
														style={{ width: "400px", height: "400px" }}
													></Video>
												</div>
												<div className="row">
													<Video
														video={userVideo3}
														className="middleLeft"
														style={{ width: "400px", height: "400px" }}
													></Video>
													<Video
														video={userVideo2}
														className="middleRight"
														style={{ width: "400px", height: "400px" }}
													></Video>
												</div>

												<Video
													video={userVideo4}
													className="bottomOne"
													style={{ width: "400px", height: "400px" }}
												></Video>
											</div>
										</div>
									)}
								</div>
							) : null}
						</div>
					</div>
				</div>
				<div className="col-6">
					<div>
						{callAccepted && !callEnded ? (
							<div>
								<Button
									variant="contained"
									color="secondary"
									onClick={leaveCall}
								>
									End Call
								</Button>
							</div>
						) : (
							<div className="row">
								<div className="col-6 mt-3">
									<IconButton
										color="primary"
										aria-label="call"
										onClick={() => {
											callUser(idToCall, false);
											setName(nickname);
										}}
									>
										Call
										{/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
									</IconButton>
								</div>
								<div className="col-6 mt-3">
									<IconButton
										color="secondary"
										aria-label="call"
										onClick={() => {
											callUser(idToCall, true);
											setName(nickname);
										}}
									>
										Call holographic
									</IconButton>
								</div>
							</div>
						)}
						{idToCall}
					</div>
					{receivingCall && !callAccepted ? (
						<div className="caller">
							{!amIHitCall ? (
								<div>
									<h1>{name} is calling...</h1>
									<Button
										variant="contained"
										color="primary"
										onClick={() => answerCall(false)}
									>
										Answer
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={() => answerCall(true)}
									>
										Answer holographic
									</Button>
								</div>
							) : (
								<h1>You are calling {nameToCall}</h1>
							)}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default VideoDialog;
