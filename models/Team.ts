import mongoose, { Document, Model, Schema } from 'mongoose';

enum PlayName {
    Valorant = 'Valorant',
    LeagueOfLegends = 'League of Legends',
    Overwatch = 'Overwatch'
}

interface ITeam extends Document {
    name: string;
    playName: 'Valorant' | 'League of Legends' | 'Overwatch';
    numberOfPlayers: number; 
    coachId: typeof Schema.Types.ObjectId;
    players: typeof Schema.Types.ObjectId[];
}

interface ITeamModel extends Model<ITeam>{}

const teamSchema = new Schema<ITeam>({
    name: { 
        type: String, 
        required: true 
    },
    playName: { 
        type: String,
        enum: Object.values(PlayName),
        required: true
    },
    numberOfPlayers: { 
        type: Number, 
        required: true 
    },
    coachId: { 
        type: Schema.Types.ObjectId,
        ref: 'Coach',
        required: true
    },
    players: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Player',
    }],
});

const Team = (mongoose?.models?.Team as ITeamModel) || mongoose.model<ITeam>('Team', teamSchema);

export default Team;