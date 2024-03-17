// Database config
import pg from "pg";
const { Pool } = pg;
import dotenv from 'dotenv';
import SuperLogger from './SuperLogger.mjs'; 
dotenv.config();

const dbConnectionString = process.env.DB_CONNECTION_STRING;

const pool = new Pool({
    connectionString: dbConnectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

class DataHandler {

    // --- User queries ---

    async insertUser(username, email, password) {
        try {
            const client = await pool.connect();
            const results = await client.query('INSERT INTO "public"."users"("username", "email", "password") VALUES($1, $2, $3) RETURNING *;', [username, email, password]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error inserting user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async existingUser(email) {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM "public"."users" WHERE email = $1', [email]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error checking existing user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async validUser(username, password) {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM "public"."users" WHERE username = $1 AND password = $2;', [username, password]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error validating user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async getUser(userId) {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM "public"."users" WHERE id = $1;', [userId]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error getting user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async editUser(username, id) {
        try {
            const client = await pool.connect();
            const results = await client.query('UPDATE "public"."users" SET "username" = $1 WHERE id = $2 RETURNING *;', [username, id]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error editing user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async eraseUser(id) {
        try {
            const client = await pool.connect();
            const results = await client.query('DELETE FROM "public"."users" WHERE id = $1;', [id]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error erasing user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    // --- List queries ---

    async makeList(list, userId) {
        try {
            const client = await pool.connect();
            const results = await client.query('INSERT INTO "public"."lists"("listTitle", "userId") VALUES($1, $2);', [list, userId]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error making list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async getAllLists(userId) {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM "public"."lists" WHERE "userId" = $1;', [userId]);
            client.end();
            return results.rows;
        } catch (error) {
            SuperLogger.log(`Error getting all lists: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async getList(id) {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM "public"."lists" WHERE id = $1;', [id]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error getting list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async changeList(list, listId) {
        try {
            const client = await pool.connect();
            const results = await client.query('UPDATE "public"."lists" SET "listTitle" = $1 WHERE id = $2 RETURNING *;', [list, listId]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error changing list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async eraseList(id) {
        try {
            const client = await pool.connect();
            const results = await client.query('DELETE FROM "public"."lists" WHERE id = $1;', [id]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error erasing list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    // --- Task queries ---

    async makeTask(task, listId, userId) {
        try {
            const client = await pool.connect();
            const results = await client.query('INSERT INTO "public"."tasks"("task", "listId", "userId") VALUES($1, $2, $3) RETURNING *;', [task, listId, userId]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error making task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async getAllTasks(userId) {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM "public"."tasks" WHERE "userId" = $1;', [userId]);
            client.end();
            return results.rows;
        } catch (error) {
            SuperLogger.log(`Error getting all tasks: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async getTask(id) {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM "public"."tasks" WHERE id = $1;', [id]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error getting task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async getTasksByList(listId) {
        try {
            const client = await pool.connect();
            const results = await client.query('SELECT * FROM "public"."tasks" WHERE "listId" = $1;', [listId]);
            client.end();
            return results.rows;
        } catch (error) {
            SuperLogger.log(`Error getting tasks by list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async changeTask(task, id) {
        try {
            const client = await pool.connect();
            const results = await client.query('UPDATE "public"."tasks" SET "task" = $1 WHERE id = $2 RETURNING *;', [task, id]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error changing task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async eraseTask(id) {
        try {
            const client = await pool.connect();
            const results = await client.query('DELETE FROM "public"."tasks" WHERE id = $1;', [id]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error erasing task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async deleteTasksByList(listId) {
        try {
            const client = await pool.connect();
            const results = await client.query('DELETE FROM "public"."tasks" WHERE "listId" = $1 RETURNING *;', [listId]);
            client.end();
            return results.rows;
        } catch (error) {
            SuperLogger.log(`Error deleting tasks by list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }

    async completeTask(completed, id) {
        try {
            const client = await pool.connect();
            const results = await client.query('UPDATE "public"."tasks" SET "completed" = $1 WHERE id = $2 RETURNING *;', [completed, id]);
            client.end();
            return results.rows[0];
        } catch (error) {
            SuperLogger.log(`Error completing task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
        }
    }
};

export default new DataHandler();