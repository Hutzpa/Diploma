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
	console.log("New connection");

	socket.on("disconnect", () => {
		console.log("User left");
	});
});

http.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
