const Shape = require('../models/Shape');
const Marker = require('../models/Marker');

exports.saveShapes = async (req, res) => {
  try {
    const { shapes } = req.body;
    await Shape.create({ user: req.user._id, shapes });
    res.status(201).json({ message: 'Shapes saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save shapes' });
  }
};

exports.getShapes = async (req, res) => {
  try {
    const shapes = await Shape.findOne({ user: req.user._id });
    res.status(200).json(shapes ? shapes.shapes : []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load shapes' });
  }
};

exports.saveMarkers = async (req, res) => {
  try {
    const { markers } = req.body;
    await Marker.create({ user: req.user._id, markers });
    res.status(201).json({ message: 'Markers saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save markers' });
  }
};

exports.getMarkers = async (req, res) => {
  try {
    const markers = await Marker.findOne({ user: req.user._id });
    res.status(200).json(markers ? markers.markers : []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load markers' });
  }
};
