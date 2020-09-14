const fs = require('fs');

class UsersRespository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a respository requires a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, { encoding: "utf8" }));
  }
}

const test = async () => {
  const repo = new UsersRespository("users.json");

  const users = await repo.getAll();

  console.log(users);
}

test();
