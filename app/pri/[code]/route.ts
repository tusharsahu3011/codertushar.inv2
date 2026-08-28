import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    if (code === "1234") {
        return NextResponse.redirect(
            "https://drive.google.com/drive/u/0/folders/10zmL5L1JNqLEREJHJiVNL9WDuiltB3M5"
        );
    }

    return new Response("Link not found", { status: 404 });
}