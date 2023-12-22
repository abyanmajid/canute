import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import { request } from "http";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request: any) {
    const {code, description} = await request.json()
}