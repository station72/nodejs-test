// TODO move to foreign config provider
export class AppSettings {

  static readonly mongoDb = class {
    static readonly connectionString = 'mongodb://root:rootpassword@localhost:27017/db';
  }

  static readonly secrets = class {
    static readonly passwordHashSalt = 8;
  }

  static readonly server = class {
    static readonly port = 3334;
  }
}