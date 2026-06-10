#!/usr/bin/env python3
"""Mockup SS sunucusu — GET: statik dosya servis, PUT: base64 body'yi dosyaya yazar.
Playwright page.screenshot bu mockup'ta takıldığı için CDP captureScreenshot
çıktısı sayfadan fetch(PUT) ile buraya gönderilir. Yalnız lokal kullanım."""
import base64
import http.server
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_PUT(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        rel = self.path.lstrip("/").split("?")[0]
        path = os.path.normpath(os.path.join(ROOT, rel))
        if not path.startswith(ROOT):
            self.send_response(403)
            self.end_headers()
            return
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            f.write(base64.b64decode(body))
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    http.server.ThreadingHTTPServer(("127.0.0.1", 8742), Handler).serve_forever()
