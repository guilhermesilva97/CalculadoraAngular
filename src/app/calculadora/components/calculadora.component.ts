import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string = '';
  private numero2: string = '';
  private resultadoOperacaoDisplay: string = '';
  private operacao: string = '';
  private resultadoOperacao: number = 0;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.limpar();
  }

  limpar(): void {
    this.numero1 = '0';
    this.numero2 = '';
    this.resultadoOperacaoDisplay = '';
    this.operacao = '';
    this.resultadoOperacao = 0;
  }

  adicionarNumero(numero: string): void {
    if (this.operacao == '') {
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else {
      this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }

  concatenarNumero(numeroAtual: string, numeroConcatenar: string): string {

    if (numeroAtual == '0' || numeroAtual == null) {
      numeroAtual = '';
    }

    if (numeroConcatenar == '.' && numeroAtual == '') {
      return '0.';
    }

    if (numeroConcatenar == '.' && numeroAtual.indexOf('.') > -1) {
      return numeroAtual;
    }

    return numeroAtual + numeroConcatenar;
  }

  definirOperacao(operacao: string): void {
    if (this.resultadoOperacaoDisplay != '') {
      this.resultadoOperacaoDisplay = '';
    }
    if (this.operacao == '') {
      this.operacao = operacao;
      return;
    }
    if (this.numero2 != '') {
      this.resultadoOperacao = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultadoOperacao.toString();
      this.numero2 = '';
      this.resultadoOperacao = 0;
    }

  }

  calcular(): void {
    if (this.numero2 == '') {
      return;
    }

    this.resultadoOperacao = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao);
    this.resultadoOperacaoDisplay = this.resultadoOperacao.toString();
    this.numero1 = this.resultadoOperacao.toString();
    this.numero2 = '';
  }

  get display(): string {
    if (this.resultadoOperacaoDisplay != '') {
      return this.resultadoOperacaoDisplay;
    }
    if (this.numero2 != '') {
      return this.numero2;
    }
    return this.numero1;
  }

}
