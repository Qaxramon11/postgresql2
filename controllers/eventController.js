const { Event, Event_type, Human_category, Venue, Lang } = require("../models");
const { validateEvent } = require("../validation/eventVal");
const { Op } = require("sequelize");

exports.createEvent = async (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const event = await Event.create(req.body);
    res.status(201).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Human_category,
          as: "human_category",
        },
        {
          model: Venue,
          as: "venue",
        },
        {
          model: Lang,
          as: "lang",
        },
      ],
    });
    if (!event) return res.status(404).send("event not found");
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateEvent = async (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).send("event not found");
    await cart_item.update(req.body);
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).send("event not found");

    const eventData = event.toJSON();

    await event.destroy();
    res.status(204).send(eventData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.searchEvent = async (req, res) => {
  try {
    console.log("Query recieved:", req.query.query);

    const { query } = req.query;
    if (!query) {
      return res.status(400).send("Search query is required");
    }

    const events = await Event.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
