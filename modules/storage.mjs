// Database config
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgres://prioritask_db_user:CJA68QkAt6G4PzRzMsuKd4l510LiioXA@dpg-cngv29ect0pc73eanmu0-a.frankfurt-postgres.render.com/prioritask_db?ssl=true`
});

class DataHandler {

    // --- User queries ---

    async insertUser(id, username, email, password) {
        // Connect to database
        const client = await pool.connect();
        let results = null;

        try {

            results = await client.query('INSERT INTO "public"."users"("id","username", "email", "password") VALUES($1, $2, $3, $4) RETURNING *;', [id, username, email, password]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
        }

        return results;
    }

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

    async makeList(list) {
        // Connect to database
        const client = await pool.connect();
        let results = null;
        try {
            results = await client.query('INSERT INTO "public"."lists"("listTitle") VALUES($1);', [list]);
            results = results.rows[0]
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    async getAllLists() {
        const client = await pool.connect();
        let results = null;
        try {
            results = await client.query('SELECT * FROM "public"."lists";');
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


};

export default new DataHandler();