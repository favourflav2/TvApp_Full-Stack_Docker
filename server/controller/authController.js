import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const { Pool, Client } = pg;



export async function sign_Up(req, res) {
  const client = new Client(process.env.POSTGRES_URI);
  await client.connect();
  const { username, password, email } = req.body;

  try {
    // Have to check is new user already has email in google login table too
    const googleText = 'SELECT * FROM google_login WHERE email = $1'
    const googleEmail = [email]
    const googleAccount = await client.query(googleText,googleEmail)

    if(googleAccount.rows.length > 0 ){
      return res
        .status(400)
        .json({ msg: "This is email is already being used" });
    }

    const regText = 'SELECT * FROM login WHERE email = $1'
    const regEmail = [email]
    const regAccount = await client.query(regText,regEmail)

    if(regAccount.rows.length > 0){
      return res
      .status(400)
      .json({ msg: "This is email is already being used" });
    }

    const hash = await bcrypt.hash(password, 10);
    const text = "INSERT INTO login (hash, email) VALUES ($1, $2) RETURNING *";
    const pushUserIntoLoginTable = await client.query(text, [hash, email]);

    

    //console.log(pushUserIntoLoginTable.rows[0])
    if (pushUserIntoLoginTable.rows[0]) {
      const query = {
        text: "INSERT INTO users (email,joined,username) VALUES ($1, $2, $3) RETURNING *",
        values: [email, new Date(), username]
      }
      const user = await client.query(query);
      //console.log(user.rows[0]);
      const token = jwt.sign(
        { email: email, id: user.rows[0].user_id },
        process.env.SECRET,
        { expiresIn: "3h" }
      );
      await client.end();
      console.log("disconnected from client");
      return res.status(200).json({ user: user.rows[0], token });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}

export async function log_In(req, res) {
  const client = new Client(process.env.POSTGRES_URI);
  await client.connect();
  const { email, password } = req.body;

  try {
    const query = {
      text:  "SELECT email,hash FROM login WHERE email = $1",
      values: [email]
    }
    const loginTable = await client.query(query);
    //console.log(loginTable.rows[0])

    if (!loginTable.rows[0]) {
      return res.status(400).json({ msg: "No users by that email" });
    } else {
      const isMatch = await bcrypt.compare(password, loginTable.rows[0].hash);

      if (!isMatch) {
        return res.status(400).json({ msg: "Passwords do not match" });
      }
      const text = "SELECT * FROM users WHERE email = $1"
      const value = [email]
      const user = await client.query(text, value);
      const token = jwt.sign(
        { email: email, id: user.rows[0].user_id },
        process.env.SECRET,
        { expiresIn: "3h" }
      );
      await client.end();
      res.status(200).json({ user: user.rows[0], token });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}

export async function google_Sign_In(req, res) {
  const client = new Client(process.env.POSTGRES_URI);
  await client.connect();
  const { sub, email, username } = req.body;

  try {
    // const pushUserIntoGoogleLoginTable = await pool.query('INSERT INTO google_login (google_id, email) VALUES ($1, $2) RETURNING *',[sub,email])
    // console.log(pushUserIntoGoogleLoginTable.rows[0])
    const oldUserText = "SELECT * FROM login WHERE email = $1"
    const oldUserValues = [email]
    const oldUser = await client.query(oldUserText, oldUserValues);

    if (oldUser.rows.length > 0) {
      return res
        .status(400)
        .json({ msg: "This is email is already being used" });
    }

    const alreadyInGoogleLoginTableText = "SELECT * FROM google_login WHERE email = $1"
    const alreadyInGoogleLoginTableValues = [email]
    const alreadyInGoogleLoginTable = await client.query(alreadyInGoogleLoginTableText,alreadyInGoogleLoginTableValues);

    if (alreadyInGoogleLoginTable.rows.length) {
      const query = {
        text:"SELECT * from users WHERE email = $1",
        values: [email]
      }
      const user = await client.query(query);
      console.log("already in table");
      const token = jwt.sign(
        { email: email, id: user.rows[0].google_id },
        process.env.SECRET,
        { expiresIn: "3h" }
      );
      await client.end();
      console.log("disconnected from client");
      return res.status(200).json({ user: user.rows[0], token });
    } else {
      const pushUserQuery = {
        text:"INSERT INTO google_login (google_id, email) VALUES ($1, $2) RETURNING *",
        values: [sub, email]
      }
      const pushUserIntoGoogleLoginTable = await client.query(pushUserQuery);

      const userQuery = {
        text:"INSERT INTO users (email,joined,username,google_id) VALUES ($1, $2, $3, $4) RETURNING *",
        values: [email, new Date(), username, sub]
      }
      const user = await client.query(userQuery);
      const token = jwt.sign(
        { email: email, id: user.rows[0].google_id },
        process.env.SECRET,
        { expiresIn: "3h" }
      );
      console.log("push in user");
      await client.end();
      console.log("disconnected from client");
      return res.status(200).json({ user: user.rows[0], token });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}

export async function like_Tv(req, res) {
  const client = new Client(process.env.POSTGRES_URI);
  await client.connect();
  const { name, showId, imgPath } = req.body;
  //console.log(req.userId)
  //console.log(req.userId.length)

  try {
    if (req.userId.length >= 21) {
      const everythingQuery = {
        text:  "SELECT * FROM tvshow WHERE loggedingoogle_id = $1",
        values: [req.userId]
      }
      const everything = await client.query(everythingQuery);
      const index = everything.rows.findIndex((val) => val.show_id === showId);
      //console.log(index);

      if (index === -1) {
        const query = {
          text:  "INSERT INTO tvshow (name,show_id,loggedingoogle_id,imgpath) VALUES ($1, $2, $3, $4) RETURNING *",
          values: [name, showId, req.userId, imgPath]
        }
        const insertData = await client.query(query);
      } else {
        const query = {
          text:  "DELETE FROM tvshow WHERE show_id = $1",
          values: [showId]
        }
        const del = await client.query(query);
      }

      const query = {
        text:  "SELECT * FROM tvshow WHERE loggedingoogle_id = $1",
        values: [req.userId]
      }
      const everything2 = await client.query(query);
      return res.status(200).json(everything2.rows);
      //console.log(everything2.rows)
    } else {
      const query = {
        text:  "SELECT * FROM tvshow WHERE loggedinuser_id = $1",
        values: [req.userId]
      }
      const everything = await client.query(query);
      const index = everything.rows.findIndex((val) => val.show_id === showId);
      //console.log(index)

      if (index === -1) {
        const query = {
          text:  "INSERT INTO tvshow (name,show_id,loggedinuser_id,imgpath) VALUES ($1, $2, $3, $4) RETURNING *",
          values: [name, showId, req.userId, imgPath]
        }
        const insertData = await client.query(query);
      } else {
        const query = {
          text:  "DELETE FROM tvshow WHERE show_id = $1",
          values: [showId]
        }
        const del = await client.query(query);
      }

      const everything2Query = {
        text:  "SELECT * FROM tvshow WHERE loggedinuser_id = $1",
        values: [req.userId]
      }
      const everything2 = await client.query(everything2Query);
      await client.end();
      return res.status(200).json(everything2.rows);
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}

export async function get_Liked_Tv(req, res) {
  const client = new Client(process.env.POSTGRES_URI);
  await client.connect();
  try {
    if (req.userId.length >= 21) {
      const query = {
        text:  "SELECT * FROM tvshow WHERE loggedingoogle_id = $1",
        values: [req.userId]
      }
      const likeData = await client.query(query);
      //SELECT * FROM tvshow WHERE loggedingoogle_id
      //console.log(likeData.rows)
      await client.end();
      console.log("disconnected from client");
      return res.status(200).json(likeData.rows);
    } else {
      const query = {
        text:  "SELECT * FROM tvshow WHERE loggedinuser_id = $1",
        values: [req.userId]
      }
      const likeData = await client.query(query);
      await client.end();
      console.log("disconnected from client");
      return res.status(200).json(likeData.rows);
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}
