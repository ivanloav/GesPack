// import axios from "axios";
import { API_BASE_URL } from "../config";
import { api } from "./axiosConfig";

// Get token from localStorage
export const getToken = (): string | null =>
  localStorage.getItem("accessToken");

// Define the structure of your data types
interface Order {
  id?: number;
  status?: string;
  [key: string]: any;
}

interface Product {
  id?: number;
  name?: string;
  [key: string]: any;
}

interface Customer {
  id?: number;
  name?: string;
  [key: string]: any;
}

// Dashboard Data Function
export const getDashboardData = async (): Promise<any> => {
  const token = getToken();

  if (!token) {
    throw new Error("No hay token, por favor inicia sesión.");
  }

  console.log("Token:", token);
  try {
    const response = await api.get(`${API_BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del dashboard", error);
    throw error;
  }
};

// Orders Functions
export const getOrders = async (): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching data in getOrders", error);
    throw error;
  }
};

export const createOrder = async (order: Order): Promise<any> => {
  try {
    const response = await api.post(`${API_BASE_URL}/orders`, order, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error creating order", error);
    throw error;
  }
};

export const deleteOrder = async (orderId: number): Promise<any> => {
  try {
    const response = await api.delete(`${API_BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting order", error);
    throw error;
  }
};

export const updateOrder = async (
  orderId: number,
  orderData: Order
): Promise<any> => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/orders/${orderId}`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  orderId: number,
  newState: string
): Promise<any> => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/orders/${orderId}/status`,
      { status: newState },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estado del pedido:", error);
    throw error;
  }
};

export const getOrderById = async (orderId: number): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID", error);
    throw error;
  }
};

// Inventory and Products Functions
export const getInventory = async (): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/inventory`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching inventory", error);
    throw error;
  }
};

export const getProducts = async (): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching products", error);
    throw error;
  }
};

export const createProduct = async (product: Product): Promise<any> => {
  try {
    const response = await api.post(`${API_BASE_URL}/products`, product, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error creating product", error);
    throw error;
  }
};

export const deleteProduct = async (productId: number): Promise<any> => {
  try {
    const response = await api.delete(`${API_BASE_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};

export const updateProduct = async (
  productId: number,
  updatedData: Product
): Promise<any> => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/products/${productId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

// Customer Functions
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await api.get(`${API_BASE_URL}/customers`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error;
  }
};

// Statistics and Dashboard Functions
export const getStatisticsDataOrders = async (): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const orders = response.data;

    const statisticsData = {
      received: orders.filter((order: Order) => order.status === "received")
        .length,
      processing: orders.filter((order: Order) => order.status === "processing")
        .length,
      shipped: orders.filter((order: Order) => order.status === "shipped")
        .length,
      delivered: orders.filter((order: Order) => order.status === "delivered")
        .length,
      labels: ["Recibidos", "En proceso", "Enviados", "Entregados"],
    };

    return statisticsData;
  } catch (error) {
    console.error("Error fetching statistics data:", error);
    throw error;
  }
};

export const getTopProducts = async (): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/dashboard/top-products`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top products", error);
    throw error;
  }
};

export const fetchSalesData = async (): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/dashboard/sales-data`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    throw error;
  }
};
