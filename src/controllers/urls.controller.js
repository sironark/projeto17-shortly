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
      if (!searchUrl.rowCount) return res.status(404).send();

      const attAccess = Number(searchUrl.rows[0].accessCount) + 1;
      await db.query(`UPDATE links 
      SET "accessCount" = $1
      WHERE "shortUrl" = $2`,[attAccess, shortUrl])

      res.redirect(searchUrl.rows[0].url)

    } catch (err) {
      res.status(500).send(err.message);
    }
}


export async function getRanking(req,res){ 
  try {
      const search = await db.query(`SELECT users.id AS "user", users.name ,
      links.id, links."shortUrl", links.url, links."accessCount" AS "visitCount"
      FROM users 
      JOIN links ON links."userId" = users.id ;`)
    
          const users = await db.query(`SELECT name, id FROM users;`);
          
          const access = await db.query(`SELECT links."userId" AS id,
            users.name,
            COUNT(links.id) AS "linksCount", 
            SUM(links."accessCount") AS "visitCount"
            FROM links
            JOIN users ON users.id = links."userId"
            GROUP BY "userId", users.name
            ORDER BY "visitCount" DESC
            ; `)
          let response = [...access.rows];
          if (response.length < 10) return res.status(200).send(response);
          
          if (response.length > 10) {
            return res.status(200).send(response.slice(0,10));
          }
    
    } catch (err) {
      res.status(500).send(err.message);
    }
}
