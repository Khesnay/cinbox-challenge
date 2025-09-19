import express from "express";
import { createServer as createViteServer } from "vite";


async function startServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true }
  });

  app.use(vite.middlewares);

  app.use("/", async (req, res) => {
    try {
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const appHtml = render();
      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>Movie Browser SSR</title>
          </head>
          <body>
            <div id="root">${appHtml}</div>
            <script type="module" src="/src/entry-client.tsx"></script>
          </body>
        </html>
      `;
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      res.status(500).end((e as Error).message);
    }
  });

  const ip: number = 3000

  app.listen(ip, () => {
    console.log(`SSR server running at http://localhost:${ip}`);
  });
}

startServer();
