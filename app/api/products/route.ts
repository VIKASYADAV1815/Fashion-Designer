import { NextResponse } from "next/server";
import productsData from "@/lib/products.json";
import fs from "fs";
import path from "path";

const productsFilePath = path.resolve(process.cwd(), 'lib', 'products.json');

// Required for Next.js static export builds (`output: 'export'`).
// Without this, Next fails the build for this route.
export const dynamic = "force-static";
export const revalidate = 0;

export async function GET() {
  try {
    // The robust way to read the file for GET requests
    return NextResponse.json(productsData);
  } catch (error: any) {
    console.error(`Error reading or parsing products.json: ${error.message}`);
    return NextResponse.json({ error: "Failed to load product data.", details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const updatedProducts = await request.json();
    // This will still fail in production, but works for local dev
    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2), "utf8");
    return NextResponse.json({ message: "Products updated successfully" });
  } catch (error: any) {
    console.error(`Error writing to products.json: ${error.message}`);
    return NextResponse.json({ error: "Failed to save product data.", details: error.message }, { status: 500 });
  }
}