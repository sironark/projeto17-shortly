import { format } from "date-fns";
import db from "../database/database.connection.js"

export async function postSignup(req,res){

    try {
      
        res.status(200).send();

      } catch (err) {
        res.status(500).send(err.message);
      }
}

export async function postSignin(req,res){

  try {
      res.status(200).send();

    } catch (err) {
      res.status(500).send(err.message);
    }
}
