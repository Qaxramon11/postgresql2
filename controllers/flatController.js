const { Flat } = require("../models");
const { validateFlat } = require("../validation/flatVal");
const { Op } = require("sequelize");

exports.createFlat = async (req, res) => {
  const { error } = validateFlat(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const flat = await Flat.create(req.body);
    res.status(201).send(flat);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getFlats = async (req, res) => {
  try {
    const flats = await Flat.findAll();
    res.status(200).send(flats);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findByPk(req.params.id);
    if (!flat) return res.status(404).send("flat not found");
    res.status(200).send(flat);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateFlat = async (req, res) => {
  const { error } = validateFlat(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const flat = await Flat.findByPk(req.params.id);
    if (!flat) return res.status(404).send("flat not found");
    await cart_item.update(req.body);
    res.status(200).send(flat);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteFlat = async (req, res) => {
  try {
    const flat = await Flat.findByPk(req.params.id);
    if (!flat) return res.status(404).send("flat not found");

    const flatData = flat.toJSON();

    await flat.destroy();
    res.status(204).send(flatData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.searchFlat = async (req, res) => {
  try {
    console.log("Query recieved:", req.query.query);

    const { query } = req.query;
    if (!query) {
      return res.status(400).send("Search query is required");
    }

    const flats = await Flat.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.status(200).send(flats);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
