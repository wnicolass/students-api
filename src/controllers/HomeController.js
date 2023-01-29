class HomeController {
  index(req, res) {
    res.status(200).json({
      everythingIsGood: true,
    });
  }
}

export default new HomeController();
