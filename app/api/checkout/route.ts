import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27', // O la versión más reciente que te aparezca
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: 'Producto de Prueba Real', // Aquí cambias el nombre
              description: 'Venta de artículo desde mi app',
            },
            unit_amount: 50000, // Equivale a $500.00 MXN (se pone en centavos)
          },
          quantity: 1,
        },
      ],
      mode: 'payment', // 'payment' es para ventas únicas, 'subscription' para planes
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}