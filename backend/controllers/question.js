const Question = require("../models/question");
const Post = require("../models/post");

function addQuestion(req, res) {
  const body = req.body;
  const newQuestion = new Question(body);

  Post.findById(req.params.postId, (err, post) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!post) {
        res
            .status(400)
            .send({ code: 400, message: "No se ha encontrado el post." });
      } else {
        newQuestion.save((err, questionStored) => {
          if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
          } else {
            if (!questionStored) {
              res
                  .status(400)
                  .send({ code: 400, message: "No se ha podido crear la pregunta." });
            } else {
              post.questions.push(newQuestion.id);
              post.save();
              res
                  .status(200)
                  .send({ code: 200, message: "Pregunta creada correctamente." });
            }
          }
        });
      }
    }
  });
}

function getQuestions(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Question.paginate({}, options, (err, questionsStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!questionsStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ninguna pregunta.",
        });
      } else {
        res.status(200).send({ code: 200, questions: questionsStored });
      }
    }
  });
}

function updateQuestion(req, res) {
  Question.findByIdAndUpdate(req.params.id, req.body, (err, questionUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!questionUpdate) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ninguna pregunta.",
        });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Pregunta actualizado correctamente." });
      }
    }
  });
}

function deleteQuestion(req, res) {
  Question.findByIdAndRemove(req.params.id, (err, questionDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!questionDeleted) {
        res.status(404).send({ code: 404, message: "Pregunta no encontrada." });
      } else {
        Post.findById(
            questionDeleted.postId,
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
                        "No se a encontrado un post asociado a esta pregunta",
                  });
                } else {
                  post.questions.splice(
                      post.questions.indexOf(questionDeleted.id),
                      1
                  );
                  post.save();
                  res.status(200).send({
                    code: 200,
                    message: "La pregunta ha sido eliminada correctamente.",
                  });
                }
              }
            }
        );
      }
    }
  });
}

function getQuestion(req, res) {
  Question.findById(req.params.id, (err, questionStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!questionStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ninguna pregunta.",
        });
      } else {
        res.status(200).send({ code: 200, question: questionStored });
      }
    }
  });
}

module.exports = {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestion,
};
