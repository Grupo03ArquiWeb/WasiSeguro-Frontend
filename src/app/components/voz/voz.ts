import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VozResponse, VozService } from '../../services/voz';

@Component({
  selector: 'app-voz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voz.html',
  styleUrl: './voz.css'
})
export class VozComponent {

  textoReconocido: string = '';
  escuchando: boolean = false;
  mensajeError: string = '';
  respuesta?: VozResponse;

  private recognition: any;

  constructor(
    private vozService: VozService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  iniciarEscucha(): void {
    this.mensajeError = '';
    this.respuesta = undefined;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.mensajeError = 'Tu navegador no soporta reconocimiento de voz.';
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-PE';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onstart = () => {
      this.escuchando = true;
      this.changeDetectorRef.detectChanges();
    };

    this.recognition.onresult = (event: any) => {
      this.textoReconocido = event.results[0][0].transcript;
      this.escuchando = false;
      this.enviarComando();
      this.changeDetectorRef.detectChanges();
    };

    this.recognition.onerror = () => {
      this.escuchando = false;
      this.mensajeError = 'No se pudo reconocer la voz. Intenta nuevamente.';
      this.changeDetectorRef.detectChanges();
    };

    this.recognition.onend = () => {
      this.escuchando = false;
      this.changeDetectorRef.detectChanges();
    };

    this.recognition.start();
  }

  enviarComando(): void {
    if (this.textoReconocido.trim() === '') {
      this.mensajeError = 'Ingrese o diga un comando.';
      return;
    }

    this.vozService.procesarComando(this.textoReconocido).subscribe({
      next: (data) => {
        this.respuesta = data;
      },
      error: () => {
        this.mensajeError = 'No se pudo conectar con la API de voz.';
      }
    });
  }

  limpiar(): void {
    this.textoReconocido = '';
    this.respuesta = undefined;
    this.mensajeError = '';
  }
}