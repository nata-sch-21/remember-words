const { Result } = require('./models');

class ResultModel {
  static async create(data) {
    try {
      console.log(data);
      const result = new Result(data);

      await result.save();
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async get() {
    try {
      const data = await Result.find({});
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ResultModel;
