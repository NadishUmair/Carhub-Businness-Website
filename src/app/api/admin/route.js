import { NextResponse } from "next/server";

export function POST(){

}

export  function GET(request) {
   const data='hy';
   return NextResponse.json({data});
  }