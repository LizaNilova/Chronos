import Event from "../models/Event.js";

export class EventController {
  async getEventById(req, res) {
    try {
      const event = await Event.findById({ _id: req.params.id });
      res.json(event);
    } catch (error) {
      res.json({ message: "Getting event error" });
    }
  }
  async getAllEvents(req, res) {
    try {
      const event = await Event.find({ author: { _id: req.user.id } }).sort(
        "-date_start"
      );
      res.json(event);
    } catch (error) {
      res.json({ message: "Getting events error" });
    }
  }
  async createEvent(req, res) {
    try {
      const {
        name,
        description,
        date_start,
        date_end,
        calendars,
        type,
        completed,
        repeat,
      } = req.body;

      if (!calendars || !date_start || !date_end)
        return res.json({ message: "Content can not be empty" });

      // categories = id category

      const newEvent = new Event({
        name: name,
        description,
        calendars: calendars,
        type,
        author: req.user.id,
        completed,
        date_start,
        date_end,
        repeat,
      });

      await newEvent.save();
      return res.json(newEvent);
    } catch (error) {
      console.log(error);
      res.json({ message: "Creating event error" });
    }
  }
  async deleteEvent(req, res) {
    try {
      const event = await Event.findById(req.params.id);
      if (req.user._id.equals(event.author)) {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event was deleted" });
      } else return res.json({ message: "No access!" });
    } catch (error) {
      res.json({ message: "Deleting event error" });
    }
  }
  async updateEvent(req, res) {
    try {
      const {
        repeat,
        name,
        description,
        date_start,
        date_end,
        type,
        completed,
      } = req.body;

      const event = await Event.findById(req.params.id);
      if (req.user._id.equals(event.author)) {
        if (name) event.name = name;
        event.description = description;
        if (date_start) event.date_start = date_start;
        if (date_end) event.date_end = date_end;
        if (type) event.type = type;
        if (completed) event.completed = completed;
        event.repeat = repeat;
        await event.save();

        res.json(event);
      } else return res.json({ message: "No access!" });
    } catch (error) {
      res.json({ message: "Updating event error" });
    }
  }
}
