import mongoose, { Document, Model, Schema } from 'mongoose';

interface ICoach extends Document {
    phoneNumber: string;
    userId: typeof Schema.Types.ObjectId;
}

interface ICoachModel extends Model<ICoach>{}

const coachSchema = new Schema<ICoach>({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Coach = (mongoose?.models?.Coach as ICoachModel) || mongoose.model<ICoach>('Coach', coachSchema);

export default Coach;