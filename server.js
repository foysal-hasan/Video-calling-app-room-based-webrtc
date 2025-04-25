// // server.js
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.static('public'));

// const rooms = {};

// io.on('connection', (socket) => {
//   socket.on('join', (roomId) => {
//     socket.join(roomId);
//     if (!rooms[roomId]) rooms[roomId] = [];
//     rooms[roomId].push(socket.id);

//     // Notify the new user of existing peers
//     const otherUsers = rooms[roomId].filter((id) => id !== socket.id);
//     socket.emit('all-users', otherUsers);

//     // Notify others of the new user
//     socket.to(roomId).emit('user-joined', socket.id);

//     // Handle offer, answer, and ICE candidate relay
//     socket.on('offer', (payload) => {
//       io.to(payload.target).emit('offer', {
//         sdp: payload.sdp,
//         caller: socket.id,
//       });
//     });

//     socket.on('answer', (payload) => {
//       io.to(payload.target).emit('answer', {
//         sdp: payload.sdp,
//         responder: socket.id,
//       });
//     });

//     socket.on('ice-candidate', (payload) => {
//       io.to(payload.target).emit('ice-candidate', {
//         candidate: payload.candidate,
//         from: socket.id,
//       });
//     });

//     socket.on('mute-status', ({ roomId, isMuted }) => {
//       socket
//         .to(roomId)
//         .emit('peer-mute-status', { peerId: socket.id, isMuted });
//     });

//     // Cleanup
//     socket.on('disconnect', () => {
//       for (const room in rooms) {
//         rooms[room] = rooms[room].filter((id) => id !== socket.id);
//         socket.to(room).emit('user-disconnected', socket.id);
//         if (rooms[room].length === 0) delete rooms[room];
//       }
//     });
//   });
// });

// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

// // server.js
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const path = require("path");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// app.use(express.static(path.join(__dirname, "public")));

// const rooms = {};

// io.on("connection", socket => {
//   console.log(`New connection: ${socket.id}`);

//   socket.on("join", roomId => {
//     socket.join(roomId);
//     if (!rooms[roomId]) rooms[roomId] = [];
//     rooms[roomId].push(socket.id);

//     // Notify the new user of existing peers
//     const otherUsers = rooms[roomId].filter(id => id !== socket.id);
//     socket.emit("all-users", otherUsers);

//     // Notify others of the new user
//     socket.to(roomId).emit("user-joined", socket.id);

//     // Handle WebRTC signaling
//     socket.on("offer", payload => {
//       io.to(payload.target).emit("offer", {
//         sdp: payload.sdp,
//         caller: socket.id,
//       });
//     });

//     socket.on("answer", payload => {
//       io.to(payload.target).emit("answer", {
//         sdp: payload.sdp,
//         responder: socket.id,
//       });
//     });

//     socket.on("ice-candidate", payload => {
//       io.to(payload.target).emit("ice-candidate", {
//         candidate: payload.candidate,
//         from: socket.id,
//       });
//     });

//     socket.on("mute-status", ({ isMuted }) => {
//       socket.to(roomId).emit("peer-mute-status", { 
//         peerId: socket.id, 
//         isMuted 
//       });
//     });

//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);
//       if (rooms[roomId]) {
//         rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
//         socket.to(roomId).emit("user-disconnected", socket.id);
//         if (rooms[roomId].length === 0) delete rooms[roomId];
//       }
//     });
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const path = require("path");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// app.use(express.static(path.join(__dirname, "public")));

// const rooms = {};

// io.on("connection", socket => {
//   console.log(`New connection: ${socket.id}`);

//   socket.on("join", (roomId, username) => {
//     socket.join(roomId);
//     if (!rooms[roomId]) rooms[roomId] = {};
//     rooms[roomId][socket.id] = username || `User${socket.id.slice(0, 4)}`;

//     // Notify the new user of existing peers
//     const otherUsers = Object.keys(rooms[roomId])
//       .filter(id => id !== socket.id)
//       .map(id => ({ id, username: rooms[roomId][id] }));
    
//     socket.emit("all-users", otherUsers);

//     // Notify others of the new user
//     socket.to(roomId).emit("user-joined", { 
//       id: socket.id, 
//       username: rooms[roomId][socket.id] 
//     });

//     // Handle WebRTC signaling
//     socket.on("offer", payload => {
//       io.to(payload.target).emit("offer", {
//         sdp: payload.sdp,
//         caller: socket.id,
//       });
//     });

//     socket.on("answer", payload => {
//       io.to(payload.target).emit("answer", {
//         sdp: payload.sdp,
//         responder: socket.id,
//       });
//     });

//     socket.on("ice-candidate", payload => {
//       io.to(payload.target).emit("ice-candidate", {
//         candidate: payload.candidate,
//         from: socket.id,
//       });
//     });

//     socket.on("mute-status", ({ isMuted }) => {
//       socket.to(roomId).emit("peer-mute-status", { 
//         peerId: socket.id, 
//         isMuted 
//       });
//     });

//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);
//       if (rooms[roomId]) {
//         delete rooms[roomId][socket.id];
//         socket.to(roomId).emit("user-disconnected", socket.id);
//         if (Object.keys(rooms[roomId]).length === 0) delete rooms[roomId];
//       }
//     });
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const path = require("path");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// app.use(express.static(path.join(__dirname, "public")));

