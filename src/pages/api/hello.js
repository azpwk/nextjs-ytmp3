// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

// src/pages/api/users.js

// Simulasi database (pakai array dulu)
let users = [
  { id: 1, name: "Budi" },
  { id: 2, name: "Ani" },
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Ambil semua user
      res.status(200).json(users);
      break;

    case "POST":
      // Tambah user baru
      const newUser = { id: Date.now(), ...req.body };
      users.push(newUser);
      res.status(201).json(newUser);
      break;

    case "PUT":
      // Update user
      const { id, name } = req.body;
      users = users.map((u) => (u.id === id ? { ...u, name } : u));
      res.status(200).json({ message: "User updated" });
      break;

    case "DELETE":
      // Hapus user
      const { userId } = req.query;
      users = users.filter((u) => u.id != userId);
      res.status(200).json({ message: "User deleted" });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
