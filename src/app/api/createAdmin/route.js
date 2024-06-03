import dbConnect from "@/lib/connectDb";
import adminModel from "@/models/admin";
const bcrypt=require('bcrypt')

export async function POST(req,res){
 await dbConnect();
    try {
          const{firstname,email,password}=await req.json();

          const hashedpassword=await bcrypt.hash(password,10);
           const createAdmin=new adminModel({
            firstname,
            email,
            password:hashedpassword
           })
  //   const token= jwt.sign({
  //     email:createAdmin.email,
  //     id:createAdmin._id
  //   },
  //    process.env.JWT_SECRET
  // )
          await createAdmin.save();
          return new Response(
            JSON.stringify({
              success: true,
              message: "admin created successfully",
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
              message: "Error in creating admin",
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