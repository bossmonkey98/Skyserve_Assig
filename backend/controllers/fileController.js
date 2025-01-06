const GeoFile = require('../models/GeoFile');

exports.uploadFile = async (req, res) => {
  const { file } = req;
  try {
    const geoFile = new GeoFile({
      userId: req.user.id,
      filename: file.originalname,
      fileType: file.mimetype.includes('geojson') ? 'GeoJSON' : 'KML', // Add TIFF support as needed
    });
    await geoFile.save();
    res.status(201).json({ message: "File uploaded successfully", geoFile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await GeoFile.find({ userId: req.user.id });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
