import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
    request: NextRequest, 
    {params}: {params:{id:string}}){
        const rock = await prisma.rock.findUnique({where: {id: parseInt(params.id)}})
        if (!rock) return NextResponse.json({error: 'rock not found'},{status: 404})
    return NextResponse.json(rock)
}

export async function PUT(
    request: NextRequest,
    {params}: {params:{id:string}}){
    const body = await request.json();
    const validation = schema.safeParse(body)
    if (!validation.success) return NextResponse.json(validation.error.errors,{status: 400})
    const rock = await prisma.rock.findUnique({where: {id: parseInt(params.id)}})
    if (!rock) return NextResponse.json({error: 'rock not found'},{status: 404})
    const updatedrock = await prisma.rock.update({where: {id: parseInt(params.id)}, data: {name: body.name, createdBy: body.createdBy}})
    return NextResponse.json(updatedrock)
}

export async function DELETE(
    request: NextRequest,
    {params}: {params:{id:string}}){
    const rock = await prisma.rock.findUnique({where: {id: parseInt(params.id)}})
    if (!rock) return NextResponse.json({error: 'rock not found'},{status: 404})
    await prisma.rock.delete({where: {id: parseInt(params.id)}})
    return NextResponse.json({})
}