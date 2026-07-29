const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// File handling (we don't save files, just process the request)
const upload = multer();

// In-memory Database
// { "123456": { files: [], texts: [] } }
const DB = {};

// Helper to generate a 6-digit pin
function generatePin() {
    let pin;
    do {
        pin = Math.floor(100000 + Math.random() * 900000).toString();
    } while (DB[pin]);
    return pin;
}

// 1. GET /:pin - Get pin data
app.get('/api/:pin', (req, res) => {
    const { pin } = req.params;
    const data = DB[pin];

    if (!data) {
        return res.status(404).send('Pin not found');
    }

    res.json(data);
});

// 2. POST /upload - Upload File or Text
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        let { type, textContent, sharePin } = req.body;

        // If it's a file upload, type is in body
        // If using FormData, req.body has fields, req.file has file

        let pin = sharePin;

        // If pin provided, check existence
        if (pin && !DB[pin]) {
            return res.status(404).send('Pin not found');
        }

        // Create new pin if not provided
        if (!pin) {
            pin = generatePin();
            DB[pin] = { files: [], texts: [] };
        }

        const newId = uuidv4();

        if (type === 'FILE') {
            if (!req.file) {
                return res.status(400).send('No file uploaded');
            }

            const newFile = {
                uuid: newId,
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                googleDriveLink: `https://mock-drive-link.com/${newId}`, // Mock link
                createdAt: new Date().toISOString()
            };

            DB[pin].files.push(newFile);
            console.log(`[FILE] Uploaded ${newFile.originalName} to ${pin}`);

        } else if (type === 'TEXT') {
            if (!textContent) {
                return res.status(400).send('No text content');
            }

            const newText = {
                uuid: newId,
                textContent: textContent,
                createdAt: new Date().toISOString()
            };

            DB[pin].texts.push(newText);
            console.log(`[TEXT] Added note to ${pin}`);

        } else {
            return res.status(400).send('Invalid type');
        }

        res.status(200).send(pin);

    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

// 3. PATCH /:uuid - Update text
app.patch('/api/:uuid', (req, res) => {
    const { uuid } = req.params;
    const { textContent } = req.body;

    if (!textContent) return res.status(400).send('text content required');

    // Search all pins for this uuid (inefficient but fine for dummy)
    let found = false;
    for (const pin in DB) {
        const textIdx = DB[pin].texts.findIndex(t => t.uuid === uuid);
        if (textIdx !== -1) {
            DB[pin].texts[textIdx].textContent = textContent;
            found = true;
            console.log(`[PATCH] Updated text ${uuid}`);
            break;
        }
    }

    if (found) res.status(200).send('Updated');
    else res.status(404).send('Not found');
});

// 4. DELETE /:uuid - Delete item
app.delete('/api/:uuid', (req, res) => {
    const { uuid } = req.params;
    let found = false;

    for (const pin in DB) {
        // Check files
        const fileIdx = DB[pin].files.findIndex(f => f.uuid === uuid);
        if (fileIdx !== -1) {
            DB[pin].files.splice(fileIdx, 1);
            found = true;
            console.log(`[DELETE] Deleted file ${uuid}`);
            break;
        }

        // Check texts
        const textIdx = DB[pin].texts.findIndex(t => t.uuid === uuid);
        if (textIdx !== -1) {
            DB[pin].texts.splice(textIdx, 1);
            found = true;
            console.log(`[DELETE] Deleted text ${uuid}`);
            break;
        }
    }

    if (found) res.status(200).send('Deleted');
    else res.status(404).send('Not found');
});

app.listen(port, () => {
    console.log(`Dummy Backend running at http://localhost:${port}`);
    console.log('Ready for QuickShare requests...');
});
