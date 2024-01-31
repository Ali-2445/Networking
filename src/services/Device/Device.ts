import { instance } from "@/services/instance";

export const getDevices = async (token: string) => {
  const response = await instance
    .get(`api/pilot-unit/devices`, {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    })
    .json();
  return response;
};

export const getDeviceById = async (token: string, id: string) => {
  const response = await instance
    .get(`api/pilot-unit/device/${id}`, {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    })
    .json();
  return response;
};

export const AddDevice = async (
  token: string,
  vendorId: string,
  modelId: string,
  serialNumber: string
) => {
  const response = await instance
    .post(`api/pilot-unit/device`, {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        vendor_id: vendorId,
        model_id: modelId,
        serial_number: serialNumber,
      }),
    })
    .json();
  return response;
};

export const UpdateDevice = async (
  id: string,
  token: string,
  vendorId: string,
  modelId: string,
  serialNumber: string
) => {
  const response = await instance
    .put(`api/pilot-unit/device/${id}`, {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        vendor_id: vendorId,
        model_id: modelId,
        serial_number: serialNumber,
      }),
    })
    .json();
  return response;
};

export const DeleteDevice = async (id: string, token: string) => {
  const response = await instance
    .delete(`api/pilot-unit/device/${id}`, {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    })
    .json();
  return response;
};
