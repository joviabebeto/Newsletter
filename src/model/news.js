import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  newsMainTitle: {
    type: String,
  },
  newsTitle: {
    type: String,
  },
  newsSummaryDescription: {
    type: String,
  },
  newsDescription: {
    type: String,
  },
  newsImage: {
    type: Array,
  },
  publisher: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
NewsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "Comment",
    select: "comment postedAt",
  }).populate({
    path:"category",
    select:"categoryName",
  });
  next();
});

const News = mongoose.model("News", NewsSchema);
export default News;