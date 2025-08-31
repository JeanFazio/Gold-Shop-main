import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleCheckout } from "./routes/checkout";
import { handleEzzyPagWebhook } from "./routes/webhook";
import ezzypagRouter from './routes/ezzypag';
import utmifyRouter from './routes/utmify';

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/checkout", handleCheckout);
  app.post("/api/webhook/ezzypag", handleEzzyPagWebhook);
  app.use('/api/ezzypag', ezzypagRouter);
  app.use('/api/utmify', utmifyRouter);

  return app;
}
