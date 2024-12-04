import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import UserLayout from "../components/layout/UserLayout";

const OrderTracking = () => {
  // Mock order data (replace with API call)
  const order = {
    id: "ORD123456",
    status: "in_transit",
    estimatedDelivery: "2024-02-25",
    trackingNumber: "TRK789012",
    timeline: [
      {
        status: "ordered",
        date: "2024-02-20 10:30 AM",
        description: "Order placed successfully",
        completed: true,
      },
      {
        status: "processed",
        date: "2024-02-21 02:15 PM",
        description: "Order processed and ready for shipping",
        completed: true,
      },
      {
        status: "in_transit",
        date: "2024-02-22 09:45 AM",
        description: "Package in transit",
        completed: true,
      },
      {
        status: "out_for_delivery",
        date: "Pending",
        description: "Out for delivery",
        completed: false,
      },
      {
        status: "delivered",
        date: "Pending",
        description: "Package delivered",
        completed: false,
      },
    ],
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "123-456-7890",
    },
  };

  const getStatusIcon = (status, completed) => {
    if (!completed) return ClockIcon;
    switch (status) {
      case "ordered":
      case "processed":
      case "delivered":
        return CheckCircleIcon;
      case "in_transit":
      case "out_for_delivery":
        return TruckIcon;
      default:
        return XCircleIcon;
    }
  };

  return (
    <UserLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
            <p className="text-gray-600">
              Tracking Number: {order.trackingNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Estimated Delivery</p>
            <p className="font-semibold">
              {new Date(order.estimatedDelivery).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {order.timeline.map((event, index) => {
            const Icon = getStatusIcon(event.status, event.completed);
            return (
              <div
                key={event.status}
                className={`flex items-start mb-8 ${
                  index === order.timeline.length - 1 ? "" : "relative"
                }`}
              >
                {index !== order.timeline.length - 1 && (
                  <div
                    className={`absolute left-4 top-8 w-0.5 h-full ${
                      event.completed ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    event.completed ? "bg-primary text-white" : "bg-gray-200"
                  } mr-4`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold capitalize">
                    {event.status.replace(/_/g, " ")}
                  </h3>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Details */}
        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Items */}
            <div>
              <h3 className="font-medium mb-4">Items</h3>
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600">
                      Quantity: {item.quantity} × ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="font-medium mb-4">Shipping Address</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress.name}
                </p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default OrderTracking;
