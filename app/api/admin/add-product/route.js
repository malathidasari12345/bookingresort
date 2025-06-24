import DBConnection from "@/app/utils/config/db";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import ProductModel from "@/app/utils/models/Product.js";

export async function GET() {
  await DBConnection();

  const records = await ProductModel.find({});

  return NextResponse.json({ data: records });
}

export async function POST(request) {
  await DBConnection();

  try {
    const data = await request.formData();

    const title = data.get("title");
    const price = data.get("price");
    const offer = data.get("offer");
    const amen = data.get("amen");
    const desc = data.get("desc");
    const image = data.get("image");

    // Validate image
    if (!image || typeof image.arrayBuffer !== "function") {
      return NextResponse.json(
        { success: false, error: "Image file is required" },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const buffer = Buffer.from(await image.arrayBuffer());

    // Create uploads folder if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate a unique filename
    const uniqueName = `${Date.now()}-${image.name}`;
    const imagePath = path.join(uploadDir, uniqueName);

    // Save image to disk
    await writeFile(imagePath, buffer);

    // Create and save product
    const newProduct = new ProductModel({
      title,
      price,
      offer,
      amen,
      desc,
      image: `/uploads/${uniqueName}`,
    });

    await newProduct.save();

    return NextResponse.json(
      { response: "Successfully Uploaded", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product Upload Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
