import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center bg-white p-10 rounded-xl shadow">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Thank You For Shopping With Us
        </p>

        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}