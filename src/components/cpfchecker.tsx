export function validarCPF(cpf: string): boolean {
  // Remove tudo que não for número
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) return false;

  // Elimina CPFs com todos os dígitos iguais (ex: 11111111111)
  if (/^(\d)\1+$/.test(cpf)) return false;

  const calcDigito = (pos: number) => {
    let soma = 0;
    for (let i = 0; i < pos - 1; i++) {
      soma += parseInt(cpf.charAt(i)) * (pos - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto;
  };

  const digito1 = calcDigito(10);
  const digito2 = calcDigito(11);

  return (
    digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10))
  );
}
