import bcryptjs from "bcryptjs";
import { AppSettings } from '../app.settings';

/** Hash password */
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, AppSettings.secrets.passwordHashSalt);
}