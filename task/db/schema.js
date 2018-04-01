var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserCollectionSchema = new Schema({
    id: {
        type: Number,
        require: true,
        default: 1,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: function(value) {
            return new Promise(function(resolve, reject) {
                var regxEmail = /^[a-zA-Z0-9._]+@{1}[a-zA-Z0-9]+.{1}[a-zA-Z]+$/g; /*Altho regex are very costly task*/
                if (regxEmail.test(value)) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        }
    },
    web: {
        type: String,
        required: true,
        validate: function(value) {
            return new Promise(function(resolve, reject) {
                var regxWeb = /^((http|https|HTTP|HTTPS):\/\/)?((www|WWW).)?[a-zA-Z0-9.]+(\/[a-zA-Z0-9.#]*\/*)*$/g; //Altho regex are very costly task * /
                if (regxWeb.test(value)) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        }
    }
});

// UserCollectionSchema.pre('save', function(next) {
//     UserCollectionModel
//         .count({})
//         .exec(function(error, count) {
//             if (!error) {
//                 this.ids = count + 1;
//                 console.log("IN PRE SAVE FUNCTION", this.age);
//                 next();
//             } else {
//                 next(error);
//             }
//         });
// });

var UserCollectionModel = mongoose.model("user", UserCollectionSchema);
UserCollectionModel.collection.createIndex({ "first_name": "text", "last_name": "text" });
UserCollectionModel.on('error', function(error) {
    console.log("Error has been occured in db on error event,", error.message);
    process.exit();
});


module.exports = { UserCollectionModel };