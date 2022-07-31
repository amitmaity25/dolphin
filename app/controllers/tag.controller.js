const { exist } = require("joi");
const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.findAll = (req, res) => {
  return Tag.findAll({
    include: [
      {
        model: Tutorial,
        as: "tutorials",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tags) => {
      //return tags;
      res.status(200).send(tags);
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tags: ", err);
    });
};

exports.findById = (req, res) => {
  console.log(req.id);
  return Tag.findByPk(req.id, {
    include: [
      {
        model: Tutorial,
        as: "tutorials",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tag) => {
      res.status(200).send(tag);
    })
    .catch((err) => {
      console.log(">> Error while finding Tag: ", err);
    });
};

exports.addTutorial = (tagId, tutorialId) => {
  return Tag.findByPk(tagId)
    .then((tag) => {
      if (!tag) {
        console.log("Tag not found!");
        return null;
      }
      return Tutorial.findByPk(tutorialId).then((tutorial) => {
        if (!tutorial) {
          console.log("Tutorial not found!");
          return null;
        }
        tag.addTutorial(tutorial);
        console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};
