const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { shortCode, longUrl } = req.body;
  const filePath = path.join(process.cwd(), 'links.json');

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    json.links.push({ shortCode, longUrl });
    await fs.writeFile(filePath, JSON.stringify(json, null, 2));
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save link' });
  }
};
