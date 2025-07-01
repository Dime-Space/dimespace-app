export function formatCPF(value: string): string {
  // Remove tudo que não for número e limita a 11 dígitos
  let numeros = value.replace(/\D/g, '').slice(0, 11);

  // Aplica a máscara de CPF: 000.000.000-00
  numeros = numeros
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return numeros;
}

export function formatTelefone(value: string): string {
  // Remove tudo que não for número e limita a 11 dígitos (DDD + número)
  let numeros = value.replace(/\D/g, '').slice(0, 11);

  // Se tiver até 10 dígitos (ex: telefone fixo), aplica máscara diferente
  if (numeros.length <= 10) {
    // (00) 0000-0000
    numeros = numeros.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else {
    // (00) 00000-0000
    numeros = numeros.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
  }

  return numeros;
}

export function formatCEP(value: string): string {
  // Remove tudo que não for número e limita a 8 dígitos
  let numeros = value.replace(/\D/g, '').slice(0, 8);

  // Aplica máscara de CEP: 00000-000
  numeros = numeros.replace(/(\d{5})(\d)/, '$1-$2');

  return numeros;
}

export const formatCurrency = (value: string) => {
  return value
    .replace(/\D/g, '') // remove tudo que não é número
    .replace(/^0+/, '') // remove zeros à esquerda
    .replace(/(\d{1,})(\d{2})$/, '$1,$2'); // adiciona vírgula para centavos
};
