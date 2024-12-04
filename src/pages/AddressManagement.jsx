import { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import UserLayout from "../components/layout/UserLayout";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "123-456-7890",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: "John Doe",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      phone: "123-456-7890",
      isDefault: false,
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    isDefault: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr
        )
      );
      setEditingAddress(null);
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }
    setIsAddingNew(false);
    setFormData({
      type: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      isDefault: false,
    });
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setIsAddingNew(true);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <UserLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Addresses</h1>
          {!isAddingNew && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddingNew(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Address
            </motion.button>
          )}
        </div>

        {isAddingNew ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address Type
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  placeholder="Home, Office, etc."
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) =>
                      setFormData({ ...formData, isDefault: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Set as default address
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingAddress(null);
                }}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                {editingAddress ? "Update" : "Save"} Address
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="ml-2 text-sm text-primary">Default</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-1 hover:bg-gray-100 rounded text-red-500"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">{address.name}</p>
                  <p className="text-gray-600">{address.street}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-gray-600">{address.phone}</p>
                </div>

                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="mt-4 text-primary text-sm hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default AddressManagement;
