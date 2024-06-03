import dbConnect from "@/lib/connectDb";
import adminModel from "@/models/admin";
import bcrypt from 'bcrypt';

export async function POST(req) {
    await dbConnect();
    try {
        const { email, password } = await req.json();
       

        const findAdmin = await adminModel.findOne({ email });
        if (!findAdmin) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Admin does not exist",
                }),
                {
                    status: 409,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        const matchPassword = await bcrypt.compare(password, findAdmin.password);
     
        if (!matchPassword) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Password does not match",
                }),
                {
                    status: 409,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        const { password: _, ...adminData } = findAdmin._doc;

        return new Response(
            JSON.stringify({
                success: true,
                admin: adminData,
                message: "Admin logged in successfully",
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error logging in admin",
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
