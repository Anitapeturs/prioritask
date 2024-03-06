// Database config
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgres://prioritask_db_user:CJA68QkAt6G4PzRzMsuKd4l510LiioXA@dpg-cngv29ect0pc73eanmu0-a.frankfurt-postgres.render.com/prioritask_db?ssl=true`
});

class DataHandler {

    // --- User queries ---

    async insertUser(username, email, password) {
        // Connect to database
        const client = await pool.connect();
        let results = null;

        try {

            results = await client.query('INSERT INTO "public"."users"("username", "email", "password") VALUES($1, $2, $3) RETURNING *;', [username, email, password]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
        }

        return results;
    }

    async validUser(username, password) {
        const client = await pool.connect();
        let results = null;

        try {

            results = await client.query('SELECT * FROM "public"."users" WHERE username = $1 AND password = $2;', [username , password]);
            results = results.rows[0];
            client.end();
            res.json(results);
        } catch (err) {
            console.error(err.message);
        }


        return results;
    };

    async getUser(userId) {
        const client = await pool.connect();
        let results = null;

        try {

            results = await client.query('SELECT * FROM "public"."users" WHERE id = $1;', [userId]);
            results = results.rows[0];
            client.end();
            res.json(results);
        } catch (err) {
            console.error(err.message);
        }


        return results;
    };

    async editUser(username, id) {
        const client = await pool.connect();
        let results = null;

        try {

            results = await client.query('UPDATE "public"."users" SET "username" = $1 WHERE id = $2 RETURNING *;', [username, id]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.error(err.message);
        }


        return results;
    }

    async eraseUser(id) {
        const client = await pool.connect();
        let results = null;

        try {

            results = await client.query('DELETE FROM "public"."users" WHERE id = $1;', [id]);
            results = results.rows[0];
            client.end();
            res.json(results);
        } catch (err) {
            console.error(err.message);
        }


        return results;
    };


    // --- List queries ---

    async makeList(list, userId) {
        // Connect to database
        const client = await pool.connect();
        let results = null;
        try {
            results = await client.query('INSERT INTO "public"."lists"("listTitle", "userId") VALUES($1, $2);', [list, userId]);
            results = results.rows[0]
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    async getAllLists(userId) {
        const client = await pool.connect();
        let results = null;
        try {
            results = await client.query('SELECT * FROM "public"."lists" WHERE "userId" = $1;', [userId]);
            results = results.rows;
            console.log(results);
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    async getList(id) {
        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."lists" WHERE id = $1;', [id]);

            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            console.error(err.message);
        }
    };

    async changeList(list, listId) {
        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('UPDATE "public"."lists" SET "listTitle" = $1 WHERE id = $2 RETURNING *;', [list, listId]);
            results = results.rows[0];
            client.end();
            res.json(results);
        } catch (err) {
            console.error(err.message);
        }


        return results;
    };

    async eraseList(id) {
        const client = await pool.connect();
        let results = null;

        try {

            results = await client.query('DELETE FROM "public"."lists" WHERE id = $1;', [id]);
            console.log("deleted list")
            results = results.rows[0];
            client.end();
            res.json(results);
        } catch (err) {
            console.error(err.message);
        }


        return results;
    };

         // --- Task queries ---

    async makeTask(task, listId) {
        // Connect to database
        const client = await pool.connect();
        let results = null;
        try {
            results = await client.query('INSERT INTO "public"."tasks"("task", "listId") VALUES($1, $2) RETURNING *;', [task, listId]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

// Get all tasks from database
    async getAllTasks() {
        const client = await pool.connect();
        let results = null;
        try {
            results = await client.query('SELECT * FROM "public"."tasks";');
            results = results.rows;
            console.log(results);
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    async getTask(id) {
        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."tasks" WHERE id = $1;', [id]);
            
            results = results.rows[0];
            client.end();
            res.json(results);
          } catch (err) {
            console.error(err.message);
          }

         
          return results;
        };


    async changeTask(task, id) {
        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('UPDATE "public"."tasks" SET "task" = $1 WHERE id = $2 RETURNING *;', [task, id]);
            results = results.rows[0];
            client.end();
            res.json(results);
          } catch (err) {
            console.error(err.message);
          }

         
          return results;
        };

        async eraseTask(id) {
            const client = await pool.connect();
            let results = null;
    
            try {

                results = await client.query('DELETE FROM "public"."tasks" WHERE id = $1;', [id]);
                console.log("deleted task")
                results = results.rows[0];
                client.end();
                res.json(results);
              } catch (err) {
                console.error(err.message);
              }
    
             
              return results;
            };
        
            async getTasksByList(listId) {
                const client = await pool.connect();
                let results = null;
        
                try {
                    results = await client.query('SELECT "task" FROM "public"."tasks" WHERE "listId" = $1;', [listId]);
                    
                    results = results.rows;
                    client.end();
                    res.json(results);
                  } catch (err) {
                    console.error(err.message);
                  }
        
                 
                  return results;
                };
   
    


};





export default new DataHandler();