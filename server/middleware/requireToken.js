import jwt from "jsonwebtoken";
import Client from "../models/Client.js";

const requireToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in" });
    }

    const { userId } = payload;
    const user = await Client.findById(userId);
    req.user = user;
    next();
  });
};

export default requireToken;
