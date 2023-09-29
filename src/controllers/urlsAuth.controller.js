import db from "../database/database.connection.js"
import {nanoid} from 'nanoid'


export async function postUrls(req,res){
    const {url} = req.body;
    const {token, userId} = res.locals.sessions;
    
    try {
      const shortUrl = nanoid(6);
   
        await db.query(`INSERT INTO links
        (url, "shortUrl", "userId") 
        VALUES ($1, $2, $3);`,
        [url, shortUrl, userId])

        const select = await db.query(`SELECT links.id 
        FROM links 
        WHERE "shortUrl" = $1`, [shortUrl]);

      const response = {
        id: select.rows[0].id,
        shortUrl
      }

      res.status(201).send(response);
  
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