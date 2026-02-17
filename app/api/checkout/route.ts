import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializamos Stripe de la forma más sencilla para evitar errores de versión
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: 'Producto de Prueba Real',
              description: 'Venta de artículo desde mi app',
            },
            unit_amount: 50000, // $500.00 MXN
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Error en Stripe:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}