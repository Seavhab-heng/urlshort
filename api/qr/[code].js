const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
  const { code } = req.query;
  const filePath = path.join(process.cwd(), 'links.json');

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    const link = json.links.find(l => l.shortCode === code);
    if (link) {
      res.redirect(302, `https://shortlnk.in.th/${code}`);
    } else {
      res.status(404).json({ error: 'QR code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
