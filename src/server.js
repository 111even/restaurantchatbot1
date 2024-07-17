const express = require('express');
const bodyParser = require('body-parser');
const chatbot = require('./chatbot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', (req, res) => {
    const { message } = req.body;
    const reply = chatbot.handleMessage(message);
    res.json({ reply });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
