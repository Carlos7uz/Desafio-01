import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/core/models/reserva.model';
import { ReservaService } from 'src/app/core/services/reserva.service';



@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  reservaForm!: FormGroup;
  localDesejado: string = '';

  constructor(
    private reservaService: ReservaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.localDesejado = this.route.snapshot.paramMap.get('localDesejado') || '';

    this.reservaForm = this.fb.group({
      place: [this.localDesejado, Validators.required],
      date: ['', Validators.required],
      people: ['', [Validators.required, Validators.min(1)]],
      time: ['', Validators.required]
    });

  }

  onSubmit(): void {
    console.log('Submit button clicked');
    if (this.reservaForm.valid){
      //enviar dados de reserva para o servidor
      this.reservaService.enviarReserva(this.reservaForm.value).subscribe({
        next: (response: Reserva) => {
          console.log('Reserva enviada com sucesso!', response);
        },
        error: (error: any) => {
          console.log('Erro ao enviar reserva', error);
        },
        complete: () => {
          console.log('Observação completa.');
        }
      });


    } else {
      console.log('Form is invalid')
      console.log('Form errors', this.reservaForm.errors)
    }
  }

  goBack():void{
    this.location.back();
  }

}
