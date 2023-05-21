import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [{
        name: String,
        checked:{
            type:Boolean,
            default:false,
        },
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Todo', TodoSchema);