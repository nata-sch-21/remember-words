class ResultModel {
  static async post(data) {
    try {
      // await DB.insert([data]);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async get() {
    try {
      // const data = await DB.cfind({}).exec();
      // return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Result;
