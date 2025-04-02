"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
console.log("Bem-vindo a calculadora de salario! Insira sua carga horaria (Ex: 8:45) e o salario bruto.\n");
function lerHorario(mensagem) {
    while (true) {
        var entrada = readlineSync.question(mensagem);
        var _a = entrada.split(":"), horasStr = _a[0], minutosStr = _a[1];
        var horas = parseInt(horasStr);
        var minutos = parseInt(minutosStr);
        if (!isNaN(horas) && !isNaN(minutos)) {
            return horas * 60 + minutos;
        }
        console.log("Entrada invalida! Use o formato HH:MM.");
    }
}
var cargaHorariaMinutos = lerHorario("Carga horaria: ");
var salarioBruto = parseFloat(readlineSync.question("Salario (Bruto): "));
var descontoMensal = parseFloat(readlineSync.question("Desconto mensal em porcentagem: "));
var totalMinutosMes = cargaHorariaMinutos * 22;
var totalHorasMes = totalMinutosMes / 60;
var salarioLiquido = salarioBruto * (1 - descontoMensal / 100);
var salarioPorDia = salarioBruto / 22;
var salarioPorHora = salarioBruto / totalHorasMes;
var salarioPorMinuto = salarioPorHora / 60;
console.log("\nBruto:", salarioBruto.toFixed(2));
console.log("Liquido:", salarioLiquido.toFixed(2));
console.log("Por dia:", salarioPorDia.toFixed(2));
console.log("Por hora:", salarioPorHora.toFixed(2));
console.log("Por minuto:", salarioPorMinuto.toFixed(2));
console.log("\nDeseja calcular as horas extras tambem?");
var opcao = readlineSync.question("1 - Sim, 2 - Nao: ");
if (opcao === "1") {
    var totalMinutosExtras = lerHorario("\nHoras extras feitas no mes (Ex: 2:30 para 2h30m): ");
    var valorTotalHorasExtras = salarioPorMinuto * totalMinutosExtras;
    var valorTotalHorasExtras50 = valorTotalHorasExtras * 1.5;
    var valorTotalHorasExtras100 = valorTotalHorasExtras * 2;
    var brutoExtra50 = salarioBruto + valorTotalHorasExtras50;
    var brutoExtra100 = salarioBruto + valorTotalHorasExtras100;
    var liquidoExtra50 = brutoExtra50 * (1 - descontoMensal / 100);
    var liquidoExtra100 = brutoExtra100 * (1 - descontoMensal / 100);
    console.log("\nValor das horas extras:", valorTotalHorasExtras.toFixed(2));
    console.log("Valor das horas extras com 50%:", valorTotalHorasExtras50.toFixed(2));
    console.log("Valor das horas extras com 100%:", valorTotalHorasExtras100.toFixed(2));
    console.log("\nBruto + Horas extras (50%):", brutoExtra50.toFixed(2));
    console.log("Bruto + Horas extras (100%):", brutoExtra100.toFixed(2));
    console.log("\nLiquido + Horas extras (50%):", liquidoExtra50.toFixed(2));
    console.log("Liquido + Horas extras (100%):", liquidoExtra100.toFixed(2));
}
