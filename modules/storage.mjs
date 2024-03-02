// Database config
import pg from 'pg'
import connectionString from "../.env"
const dbCredentials = process.env.DATABASE_URL || connectionString;

class DataHandler {

    // Specifying the database connection
    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    // --- User queries ---

    async insertUser(id, username, email, password) {
        // Connect to database
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users"("id","username", "email", "password") VALUES($1, $2, $3, $4) RETURNING *;', [id, username, email, password]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    /* Get all users from database
    async getAllUsers() {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."users";');
            results = results.rows;
            console.log(results)
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    async findUser(username, password) {

        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."users" WHERE username = $1 AND password = $2;', [username, password]);
            console.log("data returned", results.rows[0]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;

    }

    async getUser(userId) {
        const client = new pg.Client(this.credentials);
        let results = null;

        try {
            await client.connect();
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
        const client = new pg.Client(this.credentials);
        let results = null;

        try {
            await client.connect();
            results = await client.query('UPDATE "public"."users" SET "username" = $1 WHERE id = $2 RETURNING *;', [username, id]);

            results = results.rows[0];
            client.end();
            res.json(results);
        } catch (err) {
            console.error(err.message);
        }


        return results;
    }



    async eraseUser(id) {
        const client = new pg.Client(this.credentials);
        let results = null;

        try {

            await client.connect();
            results = await client.query('DELETE FROM "public"."users" WHERE id = $1;', [id]);
            console.log("deleted user")
            results = results.rows[0];
            client.end();
            res.json(results);
        } catch (err) {
            console.error(err.message);
        }


        return results;
    };*/

};

export default new DataHandler(dbCredentials);