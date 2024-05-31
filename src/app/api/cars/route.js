import dbConnect from "@/lib/connectDb";
import carsModel from "@/models/cars";


export async function POST(req,res){

    await dbConnect();
    
    try {
        
        
          const {dealer,make,model,touring,zippostal,
            distance,year,millage,
           fueltype, transmission,saletype,bodystyle,
            drivetype, exteriorcolor, interiorcolor, doors, cylinder,
            title,forsaleby,cartype, keywords,price,lastdays,carImage,location,
            description
            } = await req.json();
            const createCar = new carsModel({
                dealername:dealer,make,model,touring,zippostal,
                distance,year,millage,fueltype, transmission,saletype,bodystyle,
                drivetype, exteriorcolor, interiorcolor, doors, cylinder,
                title,forsaleby,price,cartype, keywords,location,lastdays,carImg:carImage,
                description
                
            })
            await createCar.save();
            return new Response(
                JSON.stringify({
                  success: true,
                  message: "car created successfully",
                }),
                {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({
              success: false,
              message: "Error in creating car",
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

    export async function GET(req,res){
       await dbConnect();

       try {
             const findcars=await carsModel.find();
             return new Response(
              JSON.stringify({
                success: true,
                data:findcars,
                message: "cars finded successfully",
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
            message: "Error in finding cars",
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