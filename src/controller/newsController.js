import News from "../model/news";
import errorResponse from "../utils/errorResponse";
import successResponse from "../utils/successResponse";
import sendEmail from "../utils/email";
import User from "../model/User";

class NewsController {

  static async createNews(req, res) {
    const news = await News.create(req.body);
    try {
      if (!news) {
        return errorResponse(res, 401, `News not created`);
      } else {
        const users = await User.find();
        users.map((user) => {
          sendEmail(user, news);
        });
        return successResponse(res, 201, `News successfuly Posted`, news);
      }
    } catch (error) {
      return errorResponse(res, 404, error);
    }
  }


  static async getAllNews(req, res) {
    const news = await news.find();
    try {
      if (!news) {
        return errorResponse(res, 401, `No news Found`);
      } else {
        return successResponse(res, 200, `News ${news.length} found`, news);
      }
    } catch (error) {
      return errorResponse(res, 404, error);
    }
  }
 

  static async updateNews(req, res) {
    const { id } = req.params;
    const news = await News.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    try {
      if (!news) {
        return errorResponse(res, 401, `news not updated`);
      } else {
        return successResponse(res, 200, `News successfuly updated`, news);
      }
    } catch (error) {
      return errorResponse(res, 404, error);
    }
  }



  static async getOneNews(req, res) {
    const { id } = req.params;
    const news = await News.findOne({ _id: id });
    try {
      if (!news) {
        return errorResponse(res, 401, `news with id ${id} not found`);
      } else {
        return successResponse(
          res,
          200,
          `news successfuly retrieved with ${news.comment.length} comments`,
          news
        );
      }
    } catch (error) {
      return errorResponse(res, 404, error);
    }
  }
  static async deleteAllNews(req, res) {
    const news = await News.deleteMany();
    return successResponse(res, 200, "alll news deleted", news);
  }
  static async like(req, res) {
   
    const newsId = req.params.id;
  
    const news = await News.findById({ _id: newsId });
    if (!news) {
      return errorResponse(res, 401, `News not found`);
    } else {
    
      const userId = req.user._id;

    
      if (news.likes.includes(userId)) {
        return errorResponse(res, 401, "you already like the news");
      } else {
     
        if (news.dislikes.includes(userId)) {
          news.dislikes.pull(userId);
        }
      
        news.likes.push(userId);
        news.save();
        return successResponse(
          res,
          200,
          `like from ${req.user.firstName}`,
          news
        );
      }
   
    }
  }
  static async dislike(req, res) {
    const newsId = req.params.id;
    const news = await News.findById({ _id: newsId });
    if (!news) {
      return errorResponse(res, 401, `News not found`);
    } else {
      const userId = req.user._id;
      if (news.dislikes.includes(userId)) {
        return errorResponse(res, 401, `you already disliked`);
      }
      if (news.likes.includes(userId)) {
        news.likes.pull(userId);
      }
      news.dislikes.push(userId);
      news.save();
      return successResponse(
        res,
        200,
        `you dislike ${req.user.firstName}`,
        news
      );
    }
  }
  static async deleteOneNews(req, res) {
    const id = req.params.id;
    const news = await News.findByIdAndDelete({ _id: id });
    if (!news) {
      return errorResponse(res, 401, `news with id ${id} not found`);
    } else {
      return successResponse(res, 200, `news successfuly deleted`, news);
    }
  }
}
export default NewsController;