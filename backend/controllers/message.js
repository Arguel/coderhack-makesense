const Message = require("../models/message");
const Post = require("../models/post");

function addMessage(req, res) {
  const body = req.body;
  const newMessage = new Message(body);

  Post.findById(req.params.postId, (err, post) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!post) {
        res
            .status(400)
            .send({ code: 400, message: "No se ha encontrado el Post." });
      } else {
        newMessage.save((err, messageStored) => {
          if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
          } else {
            if (!messageStored) {
              res
                  .status(400)
                  .send({ code: 400, message: "No se ha podido crear el message." });
            } else {
              post.messages.push(newMessage.id);
              post.save();
              res
                  .status(200)
                  .send({ code: 200, message: "Message creado correctamente." });
            }
          }
        });
      }
    }
  });
}

function getMessages(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Message.paginate({}, options, (err, messagesStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!messagesStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun message." });
      } else {
        res.status(200).send({ code: 200, messages: messagesStored });
      }
    }
  });
}

function deleteMessage(req, res) {
  const { id } = req.params;

  Message.findByIdAndRemove(req.params.id, (err, messageDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!messageDeleted) {
        res.status(404).send({ code: 404, message: "Message no encontrado." });
      } else {
        Post.findById(
            messageDeleted.postId,
            (err, post) => {
              if (err) {
                res
                    .status(500)
                    .send({ code: 500, message: "Error del servidor." });
              } else {
                if (!post) {
                  res.status(404).send({
                    code: 404,
                    message:
                        "No se a encontrado un post asociado a este message",
                  });
                } else {
                  post.messages.splice(
                      post.messages.indexOf(messageDeleted.id),
                      1
                  );
                  post.save();
                  res.status(200).send({
                    code: 200,
                    message: "El message ha sido eliminado correctamente.",
                  });
                }
              }
            }
        );
      }
    }
  });
}

function getMessage(req, res) {
  const { url } = req.params;

  Message.findOne({ url }, (err, messageStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!messageStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun message." });
      } else {
        res.status(200).send({ code: 200, message: messageStored });
      }
    }
  });
}

module.exports = {
  addMessage,
  getMessages,
  deleteMessage,
  getMessage,
};
