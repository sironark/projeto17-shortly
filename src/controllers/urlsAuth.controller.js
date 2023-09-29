import db from "../database/database.connection.js"
import {nanoid} from 'nanoid'


export async function postUrls(req,res){
    const {url} = req.body;
    const {userId} = res.locals.sessions;
    
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
    const {userId} = res.locals.sessions;
    const {id} = req.params;

    
    try {
        const searchLink = await db.query(`SELECT * 
        FROM links 
        WHERE id = $1`,[id]);

      if(!searchLink.rowCount) return res.status(404).send();
      if(searchLink.rows[0].userId != userId) return res.status(401).send();

        await db.query(`DELETE 
        FROM links 
        WHERE id = $1;`,[id]);

      res.status(204).send();
  
      } catch (err) {
        res.status(500).send(err.message);
      }
  }

  export async function getUserFull(req,res){
    const {userId} = res.locals.sessions;
    const array = [];
    let visitCount = 0;
    try {
        const search = await db.query(`SELECT users.id AS "user", users.name ,
        links.id, links."shortUrl", links.url, links."accessCount" AS "visitCount"
        FROM users 
        JOIN links ON links."userId" = users.id 
        WHERE users.id = 2;
        `)
      
      const response = {
        id: search.rows[0].user,
        name: search.rows[0].name
        
      }

      search.rows.map(link => {
        const aux = {
            id: link.id,
            shortUrl: link.shortUrl,
            url: link.url,
            visitCount: link.visitCount
        }
        visitCount = visitCount + Number(link.visitCount)
        array.push(aux)
      })

      response.visitCount = visitCount;
      response.shortenedUrls = array;   

      res.status(200).send(response);
  
      } catch (err) {
        res.status(500).send(err.message);
      }
  }