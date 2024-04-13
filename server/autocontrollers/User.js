const User = require('../models/usar');
const Book = require('../models/book');
exports.add_to_favorites = (req, res) => {
  try {
    const b = { book_id: req.body.id };
    User.findById(req.user.id).then((data) => {
      console.log(data);
    });
    User.findByIdAndUpdate(req.user.id, { $push: { favorite: b } })
      .then((data) => res.status(200).send({ mes: 'ok' }))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.add_want_to_read = (req, res) => {
  try {
    const b = { book_id: req.body.id };
    User.findById(req.user.id).then((data) => {
      console.log(data);
    });
    User.findByIdAndUpdate(req.user.id, { $push: { want_to_read: b } })
      .then((data) => res.status(200).send({ mes: 'ok' }))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.see_fav = (req, res) => {
  try {
    console.log('SEE FAV');
    User.findById(req.user.id)
      .then((user) => {
        console.log('user' - user);
        const favList = user.favorite;
        // console.log(favList)
        Book.find()
          .then((books) => {
            const list = [];
            books.forEach((book) => {
              console.log(book._id);
              favList.forEach((favPoint) => {
                if (favPoint.book_id === book._id) {
                  const point = {
                    id: book._id,
                    name: book.name,
                    author: book.author,
                    genre: book.genre,
                    short_description: book.short_description,
                    long_description: book.long_description
                  };
                  list.push(point);
                  console.log('si');
                }
              });
            });
            // console.log(list)
            res.send({ books: list });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.see_want_to_reed = (req, res) => {
  try {
    console.log('SEE FAV');
    console.log(req.user.id);
    User.findById(req.user.id)
      .then((user) => {
        console.log('user' - user);
        const favList = user.want_to_read;
        // console.log(favList)
        Book.find()
          .then((books) => {
            const list = [];
            books.forEach((book) => {
              console.log(book._id);
              favList.forEach((favPoint) => {
                if (favPoint.book_id === book._id) {
                  const point = {
                    id: book._id,
                    name: book.name,
                    author: book.author,
                    genre: book.genre,
                    short_description: book.short_description,
                    long_description: book.long_description
                  };
                  list.push(point);
                  console.log('si');
                }
              });
            });
            // console.log(list)
            res.send({ books: list });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.delete_from_favorites = (req, res) => {
  try {
    console.log('delete to fav');
    console.log(req.user.id);
    console.log(req.body.id);
    const b = { book_id: req.body.id };
    User.findById(req.user.id)
      .then((data) => {
        console.log(data.login);
        const list = [];
        data.favorite.forEach((point) => {
          // console.log(point)
          // console.log(b)
          if (point.book_id !== b.book_id) {
            list.push(point);
            // console.log("si")
          } else {
            // console.log("no")
          }
        });
        User.findByIdAndUpdate(req.user.id, { favorite: list })
          .then((data) => res.status(200).send({ mes: 'ok' }))
          .catch((err) => console.log(err));
      })
      .then((data) => {
        console.log('deleted');
        res.status(200).send({ mes: 'ok' });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.delete_from_want_to_read = (req, res) => {
  try {
    console.log('delete to fav');
    console.log(req.user.id);
    console.log(req.body.id);
    const b = { book_id: req.body.id };
    User.findById(req.user.id)
      .then((data) => {
        console.log(data.login);
        const list = [];
        data.want_to_read.forEach((point) => {
          if (point.book_id !== b.book_id) {
            list.push(point);
          } else {
            // console.log("no")
          }
        });
        User.findByIdAndUpdate(req.user.id, { want_to_read: list })
          .then((data) => console.log('deleted'))
          .catch((err) => console.log(err));
      })
      .then((data) => res.status(200).send({ mes: 'ok' }))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.get_users = (req, res) => {
  try {
    if (req.user.role === 'admin') {
      User.find()
        .then((result) => {
          res.status(200).send({ users: result });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(404).send({ mes: 'no' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.get_user = (req, res) => {
  try {
    if (req.user.role === 'admin') {
      User.findById(req.params.id)
        .then((result) => {
          res.status(200).send({ user: result });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(404).send({ mes: 'no' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.edit_user = (req, res) => {
  try {
    if (req.user.role === 'admin') {
      User.findByIdAndUpdate(req.params.id, {
        login: req.body.login,
        email: req.body.email
      })
        .then((result) => {
          res.status(200).send({ mes: 'yes' });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(404).send({ mes: 'no' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.delete_user = (req, res) => {
  try {
    if (req.user.role === 'admin') {
      User.findByIdAndDelete(req.params.id)
        .then((result) => {
          res.status(200).send({ mes: 'yes' });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(404).send({ mes: 'no' });
    }
  } catch (err) {
    console.log(err);
  }
};
