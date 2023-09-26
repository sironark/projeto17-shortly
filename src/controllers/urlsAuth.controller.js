import db from "../database/database.connection.js"

export async function postUrls(req,res){

    try {
        res.status(200).send();
  
      } catch (err) {
        res.status(500).send(err.message);
      }
  }

  export async function deleteUrlsById(req,res){

    try {
        res.status(200).send();
  
      } catch (err) {
        res.status(500).send(err.message);
      }
  }

  export async function getUserFull(req,res){

    try {
        res.status(200).send();
  
      } catch (err) {
        res.status(500).send(err.message);
      }
  }