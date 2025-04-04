import * as readlineSync from "readline-sync";

console.log("Bem-vindo a calculadora de salario! Insira sua carga horaria (Ex: 8:45) e o salario bruto.\n");

function lerHorario(mensagem: string): number {
  while (true) {
    const entrada = readlineSync.question(mensagem);
    const [horasStr, minutosStr] = entrada.split(":");
    const horas = parseInt(horasStr);
    const minutos = parseInt(minutosStr);

    if (!isNaN(horas) && !isNaN(minutos)) {
      return horas * 60 + minutos;
    }

    console.log("Entrada invalida! Use o formato HH:MM.");
  }
}

const cargaHorariaMinutos: number = lerHorario("Carga horaria: ");
const salarioBruto: number = parseFloat(readlineSync.question("Salario (Bruto): "));
const descontoMensal: number = parseFloat(readlineSync.question("Desconto mensal em porcentagem: "));

const totalMinutosMes: number = cargaHorariaMinutos * 22;
const totalHorasMes: number = totalMinutosMes / 60;

const salarioLiquido: number = salarioBruto * (1 - descontoMensal / 100);
const salarioPorDia: number = salarioBruto / 22;
const salarioPorHora: number = salarioBruto / totalHorasMes;
const salarioPorMinuto: number = salarioPorHora / 60;

console.log("\nBruto:", salarioBruto.toFixed(2));
console.log("Liquido:", salarioLiquido.toFixed(2));
console.log("Por dia:", salarioPorDia.toFixed(2));
console.log("Por hora:", salarioPorHora.toFixed(2));
console.log("Por minuto:", salarioPorMinuto.toFixed(2));

console.log("\nDeseja calcular as horas extras tambem?");
const opcao: string = readlineSync.question("1 - Sim, 2 - Nao: ");

if (opcao === "1") {
  const totalMinutosExtras: number = lerHorario("\nHoras extras feitas no mes (Ex: 2:30 para 2h30m): ");

  const valorTotalHorasExtras: number = salarioPorMinuto * totalMinutosExtras;
  const valorTotalHorasExtras50: number = valorTotalHorasExtras * 1.5;
  const valorTotalHorasExtras100: number = valorTotalHorasExtras * 2;

  const brutoExtra50: number = salarioBruto + valorTotalHorasExtras50;
  const brutoExtra100: number = salarioBruto + valorTotalHorasExtras100;

  const liquidoExtra50: number = brutoExtra50 * (1 - descontoMensal / 100);
  const liquidoExtra100: number = brutoExtra100 * (1 - descontoMensal / 100);

  console.log("\nValor das horas extras:", valorTotalHorasExtras.toFixed(2));
  console.log("Valor das horas extras com 50%:", valorTotalHorasExtras50.toFixed(2));
  console.log("Valor das horas extras com 100%:", valorTotalHorasExtras100.toFixed(2));

  console.log("\nBruto + Horas extras (50%):", brutoExtra50.toFixed(2));
  console.log("Bruto + Horas extras (100%):", brutoExtra100.toFixed(2));

  console.log("\nLiquido + Horas extras (50%):", liquidoExtra50.toFixed(2));
  console.log("Liquido + Horas extras (100%):", liquidoExtra100.toFixed(2));
}
