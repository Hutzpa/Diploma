"use strict";
const app = require("express")();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});

app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
	//Чатик
	let _room;
	let _user;
	socket.on("join", ({ user, room }) => {
		_room = room;
		_user = user;
		socket.join(_room);
	});

	socket.on("sendMessage", (message) => {
		io.to(_room).emit("message", {
			Id: 0,
			User: _user,
			Text: message.message,
			SendingTime: new Date(),
		});
	});
	socket.on("disconnect", () => {
		//socket.broad
	});

	//Видеозвонки
	socket.emit("me", socket.id);

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", {
			signal: data.signalData,
			from: data.from,
			name: data.name,
		});
	});

	socket.on("answerCall", (data) =>
		io.to(data.to).emit("callAccepted", data.signal)
	);
});

http.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
