const Post = require("../models/post");
const Entrepreneur = require("../models/entrepreneur");

// ADD a new Post (POST /:entrepreneurId)
function addPost(req, res) {
  /*
    Expect to get the following properties from the request body (? means they are optional):
    {
        "logo": String,
        "title": String,
        "description": String,
        "challenges"?: Challenge[],
        "messages"?: Message[],
        "questions"?: Question[],
    }
    */
  const body = req.body;
  const newPost = new Post(body);

  Entrepreneur.findById(req.params.entrepreneurId, (err, entrepreneur) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!entrepreneur) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha encontrado el emprendedor." });
      } else {
        newPost.save((err, postStored) => {
          if (err) {
            console.log(err);
            res.status(500).send({ code: 500, message: "Error del servidor." });
          } else {
            if (!postStored) {
              res
                .status(400)
                .send({ code: 400, message: "No se ha podido crear el post." });
            } else {
              entrepreneur.posts.push(newPost.id);
              entrepreneur.save();
              res
                .status(200)
                .send({ code: 200, message: "Post creado correctamente." });
            }
          }
        });
      }
    }
  });
}

// GET all Posts (GET)
function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Post.paginate({}, options, (err, postsStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postsStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun post." });
      } else {
        res.status(200).send({ code: 200, posts: postsStored });
      }
    }
  });
}

// UPDATE a Post (PUT /:id)
function updatePost(req, res) {
  /*
    Expect to get the following properties from the request body (? means they are optional):
    {
        "logo"?: String,
        "title"?: String,
        "description"?: String,
        "challenges"?: Challenge[],
        "messages"?: Message[],
        "questions"?: Question[],
    }
    */
  Post.findByIdAndUpdate(req.params.id, req.body, (err, postUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postUpdate) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun post." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Post actualizado correctamente." });
      }
    }
  });
}

// DELETE a Post (DELETE /:id)
function deletePost(req, res) {
  Post.findByIdAndRemove(req.params.id, (err, postDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postDeleted) {
        res.status(404).send({ code: 404, message: "Post no encontrado." });
      } else {
        Entrepreneur.findById(
          postDeleted.entrepreneurId,
          (err, entrepreneur) => {
            if (err) {
              res
                .status(500)
                .send({ code: 500, message: "Error del servidor." });
            } else {
              if (!entrepreneur) {
                res.status(404).send({
                  code: 404,
                  message:
                    "No se a encontrado un emprendedor asociado a este post",
                });
              } else {
                entrepreneur.posts.splice(
                  entrepreneur.posts.indexOf(postDeleted.id),
                  1
                );
                entrepreneur.save();
                res.status(200).send({
                  code: 200,
                  message: "El post ha sido eliminado correctamente.",
                });
              }
            }
          }
        );
      }
    }
  });
}

// GET one Post (GET /:id)
function getPost(req, res) {
  Post.findById(req.params.id)
    .populate("challenges", "messages", "questions")
    .exec((err, postStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!postStored) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun post." });
        } else {
          res.status(200).send({ code: 200, post: postStored });
        }
      }
    });
}

module.exports = {
  addPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
};
