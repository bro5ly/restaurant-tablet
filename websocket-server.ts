import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { parse } from "url";

const server = createServer();
const wss = new WebSocketServer({ server });
const clients = new Set<WebSocket>();

// WebSocket接続処理
wss.on("connection", (ws) => {
  console.log("クライアント接続");
  clients.add(ws);
  console.log("クライアント数:", clients.size);

  ws.on("close", () => {
    clients.delete(ws);
    console.log("クライアント切断、残り:", clients.size);
  });
});

// HTTP通知エンドポイント
server.on("request", (req, res) => {
  const parsedUrl = parse(req.url || "", true);

  if (req.method === "POST" && parsedUrl.pathname === "/broadcast") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const { message } = JSON.parse(body);

        console.log("HTTP経由でブロードキャスト:", message);
        console.log("接続中のクライアント数:", clients.size);

        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3001, () => {
  console.log("WebSocket サーバー起動: ws://localhost:3001");
});
