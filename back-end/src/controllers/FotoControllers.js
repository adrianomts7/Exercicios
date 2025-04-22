class FotoControllers {
  async store(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json("Nenhuma imagem enviada");
      }
      return res.json("index");
    } catch (e) {
      console.error(e);
      return res.status(500).json("Erro ao fazer upload da imagem");
    }
  }
}

export default new FotoControllers();
