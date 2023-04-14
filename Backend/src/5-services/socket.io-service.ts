import http from "http";
import socketIo from "socket.io";
import { OtherNotFound } from "../2-models/client-errors";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";

function init(httpServer: http.Server): void {
  const options = { cors: { origin: "*" } };
  const socketServer = new socketIo.Server(httpServer, options);

  socketServer.sockets.on("connection", (socket: socketIo.Socket) => {
    console.log("Client has been connected: " + socket.id);
    
    socket.on("addLike", async (data: any) => {
      try {const checkSql = `SELECT EXISTS(SELECT 1 FROM followers WHERE userId = ? AND vacationId = ?) AS checkResult`;
      const checkResult = await dal.execute(checkSql, [data.userId, data.vacationId]);
      if (checkResult[0].checkResult === 1) throw new OtherNotFound("Same like cannot be added twice!")

      // adding new like:
      const sql = `INSERT INTO followers VALUES(?, ?)`;
      await dal.execute(sql, [data.userId, data.vacationId]);

      // get updated followers count
      const countSql = `SELECT COUNT(*) AS followersCount FROM followers WHERE vacationId = ?`;
      const countResult = await dal.execute(countSql, [data.vacationId]);
      const followersCount = countResult[0].followersCount;

      // emit updated followers count to all clients
      socket.emit("updateFollowersCount", { vacationId: data.vacationId, followersCount });
    } catch(err: any){
        console.log(err.message);
      }
    });

    socket.on("removeLike", async (data: any) => {
      try {const sql = `DELETE FROM followers WHERE vacationId = ? AND userId = ?`;
      const result: OkPacket = await dal.execute(sql, [data.vacationId, data.userId]);
      if(result.affectedRows === 0) throw new OtherNotFound("This like does not exist.");

      // get updated followers count
      const countSql = `SELECT COUNT(*) AS followersCount FROM followers WHERE vacationId = ?`;
      const countResult = await dal.execute(countSql, [data.vacationId]);
      const followersCount = countResult[0].followersCount;

      // emit updated followers count to all clients
      socket.emit("updateFollowersCount", { vacationId: data.vacationId, followersCount });
    } catch(err: any) {
        console.log(err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    })
  });
}

export default {
  init
};