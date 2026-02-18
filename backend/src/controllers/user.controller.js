

async function createUser(req, res) {
   try {
        const { name, email, password, phone, age ,role} = req.body;
        if (!name || !email || !password || !phone || !age) {
           return res.status(400).json({ error: "Name, email, password, phone, age and role are required" });
        }  
        

      const user = await User.create(req.body);
      res.status(201).json(user);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

export { createUser };