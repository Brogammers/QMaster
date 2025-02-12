import { NextResponse } from "next/server";
import { CrowdinApi } from "@crowdin/crowdin-api-client";

const crowdin = new CrowdinApi({
  token: process.env.CROWDIN_API_TOKEN,
  organization: process.env.CROWDIN_ORGANIZATION,
});

const JARGON_TERMS = [
  "QMaster",
  "API",
  // Add other terms that shouldn't be translated
];

export async function GET(
  request: Request,
  { params }: { params: { lng: string } }
) {
  try {
    const { lng } = params;
    if (lng !== "ar") return NextResponse.json({});

    // Get all translatable strings from your app
    const strings = await getAllTranslatableStrings();

    // Translate using Crowdin API
    const translations = await Promise.all(
      strings.map(async (str) => {
        // Skip translation for jargon terms
        if (JARGON_TERMS.some(term => str.includes(term))) {
          return [str, str];
        }

        const translation = await crowdin.translateText(str, "en", lng);
        return [str, translation];
      })
    );

    // Convert to key-value pairs
    const translationMap = Object.fromEntries(translations);

    return NextResponse.json(translationMap);
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({}, { status: 500 });
  }
} 