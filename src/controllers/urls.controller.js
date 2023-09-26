import db from "../database/database.connection.js"

export async function getUrlsById(req,res){

  try {
      res.status(200).send();

    } catch (err) {
      res.status(500).send(err.message);
    }
}

export async function getShortUrls(req,res){

  try {
      res.status(200).send();

    } catch (err) {
      res.status(500).send(err.message);
    }
}


export async function getRanking(req,res){

  try {
      res.status(200).send();

    } catch (err) {
      res.status(500).send(err.message);
    }
}
