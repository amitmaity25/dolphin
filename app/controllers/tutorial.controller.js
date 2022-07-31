const { exist } = require("joi");
const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.findAll = () => {
  return Tutorial.findAll({
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      },
    ],
  })
    .then((tutorials) => {
      return tutorials;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tutorials: ", err);
    });
};

exports.findById = (id) => {
  return Tutorial.findByPk(id, {
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      },
    ],
  })
    .then((tutorial) => {
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding Tutorial: ", err);
    });
};
