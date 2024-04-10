import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/core/models/reserva.model';
import { ReservaService } from 'src/app/core/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
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
    this.reservaForm = new FormGroup({
      place: new FormControl(this.localDesejado, Validators.required),
      date: new FormControl('', Validators.required),
      people: new FormControl('', [Validators.required, Validators.min(1)]),
      time: new FormControl('', Validators.required)
    });
  }

  onSubmit(){

  }

  goBack(): void {
    this.location.back();
  }
}
