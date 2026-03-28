import { NextResponse } from "next/server";

const MAX_MESSAGE_LENGTH = 10_000;
const MAX_NAME_LENGTH = 200;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // TODO: Integrate Resend, SendGrid, etc.
    console.log("Received message:", { name, email, message });

    return NextResponse.json({ success: true, message: "Message received successfully" });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
