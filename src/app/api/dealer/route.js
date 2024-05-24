import dbConnect from "@/lib/connectDb";
import dealerModel from "@/models/dealermodel";

export async function GET(){
  await dbConnect();

  return new Response("Your plain text message", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export async function POST(req,res) {
  await dbConnect();
  try {
    const { dealerName } = await req.json();
    const findDealer=await dealerModel.findOne({dealerName})
    if(findDealer){
      // throw new Error("DealerName already exist")
      return new Response(
        JSON.stringify(
          {
          success:false,
          message:'DealerName already exist'
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    console.log(dealerName);
    // You can add your dealer creation logic here
     const createDealer=dealerModel({
      dealerName
     })
     await createDealer.save();
    // If the dealer creation is successful, return a success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Dealer created successfully",
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("Error in creating dealer:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error in creating dealer",
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