const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.raw({ type: 'application/octet-stream' }));

app.post('/processes-mappings/upload', (req, res) => {
  const videoId = req.query.id || 'default';
  const videoPath = path.join(__dirname, 'videos_received', `${videoId}.avi`);

  const fileStream = fs.createWriteStream(videoPath, { flags: 'a' });

  req.on('data', (chunk) => {
    fileStream.write(chunk);
  });

  req.on('end', () => {
    fileStream.end();
    console.log(`Upload do vídeo ${videoId} concluído.`);
    res.status(200).send('Upload bem-sucedido');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
