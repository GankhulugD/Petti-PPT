// Usage: node scripts/run.mjs <dev|start> [...next args]
// Starts Next.js on port 3000 (or $PORT); if it is busy, tries 3001, 3002, ...
import net from "node:net";
import { spawn } from "node:child_process";

const [mode = "dev", ...rest] = process.argv.slice(2);
const base = Number(process.env.PORT) || 3000;

// Порт чөлөөтэй эсэхийг IPv4 (127.0.0.1, 0.0.0.0) болон IPv6 (::1, ::) дээр шалгана.
const canBind = (port, host) =>
  new Promise((resolve) => {
    const srv = net.createServer();
    srv.once("error", (e) => resolve(e.code === "EADDRNOTAVAIL" || e.code === "EAFNOSUPPORT"));
    srv.once("listening", () => srv.close(() => resolve(true)));
    host ? srv.listen(port, host) : srv.listen(port);
  });

const isFree = async (port) => {
  for (const host of [undefined, "127.0.0.1", "::1"]) {
    if (!(await canBind(port, host))) return false;
  }
  return true;
};

let port = base;
while (!(await isFree(port))) {
  if (port - base > 100) {
    console.error(`Сул порт олдсонгүй (${base}–${port}).`);
    process.exit(1);
  }
  port++;
}
if (port !== base) console.log(`Порт ${base} ашиглагдаж байна → ${port} дээр асаана.`);

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", mode, "-p", String(port), ...rest],
  { stdio: "inherit", env: { ...process.env, PORT: String(port) } }
);
child.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));
