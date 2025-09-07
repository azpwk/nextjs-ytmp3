import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "user.json");

// Helper: baca file JSON
function readUsers() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Helper: tulis file JSON
function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const users = readUsers();
      res.status(200).json(users);
      break;
    }

    case "POST": {
      const users = readUsers();
      const newUser = { id: Date.now(), ...req.body };
      users.push(newUser);
      writeUsers(users);
      res.status(201).json(newUser);
      break;
    }

    case "PUT": {
      const users = readUsers();
      const { id, name } = req.body;
      const updatedUsers = users.map((u) => (u.id === id ? { ...u, name } : u));
      writeUsers(updatedUsers);
      res.status(200).json({ message: "User updated" });
      break;
    }

    case "DELETE": {
      const users = readUsers();
      const { userId } = req.query;
      const filtered = users.filter((u) => u.id != userId);
      writeUsers(filtered);
      res.status(200).json({ message: "User deleted" });
      break;
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
