import mongoose from "mongoose";
const profileSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
})
const dbSchema = new mongoose.Schema({
    userMail : {
      type: 'string',
      required: true,
      lowercase : true,
    },
    fileName: {
        type: String,
        required: true,
      },
      file: {
        type: String,
        required: true
      },
      profile: {
        type: String,
        required: true
      },
      uploadTime: { 
        immutable: true,
        type: Date,
        default: Date.now(),
      },
      // profile: {
      //   type: mongoose.SchemaTypes.ObjectId,
      //   ref: "profile"
      // }
    
})

export  const model = mongoose.model('picture', dbSchema);
export const profile = mongoose.model('profile', profileSchema)

