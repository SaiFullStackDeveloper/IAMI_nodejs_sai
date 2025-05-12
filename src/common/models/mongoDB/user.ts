import { UserRolesTypes, UserSessionTypes, UserTypes } from '@/common/types/user'
import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true
        },
        userId: {
            type: String,
            unique: true,
            required: false
        },
        name: String,
        phone: String,
        role: String,
        address: String,
        ABN: String,
        password: String,
        isEmailVerified: Boolean,
        isUserVerified: Boolean,
        disabled: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }
)

export const userModel = model('User', userSchema)

export const findUser = async (email: string) => {
    return await userModel.findOne({
        email
    }) as UserTypes & { __v: number } | undefined
}

export const isUserExist = async (email: string) => {
    const user = await userModel.findOne({ email, role: { $in: ['User', 'Agent'] } }, 'name');
    return user ? user : null;
}

export async function updateUserPassword(email: string, newPassword: string) {
    await userModel.updateOne(
        { email: email },
        { $set: { password: newPassword } }
    );
}

export const createUser = async (data: Omit<UserTypes, 'createdAt' | '_id' | 'userId' | 'disabled'>) => {

    const userCount = await userModel.countDocuments({ userId: { $regex: /^IAMI/ } });
    let newUserId = userCount + 1;
    let userExisted = true
    let retry = 0

    while (userExisted && retry < 20) {
        try {
            const id = data.isUserVerified ? `IAMI${String(newUserId).padStart(4, '0')}` : `Agent${String(newUserId)}`;
            userExisted = false
            return await userModel.create({
                ...data,
                userId: id
            })
        } catch (error) {
            if ((error as { code: number }).code === 11000) {
                userExisted = true
                newUserId += 1
            }
            retry += 1
        }
    }
}

export const getUserByRole = async (role: Omit<UserRolesTypes, 'SuperAdmin'>, page: number, limit: number = 10) => {
    const skip = (page - 1) * limit;
    const excludeField = role !== 'Agent' ? '-password -role -isEmailVerified -isUserVerified -__v -_id' : '-password -role -isEmailVerified -__v -_id';
    const users = await userModel.find({ role: role }, excludeField).sort({ isUserVerified: 1, createdAt: -1 }).skip(skip).limit(limit);

    return users;

}

export const getUserByRoleFilterUsingEmail = async (role: Omit<UserRolesTypes, 'SuperAdmin'>, email: string) => {
    const excludeField = role !== 'Agent' ? '-password -role -isEmailVerified -isUserVerified -__v -_id' : '-password -role -isEmailVerified -__v -_id';
    const users = await userModel.findOne({ role: role, email: email }, excludeField);
    return users;
}

export const getAllUsers = async (page: number, limit: number = 10) => {
    const skip = (page - 1) * limit;

    // Fetch all users (with roles "User", "Agent", "Employee") and exclude sensitive fields.
    const users = await userModel.find({}, '-password -__v -_id')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });  // Sorting by created date in descending order

    return users;
}