import db from "../database/database.connection.js"

export async function getUrlsById(req,res){
  const {id} = req.params;

  try {
      const verifyUrl = await db.query(`SELECT links.id, links."shortUrl", links.url 
      FROM links 
      WHERE id = $1;`, [id]);
       if (!verifyUrl.rowCount) return res.status(404).send();

      res.status(200).send(verifyUrl.rows[0]);

    } catch (err) {
      res.status(500).send(err.message);
    }
}

export async function getOpenShortUrls(req,res){
  const {shortUrl} = req.params;
  
  try {
      const searchUrl = await db.query(`SELECT links.url, links."accessCount"
      FROM links
      WHERE "shortUrl" = $1;`,[shortUrl])

      const attAccess = Number(searchUrl.rows[0].accessCount) + 1;
      
      await db.query(`UPDATE links 
      SET "accessCount" = $1`,[attAccess])

      res.redirect(searchUrl.rows[0].url)

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
