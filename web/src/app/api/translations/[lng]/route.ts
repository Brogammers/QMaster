import { NextResponse } from "next/server";
import { translations } from "@/app/translations";

export async function GET(
  request: Request,
  { params }: { params: { lng: string } }
) {
  try {
    const { lng } = params;
    return NextResponse.json(translations[lng as keyof typeof translations] || translations.en);
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(translations.en, { status: 500 });
  }
} 