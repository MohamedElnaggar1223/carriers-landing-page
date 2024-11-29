import mongoose, { Document, Model, Schema } from 'mongoose';
import Coach from './Coach';

interface IUser extends Document {
    name: string;
    email: string;
    role: 'coach' | 'player';
}

interface IUserModel extends Model<IUser>{}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
});

// userSchema.pre('deleteOne', async function (next) {
//     await Coach.deleteMany({ userId: this._ });
//     next();
// });

const User = mongoose?.models?.User as IUserModel || mongoose.model<IUser>('User', userSchema);

export default User;