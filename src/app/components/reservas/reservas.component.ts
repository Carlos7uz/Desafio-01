import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/core/models/reserva.model';
import { ReservaService } from 'src/app/core/services/reserva.service';

@Component({
  selector: 'app-forms',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
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

    this.reservaForm = new FormGroup({
      place: new FormControl(this.localDesejado, Validators.required),
      date: new FormControl('', Validators.required),
      people: new FormControl('', [Validators.required, Validators.min(1)]),
      time: new FormControl('', Validators.required)
    });
    console.log(this.reservaForm)
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      console.log('Button reserva clicked and enter in the true if')
      const reservaData: Reserva = this.reservaForm.value;
      this.reservaService.enviarReserva(reservaData).subscribe(
        (reserva) => {
          console.log('Reserva created successfully', reserva);
          this.reservaForm.reset();
          alert('Reserva criada com sucesso!');
          window.location.href = '/profile';
        },
        (error) => {
          console.error('Error creating reserva', error);
          alert('Erro ao criar reserva, tente novamente.');
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
