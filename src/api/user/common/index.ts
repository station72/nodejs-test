import bcryptjs from "bcryptjs";
const salt = 8;

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, salt);
}
