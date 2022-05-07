const Challenge = require("../models/challenge");
const Post = require("../models/post");

// ADD a new Challenge (POST /:postId)
function addChallenge(req, res) {
  /*
    Expect to get the following properties from the request body (? means they are optional):
    {
        "challengeName": String,
        "description": String,
        "previewLink"?: String,
        "contact"?: Boolean - default false,
    }
    */
  const body = req.body;
  const newChallenge = new Challenge(body);

  Post.findById(req.params.postId, (err, post) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!post) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha encontrado el post." });
      } else {
        newChallenge.save((err, postStored) => {
          if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
          } else {
            if (!postStored) {
              res
                .status(400)
                .send({ code: 400, message: "No se ha podido crear el reto." });
            } else {
              post.challenges.push(newChallenge.id);
              post.save();
              res
                .status(200)
                .send({ code: 200, message: "Reto creado correctamente." });
            }
          }
        });
      }
    }
  });
}

// GET all Challenges (GET)
function getChallenges(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Challenge.paginate({}, options, (err, challengesStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!challengesStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun reto." });
      } else {
        res.status(200).send({ code: 200, challenges: challengesStored });
      }
    }
  });
}

// UPDATE a Challenge (PUT /:id)
function updateChallenge(req, res) {
  /*
    Expect to get the following properties from the request body (? means they are optional):
    {
        "challengeName"?: String,
        "description"?: String,
        "previewLink"?: String,
        "contact"?: Boolean - default false,
    }
    */
  Challenge.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, challengeUpdate) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!challengeUpdate) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun reto." });
        } else {
          res
            .status(200)
            .send({ code: 200, message: "Reto actualizado correctamente." });
        }
      }
    }
  );
}

// DELETE a Challenge (DELETE /:id)
function deleteChallenge(req, res) {
  Challenge.findByIdAndRemove(req.params.id, (err, challengeDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!challengeDeleted) {
        res.status(404).send({ code: 404, message: "Reto no encontrado." });
      } else {
        Post.findById(challengeDeleted.postId, (err, post) => {
          if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
          } else {
            if (!post) {
              res.status(404).send({
                code: 404,
                message: "No se a encontrado un post asociado a este challenge",
              });
            } else {
              post.challenges.splice(
                post.challenges.indexOf(challengeDeleted.id),
                1
              );
              post.save();
              res.status(200).send({
                code: 200,
                message: "El reto ha sido eliminado correctamente.",
              });
            }
          }
        });
      }
    }
  });
}

// GET one Challenge (GET /:id)
function getChallenge(req, res) {
  Challenge.findById(req.params.id, (err, challengeStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!challengeStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun reto." });
      } else {
        res.status(200).send({ code: 200, challenge: challengeStored });
      }
    }
  });
}

module.exports = {
  addChallenge,
  getChallenges,
  updateChallenge,
  deleteChallenge,
  getChallenge,
};
