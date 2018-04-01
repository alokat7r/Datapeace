var express = require('express');
var router = express.Router();
var { UserCollectionModel } = require('../db/schema');

/* GET - get all registered users. */
router.get('/users', function(req, res, next) {
    try {
        req.userData = {};
        req.userData.page = Number(req.query.page) || 1;
        req.userData.limit = Number(req.query.limit) || 5;
        req.userData.name = req.query.name.trim().toLowerCase();
        req.userData.sort = req.query.sort.trim().toLowerCase() || "id";
        next();
    } catch (error) {
        next(error);
    }
}, function(req, res, next) {
    let page = req.userData.page;
    let limit = req.userData.limit;
    let sort = req.userData.sort;
    let name = req.userData.name;
    var findJson = {};
    if (name) {
        findJson = { $text: { $search: name, $caseSensitive: false } };
    }
    //UserCollectionModel.ensureIndexes({ "first_name": "text", "last_name": "text" });
    UserCollectionModel
        .find(findJson)
        .sort(sort)
        .skip((limit * page) - limit)
        .limit(limit)
        .exec((err, result) => {
            if (!err) {
                res.json(result);
            } else {
                //Error occured
                next(err);
            }
        });
});

/**
 * POST - insert new user to db.
 */
router.post('/users', function(req, res, next) {
    try {

        req.userData = {
            "id": Number(req.body.id),
            "first_name": req.body.first_name.trim(),
            "last_name": req.body.last_name.trim(),
            "company_name": req.body.company_name.trim(),
            "age": Number(req.body.age),
            "city": req.body.city.trim(),
            "state": req.body.state.trim(),
            "zip": Number(req.body.zip),
            "email": req.body.email.trim(),
            "web": req.body.web.trim(),

        };

        next();
    } catch (error) {
        next(error);
    }
}, function(req, res, next) {
    var User = new UserCollectionModel(req.userData);
    User.validate(function(error) {
        if (!error) {
            User.save(function(err, result) {
                if (!err) {
                    res.sendStatus(201);
                } else {
                    next(err);
                }
            });
        } else {
            next(error);
        }
    });

});

/**
 * GET - get the detail of a user by id
 */
router.get('/users/:id', function(req, res, next) {
    try {
        req.params.id = Number(req.params.id) || 1;
        next();
    } catch (error) {
        next(error);
    }
}, function(req, res, next) {
    var id = req.params.id;
    UserCollectionModel
        .findOne({ id: id })
        .exec(function(err, result) {
            if (!err) {
                result == null ? res.sendStatus(200) : res.json(result);
            } else {
                next(err);
            }
        });
});

/**
 * PUT - update a user with id
 */
router.put('/users/:id', function(req, res, next) {
    try {
        req.params.id = Number(req.params.id);
        req.userData = {};
        req.userData.first_name = req.body.first_name.trim();
        req.userData.last_name = req.body.last_name.trim();
        req.userData.age = Number(req.body.age);
        next();
    } catch (error) {
        next(error);
    }
}, function(req, res, next) {
    var id = req.params.id;
    UserCollectionModel
        .updateOne({ id: id }, req.userData)
        .exec(function(error, result) {
            if (!error) {
                res.sendStatus(200);
            } else {
                next(error);
            }
        });
});

/**
 * DELETE - delete a user with id
 */

router.delete('/users/:id', function(req, res, next) {
    try {
        req.params.id = Number(req.params.id);
        next();
    } catch (error) {
        next(error);
    }
}, function(req, res, next) {
    var id = req.params.id;
    UserCollectionModel
        .remove({ id: id })
        .exec(function(error, result) {
            if (!error) {
                res.sendStatus(200);
            } else {
                next(error);
            }
        });
});

/**
 * Function - for autoincrement
 */
// var autoincrement = function() {
//     var value = UserCollectionModel
//         .count({});
//     return value + 1;
// };

module.exports = router;