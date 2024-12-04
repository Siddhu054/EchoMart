import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, PhotographIcon } from "@heroicons/react/outline";

const ProductModal = ({ isOpen, onClose, onSave, editingProduct = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
      setImagePreview(editingProduct.image);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      image: "",
    });
    setImagePreview(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Price must be a valid number";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (isNaN(formData.stock) || formData.stock < 0)
      newErrors.stock = "Stock must be a valid number";
    if (!formData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
      resetForm();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="mb-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mx-auto h-32 w-32 object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                  )}
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`mt-1 block w-full rounded-md ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 focus:border-primary"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className={`mt-1 block w-full rounded-md ${
                        errors.category
                          ? "border-red-500"
                          : "border-gray-300 focus:border-primary"
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home & Living">Home & Living</option>
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className={`mt-1 block w-full rounded-md ${
                        errors.price
                          ? "border-red-500"
                          : "border-gray-300 focus:border-primary"
                      }`}
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className={`mt-1 block w-full rounded-md ${
                        errors.stock
                          ? "border-red-500"
                          : "border-gray-300 focus:border-primary"
                      }`}
                    />
                    {errors.stock && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.stock}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-primary"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
