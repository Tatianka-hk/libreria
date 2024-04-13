const { changePassword } = require('../middleware/auth');
const User = require('../models/usar');
const jwt = require('jsonwebtoken');

exports.register_post = (req, res) => {
  try {
    const pas = changePassword(req.body.password);
    const user = User({
      login: req.body.login,
      email: req.body.email,
      password: pas,
      role: 'user'
    });
    user.save();
    const usario = { login: req.body.login, email: req.body.email, id: user._i, role: 'user' };
    console.log(usario);
    const accessToken = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.send({ token: accessToken, role: 'user' });
  } catch (err) {
    console.log(err);
  }
};

exports.login_post = (req, res) => {
  try {
    console.log(req.body.login);
    const pas = changePassword(req.body.password);
    User.findOne({ login: req.body.login, password: pas })
      .then((data) => {
        console.log(data);
        if (data == null) {
          res.send('no compare');
        } else {
          const usario = { login: data.login, email: data.email, id: data._id, role: data.role };
          console.log(usario);
          const accessToken = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
          });
          res.send({ token: accessToken, role: data.role });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.register_with_google_post = (req, res) => {
  try {
    const user = User({ role: 'user', login: req.body.login, email: req.body.email });
    user.save();
    const usario = { login: req.body.login, email: req.body.email, id: user._id, role: 'user' };
    const accessToken = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.send({ token: accessToken, role: 'user' });
  } catch (err) {
    console.log(err);
  }
};

exports.register_with_facebook_post = (req, res) => {
  try {
    const user = User({ facebookId: req.body.id, role: 'user', login: req.body.login });
    user.save();
    const usario = { login: req.body.login, id: user._id, role: 'user' };
    const accessToken = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.send({ token: accessToken, role: 'user' });
  } catch (err) {
    console.log(err);
  }
};

exports.login_with_facebook_post = (req, res) => {
  try {
    User.findOne({ facebookId: req.body.id, login: req.body.login })
      .then((data) => {
        if (data == null) {
          res.send('no compare');
        } else {
          const usario = { login: req.body.login, id: data._id };
          const accessToken = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
          });
          res.send({ token: accessToken });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.login_with_google_post = (req, res) => {
  try {
    console.log('tut');
    console.log(req.body.login, req.body.email);
    User.findOne({ login: req.body.login, email: req.body.email })
      .then((data) => {
        if (data == null) {
          console.log('no compare');
          res.send('no compare');
        } else {
          const usario = { login: data.login, email: data.email, id: data._id };
          const accessToken = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
          });
          console.log(accessToken, data.role);
          res.send({ token: accessToken, role: data.role });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.check_admin = (req, res) => {
  try {
    console.log(req.user);
    User.findById(req.user.id).then((data) => {
      if (data.role !== 'admin') {
        res.send({ mes: 'no' });
        console.log('no admin');
      } else {
        res.send('si');
        console.log('admin');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_admin = (req, res) => {
  try {
    console.log(req.user);
    User.findById(req.user.id).then((data) => {
      if (data.role !== 'admin') {
        res.send({ mes: 'no' });
        console.log('no admin');
      } else {
        res.send(data);
        console.log('admin');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_user = (req, res) => {
  try {
    console.log('get user');
    User.findById(req.user.id).then((data) => {
      res.send(data);
      console.log('admin');
    });
  } catch (err) {
    console.log(err);
  }
};

exports.add_admin = (req, res) => {
  try {
    console.log('add admin');
    console.log(req.user.role);
    if (req.user.role === 'admin') {
      const pas = changePassword(req.body.password);
      const user = User({
        login: req.body.login,
        email: req.body.email,
        password: pas,
        role: 'admin'
      });
      user.save();
      res.status(200).send({ mes: 'yes' });
    } else {
      res.send({ mes: 'no' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.edit_admin = (req, res) => {
  try {
    console.log('edit admin');
    if (req.user.role === 'admin') {
      User.findByIdAndUpdate(req.user.id, { login: req.body.login, email: req.body.email })
        .then((result) => {
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

exports.edit_user = (req, res) => {
  try {
    console.log('edit admin');

    User.findByIdAndUpdate(req.user.id, { login: req.body.login, email: req.body.email })
      .then((result) => {
        res.status(200).send({ mes: 'yes' });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.edit_admin_pass = (req, res) => {
  try {
    console.log('edit admin pass');
    if (req.user.role === 'admin') {
      console.log(req.body.password);
      const pass = changePassword(req.body.password);
      User.findByIdAndUpdate(req.user.id, { password: pass })
        .then((result) => {
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
exports.edit_user_pass = (req, res) => {
  try {
    console.log('edit user pass');
    if (req.user.role === 'user') {
      console.log(req.body.password);
      const pass = changePassword(req.body.password);
      User.findByIdAndUpdate(req.user.id, { password: pass })
        .then((result) => {
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
exports.delete_admin = (req, res) => {
  try {
    console.log('delete admin');
    if (req.user.role === 'admin') {
      User.findByIdAndDelete(req.user.id)
        .then((result) => {
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

exports.delete_user = (req, res) => {
  try {
    console.log('delete user');
    if (req.user.role === 'user') {
      User.findByIdAndDelete(req.user.id)
        .then((result) => {
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
