const User = require('../models/usar');
const Book = require('../models/book');

exports.getBooks = (req, res) => {
  try {
    // let libros = Book.find();
    console.log('BOOOKS - ', req.user.id);
    User.findById(req.user.id)
      .then((user) => {
        console.log('user' - user);
        console.log('user' - user);

        const favList = user.favorite;

        console.log('si');

        const wantReadList = user.want_to_read;
        console.log(favList);
        console.log(wantReadList);
        Book.find()
          .then((books) => {
            const list = [];

            books.forEach((book) => {
              let flagFav = false;

              favList.forEach((favPoint) => {
                if (favPoint.book_id === book._id) {
                  console.log('FINDED');
                  flagFav = true;
                }
              });
              let wtrFav = false;
              wantReadList.forEach((wtrPoint) => {
                if (wtrPoint.book_id === book._id) {
                  console.log('FINDED');
                  wtrFav = true;
                }
              });
              const point = {
                id: book._id,
                name: book.name,
                author: book.author,
                genre: book.genre,
                short_description: book.short_description,
                long_description: book.long_description,
                fav: flagFav,
                gl: wtrFav
              };
              list.push(point);
            });
            res.send({ books: list });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.addBbook = (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const book = new Book({
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre,
        short_description: req.body.short_description,
        long_description: req.body.long_description
      });
      book.save();
      res.status(200).send({ mes: 'yes' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getBook = (req, res) => {
  try {
    Book.findById(req.params.id).then((book) => {
      const point = {
        id: book._id,
        name: book.name,
        author: book.author,
        genre: book.genre,
        short_description: book.short_description,
        long_description: book.long_description
      };
      res.send({ book: point });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editBook = (req, res) => {
  try {
    if (req.user.role === 'admin') {
      Book.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre,
        short_description: req.body.short_description,
        long_description: req.body.long_description
      })
        .then((book) => {
          console.log('edit');
          res.status(200).send({ mes: 'yes' });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.send({ mes: 'no' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBook = (req, res) => {
  try {
    if (req.user.role === 'admin') {
      Book.findByIdAndDelete(req.params.id)
        .then((book) => {
          console.log('delete');
          res.status(200).send({ mes: 'yes' });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.send({ mes: 'no' });
    }
  } catch (err) {
    console.log(err);
  }
};
