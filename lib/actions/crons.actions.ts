import { connectDB } from '@/lib/mongoose';
import cron from 'node-cron';
import OTP from '@/models/OTP';

export function setupCleanupJob() {
    cron.schedule('* * * * *', async () => {
        await connectDB();
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        await OTP.deleteMany({ createdAt: { $lt: fiveMinutesAgo } });
        console.log('Expired OTPs cleared');
    });
}