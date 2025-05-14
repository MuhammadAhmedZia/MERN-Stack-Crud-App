const User = require('../MODEL/user')
const  bcrypt  = require( "bcryptjs");

const handleCreateUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: "Email is already exist"})
        }
        const  salt = await bcrypt.genSalt(10);
        
        const user = new User({name, email, password});
        user.password = await bcrypt.hash(password, salt)
        const newUser = await user.save();

        res.send(newUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }

}

const handleReadAllUser = async (req, res) => {
    try {
        const user = await User.find({});
 
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }

}

const handleReadUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById({_id: id});
        
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }

}

const handleDeleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({_id: id});
        
        res.json(user);
    }catch (err) {
        res.status(500).json({error: err.message});
    }

}

const handleUpdateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const {password} = req.body;

        const  salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // const user = await User.findByIdAndUpdate({_id: id}, req.body, {new: true});
        const user = await User.findByIdAndUpdate({_id: id}, {password: hashedPassword});
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }

}


module.exports = {
    handleCreateUser,
    handleReadAllUser,
    handleReadUserById,
    handleDeleteUserById,
    handleUpdateUserById,
}
