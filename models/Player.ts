import mongoose, { Document, Model, Schema } from 'mongoose';

interface IPlayer extends Document {
    userId: typeof Schema.Types.ObjectId;
    riotId: string;
    region: string;
}

interface IPlayerModel extends Model<IPlayer> { }

const playerSchema = new Schema<IPlayer>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    riotId: {
        type: String,
        required: false
    },
    region: {
        type: String,
        required: false
    }
});

const Player = (mongoose?.models?.Player as IPlayerModel) || mongoose.model<IPlayer>('Player', playerSchema);

export default Player;