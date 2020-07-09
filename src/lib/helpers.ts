import bcrypt from 'bcryptjs';

const helpers: any = {};

helpers.ecryptPassword = async (password: any) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

helpers.matchPassword = async (password: any, savedPassword: any) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error)
    }
}

export default helpers;