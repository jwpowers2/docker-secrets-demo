import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma  from "@/prisma/client";

export async function GET(request: NextRequest){
    const rocks = await prisma.rock.findMany()
    return NextResponse.json(rocks)
}

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400});
    const newrock = await prisma.rock.create({data: {name: body.name, color: body.color, texture: body.texture}})
    return NextResponse.json(newrock,{status: 201})
}