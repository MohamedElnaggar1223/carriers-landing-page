'use server'
import { connectDB } from '@/lib/mongoose';
import OTP from '@/models/OTP';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

async function sendOTPEmail(email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASS, 
        }
    })

  await transporter.sendMail({
    from: 'your-email@example.com',
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
  });
}

export async function createOTP(email: string): Promise<{ success: boolean; message: string }> {
  await connectDB();

  try {
    const otp = generateOTP();
    const existingOTP = await OTP.findOne({ email });
    if(existingOTP) await OTP.deleteOne({ _id: existingOTP._id });
    await OTP.create({ email, otp });
    await sendOTPEmail(email, otp);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Failed to create OTP:', error);
    return { success: false, message: 'Failed to send OTP' };
  }
}

export async function verifyOTP(email: string, otp: string): Promise<{ success: boolean; message: string }> {
  await connectDB();

  try {
    const otpInstance = await OTP.findOne({ email, otp });
    if (otpInstance) {
      await OTP.deleteOne({ _id: otpInstance._id });
      return { success: true, message: 'OTP verified successfully' };
    } else {
      return { success: false, message: 'Invalid OTP' };
    }
  } catch (error) {
    console.error('Failed to verify OTP:', error);
    return { success: false, message: 'Failed to verify OTP' };
  }
}