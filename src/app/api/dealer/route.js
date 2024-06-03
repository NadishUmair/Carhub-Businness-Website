import dbConnect from "@/lib/connectDb";
import dealerModel from "@/models/dealermodel";

// export async function GET(){
//   await dbConnect();

//   return new Response("Your plain text message", {
//     status: 200,
//     headers: {
//       "Content-Type": "text/plain",
//     },
//   });
// }
export async function GET(){
  await dbConnect();
   try {
         const findDealers=await dealerModel.find();
    
         return new Response(
          JSON.stringify({
            success: false,
            data:findDealers,
            message: "dealers founded succesfully",
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
        message: "Error in finding dealer",
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


export async function POST(req,res) {
  await dbConnect();
  
  try {
    const { dealerName,dealerlogo } = await req.json();
 
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
      dealerName,
      dealerlogo
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

// export async function GET(req,res){
//   await dbConnect();
//   try {
//    const findDealers=await dealerModel.find();
//    return new Response(
//     JSON.stringify({
//       success: true,
//       data:findDealers,
//       message: "Dealer found successfully",
//     }),
//     {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );
   
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Error in finding dealers",
//       }),
//       {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   }
// }