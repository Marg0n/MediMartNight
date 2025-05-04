"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE = process.env.NEXT_PUBLIC_BASE_API;
// console.log(API_BASE)

export const createOrder = async (payload: any) => {
  try {
    const res = await fetch(`${API_BASE}/orders/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await res.json(); // includes GatewayPageURL
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllOrders = async (page: number = 1, limit: number = 100) => {
  try {
    const query = new URLSearchParams();
    query.append("page", page.toString());
    query.append("limit", limit.toString());

    const res = await fetch(`${API_BASE}/orders?${query.toString()}`, {
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const res = await fetch(`${API_BASE}/orders/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong while fetching orders");
  }
};

export const updateOrder = async (id: string, payload: Partial<any>) => {
  console.log("from service", id, payload);
  try {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(res);
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const confirmOrderSuccess = async (transactionId: string) => {
  try {
    const res = await fetch(`${API_BASE}/orders/success/${transactionId}`, {
      method: "POST",
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const handleOrderFailure = async (transactionId: string) => {
  try {
    const res = await fetch(`${API_BASE}/orders/fail/${transactionId}`, {
      method: "POST",
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
