import mongoose, { Document, Model, Schema } from 'mongoose';

interface IJoinUs extends Document {
    fullName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    role: 'player' | 'coach';
    isPartOfTeam: boolean;
    gameName: string;
    teamName?: string;
}

interface IJoinUsModel extends Model<IJoinUs> { }

const joinUsSchema = new Schema<IJoinUs>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    countryCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['player', 'coach'],
        required: true
    },
    isPartOfTeam: {
        type: Boolean,
        required: true
    },
    gameName: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: false
    }
});

const JoinUs = (mongoose?.models?.JoinUs as IJoinUsModel) || mongoose.model<IJoinUs>('JoinUs', joinUsSchema);

export default JoinUs;