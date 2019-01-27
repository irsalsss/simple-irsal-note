const mongoose = require ('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema ({
  title: String,
  body: String,
}, { timestamps: true});

NotesSchema.methods.toJSON = function (){
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    createdAt: this.createdAt,
    updateAt: this.updateAt
  };
};

mongoose.model('Notes', NotesSchema);