// const rooms = {};
// io.on("connection", socket => {
//   socket.on("join", ({ roomId, username }) => {
//     socket.join(roomId);
//     if (!rooms[roomId]) rooms[roomId] = {};
//     rooms[roomId][socket.id] = username;

//     const otherUsers = Object.entries(rooms[roomId])
//       .filter(([id]) => id !== socket.id)
//       .map(([id, name]) => ({ id, username: name }));

//     socket.emit("all-users", otherUsers);
//     socket.to(roomId).emit("user-joined", { id: socket.id, username });
//   });

//   socket.on("disconnect", () => {
//     for (const roomId in rooms) {
//       if (rooms[roomId][socket.id]) {
//         delete rooms[roomId][socket.id];
//         socket.to(roomId).emit("user-disconnected", socket.id);
//         if (Object.keys(rooms[roomId]).length === 0) delete rooms[roomId];
//       }
//     }
//   });
// });


// io.on("connection", socket => {
//   console.log(`New connection: ${socket.id}`);

//   socket.on("join",( { roomId, username }) => {
//     // socket.join(roomId);
//     // if (!rooms[roomId]) rooms[roomId] = [];
//     // rooms[roomId].push(socket.id);

//     // const otherUsers = rooms[roomId].filter(id => id !== socket.id);
//     // socket.emit("all-users", otherUsers);
//     // socket.to(roomId).emit("user-joined", socket.id);

//     socket.join(roomId);
//     if (!rooms[roomId]) rooms[roomId] = {};
//     rooms[roomId][socket.id] = username;

//     const otherUsers = Object.entries(rooms[roomId])
//       .filter(([id]) => id !== socket.id)
//       .map(([id, name]) => ({ id, username: name }));

//     socket.emit("all-users", otherUsers);
//     socket.to(roomId).emit("user-joined", { id: socket.id, username });

//     socket.on("offer", payload => {
//       io.to(payload.target).emit("offer", {
//         sdp: payload.sdp,
//         caller: socket.id
//       });
//     });

//     socket.on("answer", payload => {
//       io.to(payload.target).emit("answer", {
//         sdp: payload.sdp,
//         responder: socket.id
//       });
//     });

//     socket.on("ice-candidate", payload => {
//       io.to(payload.target).emit("ice-candidate", {
//         candidate: payload.candidate,
//         from: socket.id
//       });
//     });

//     // socket.on("mute-status", ({ roomId, isMuted }) => {
//     //   socket.to(roomId).emit("peer-mute-status", {
//     //     peerId: socket.id,
//     //     isMuted
//     //   });
//     // });

//     socket.on("mute-status", ({ roomId, isMuted, target }) => {
//       const payload = { peerId: socket.id, isMuted };
//       if (target) {
//         io.to(target).emit("peer-mute-status", payload);
//       } else {
//         socket.to(roomId).emit("peer-mute-status", payload);
//       }
//     });
    

//     // socket.on("disconnect", () => {
//     //   console.log(`User disconnected: ${socket.id}`);
//     //   for (const room in rooms) {
//     //     rooms[room] = rooms[room].filter(id => id !== socket.id);
//     //     socket.to(room).emit("user-disconnected", socket.id);
//     //     if (rooms[room].length === 0) delete rooms[room];
//     //   }
//     // });

//     socket.on("disconnect", () => {
//       for (const roomId in rooms) {
//         if (rooms[roomId][socket.id]) {
//           delete rooms[roomId][socket.id];
//           socket.to(roomId).emit("user-disconnected", socket.id);
//           if (Object.keys(rooms[roomId]).length === 0) delete rooms[roomId];
//         }
//       }
//     });
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");


const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const rooms = {}; // { roomId: { socketId: { username, isMuted } } }

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("join", ({ roomId, username }) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = {};
    rooms[roomId][socket.id] = { username, isMuted: false };

    const otherUsers = Object.entries(rooms[roomId])
      .filter(([id]) => id !== socket.id)
      .map(([id, data]) => ({ id, username: data.username, isMuted: data.isMuted }));

    socket.emit("all-users", otherUsers);

    socket.to(roomId).emit("user-joined", {
      id: socket.id,
      username,
      isMuted: false,
    });
  });

  socket.on("offer", ({ sdp, target }) => {
    io.to(target).emit("offer", {
      sdp,
      caller: socket.id,
    });
  });

  socket.on("answer", ({ sdp, target }) => {
    io.to(target).emit("answer", {
      sdp,
      responder: socket.id,
    });
  });

  socket.on("ice-candidate", ({ target, candidate }) => {
    io.to(target).emit("ice-candidate", {
      from: socket.id,
      candidate,
    });
  });

  socket.on("mute-status", ({ roomId, isMuted }) => {
    if (rooms[roomId]?.[socket.id]) {
      rooms[roomId][socket.id].isMuted = isMuted;
    }
    socket.to(roomId).emit("peer-mute-status", {
      peerId: socket.id,
      isMuted,
    });
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      if (rooms[roomId][socket.id]) {
        delete rooms[roomId][socket.id];
        socket.to(roomId).emit("user-disconnected", socket.id);
        if (Object.keys(rooms[roomId]).length === 0) {
          delete rooms[roomId];
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

