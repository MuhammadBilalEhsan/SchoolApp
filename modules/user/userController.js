const User = require("./userModel");
const bcrypt = require("bcryptjs");

module.exports.registerUser = async (req, res) => {
  let { name, age, email, password, roll, fatherName, phone } = req.body;

  if (!name || !age || !email || !password || !roll || !fatherName || !phone) {
    res.status(422).json({ error: "You Should write all fields properly..!" });
  }
  try {
    const usertExist = await User.findOne({ email }).exec();
    if (usertExist) {
      return res.status(422).json({ error: "User already exists" });
    }
    const user = new User({
      name,
      age,
      email,
      password,
      roll,
      fatherName,
      phone,
    });

    const userSave = await user.save();
    if (userSave) {
      return res.status(200).json({ message: "User saved successfully" });
    } else {
      return res.status(500).json({ message: "User can not registered" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let token;
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all fields properly" });
    } else {
      const userExist = await User.findOne({ email: email }).exec();

      if (userExist) {
        const isMatch = await bcrypt.compare(password, userExist.password);
        token = await userExist.generateAuthToken();
        res.cookie("jwtoken", token, {
          httpOnly: true,
        });
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid Credentials" });
        } else {
          return res.status(200).json({ message: "User Login successfully" });
        }
      } else {
        return res.status(401).json({ error: "User not exist" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.profile = async (req, res) => {
  try {
    const _id = "61708a8defe0fc8e555e618e";
    const userData = await User.findOne({ _id }, (err, user) => {
      if (err) {
        console.log(err);
        res.send({ status: false, error: err });
      }
      res.send({ status: true, userDetails: userData });
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.classMaterials = async (req, res) => {
  // const id = req.params.id;
  const id = "61708a8defe0fc8e555e618e";
  console.log(id);
  // const materials =
};
