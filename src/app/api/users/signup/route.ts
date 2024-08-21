import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { EMAIL_TYPE } from "@/constants";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // validation
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPw = await bcryptjs.hash(password, salt);
    const newUser = await new User({
      username,
      email,
      password: hashedPw,
    });

    const savedUser = await newUser.save();

    // send verification Email
    await sendEmail({
      email,
      emailType: EMAIL_TYPE.VERIFY,
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "user registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
