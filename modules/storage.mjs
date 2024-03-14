// Database config
import pg from "pg";
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

const dbConnectionString = process.env.DB_CONNECTION_STRING;


const pool = new Pool({
    connectionString: dbConnectionString
});

class DataHandler {

    // --- User queries ---

    async insertUser(username, email, password) {

        // Connect to database
        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('INSERT INTO "public"."users"("username", "email", "password") VALUES($1, $2, $3) RETURNING *;', [username, email, password]);
            results = results.rows[0]
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    }

    async existingUser(email) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."users" WHERE email = $1', [email]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async validUser(username, password) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."users" WHERE username = $1 AND password = $2;', [username, password]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async getUser(userId) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."users" WHERE id = $1;', [userId]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            console.error(err.message);
        }
    };

    async editUser(username, id) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('UPDATE "public"."users" SET "username" = $1 WHERE id = $2 RETURNING *;', [username, id]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async eraseUser(id) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('DELETE FROM "public"."users" WHERE id = $1;', [id]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
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
            return results;
        } catch (err) {
            client.end();
            results = err;
        }
    };

    async getAllLists(userId) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."lists" WHERE "userId" = $1;', [userId]);
            results = results.rows;
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async getList(id) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."lists" WHERE id = $1;', [id]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
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
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async eraseList(id) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('DELETE FROM "public"."lists" WHERE id = $1;', [id]);
            console.log("deleted list")
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    // --- Task queries ---

    async makeTask(task, listId, userId) {

        // Connect to database
        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('INSERT INTO "public"."tasks"("task", "listId", "userId") VALUES($1, $2, $3) RETURNING *;', [task, listId, userId]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    // Get all tasks from database
    async getAllTasks(userId) {

        const client = await pool.connect();
        let results = null;
        try {
            results = await client.query('SELECT * FROM "public"."tasks" WHERE "userId" = $1;', [userId]);
            results = results.rows;
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async getTask(id) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."tasks" WHERE id = $1;', [id]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async getTasksByList(listId) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('SELECT * FROM "public"."tasks" WHERE "listId" = $1;', [listId]);
            results = results.rows;
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async changeTask(task, id) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('UPDATE "public"."tasks" SET "task" = $1 WHERE id = $2 RETURNING *;', [task, id]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }

    };

    async eraseTask(id) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('DELETE FROM "public"."tasks" WHERE id = $1;', [id]);
            console.log("deleted task")
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    };

    async deleteTasksByList(listId) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('DELETE FROM "public"."tasks" WHERE "listId" = $1 RETURNING *;', [listId]);
            results = results.rows;
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }

    };

    async completeTask(completed, id) {

        const client = await pool.connect();
        let results = null;

        try {
            results = await client.query('UPDATE "public"."tasks" SET "completed" = $1 WHERE id = $2 RETURNING *;', [completed, id]);
            results = results.rows[0];
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.error(err.message);
        }
    }
};





export default new DataHandler();