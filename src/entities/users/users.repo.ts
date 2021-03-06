import { PaginatedQuery, PaginatedResult } from "../../interfaces/query.interface";
import DB from "../../utils/database";
import { User } from "./user.model";

const getAllUsers = async (q: PaginatedQuery): Promise<PaginatedResult<User>> => {
  const queryText = `SELECT * FROM users LIMIT $1 OFFSET $2`;
  const result = await DB.query(queryText, [(q.limit ?? 10), ((q.page ?? 1) - 1) * (q.limit ?? 10)]);
  return {
    page: q.page ?? 1,
    limit: q.limit ?? 10,
    models: result.rows,
  };
};

const getUserById = async (id: number): Promise<User> => {
  const queryText = `SELECT * FROM users WHERE id = $1`;
  const result = await DB.query(queryText, [id]);
  return result.rows[0];
};

const getUserByEmail = async (email: string): Promise<User> => {
  const queryText = `SELECT * FROM users WHERE email = $1`;
  const result = await DB.query(queryText, [email]);
  return result.rows[0];
};

const createUser = async (user: User): Promise<User> => {
  const queryText = `INSERT INTO users (name, color, avatar, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const result = await DB.query(queryText, [
    user.name,
    user.color,
    user.avatar ?? null,
    user.email,
    user.password,
  ]);
  return result.rows[0];
};

// delete user method
const deleteUser = async (id: number): Promise<boolean> => {
  const queryText = `DELETE FROM users WHERE id = $1 `;
  await DB.query(queryText, [id]);
  return true;
};

export { getAllUsers, getUserById, getUserByEmail, createUser, deleteUser };
