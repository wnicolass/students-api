class FileController {
  async store(req, res) {
    res.status(200).json('index');
  }
}

export default new FileController();
