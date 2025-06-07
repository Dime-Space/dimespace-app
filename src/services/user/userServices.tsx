import { Step1Data, Step2Data } from '@/components/ui/registermodal/types';

export const registerUser = async (
  userData: Step1Data,
  addressData: Step2Data,
) => {
  const payload = {
    ...userData,
    address: {
      cep: addressData.cep,
      state: addressData.estado,
      city: addressData.cidade,
      street: addressData.rua,
      number: addressData.numero,
      complement: addressData.complemento,
    },
  };

  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Erro ao cadastrar: ${response.statusText}`);
  }

  return await response.json();
};
