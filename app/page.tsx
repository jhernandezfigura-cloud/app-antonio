'use client';

export default function Home() {
  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', { method: 'POST' });
    const { id } = await res.json();
    const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Mi Tienda Real</h1>
      <div className="border p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Producto Increíble</h2>
        <p className="mb-6 text-gray-600">$500.00 MXN</p>
        <button 
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Comprar ahora
        </button>
      </div>
      {/* Script necesario para cargar Stripe en el cliente */}
      <script src="https://js.stripe.com/v3/" async></script>
    </main>
  );
}