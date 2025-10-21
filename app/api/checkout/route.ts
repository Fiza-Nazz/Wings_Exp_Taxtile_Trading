import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe without apiVersion (auto uses latest stable)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, success_url, cancel_url } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Prepare line items for Stripe
    const line_items = items.map((item: any) => {
      const unit_amount = Math.round(
        parseFloat(String(item.price).replace(/[^0-9.]/g, "")) * 100
      );

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title || "Product",
            // optional: add image: [item.image] if you have hosted image links
          },
          unit_amount,
        },
        quantity: item.quantity || 1,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url:
        success_url ||
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`,
      cancel_url:
        cancel_url ||
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/cancel`,
    });

    // Return the session URL to client
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe create session error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
