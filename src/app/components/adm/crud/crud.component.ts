import { Location, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { RestauranteService } from 'src/app/core/services/restaurante.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  selectedRestaurante!: Restaurante;
  isEditing = false;

  form = this.fb.group({
    id: [{value:'', disabled: true}],
    img: [''],
    name: ['',[ Validators.required, Validators.minLength(6)]],
    type: ['', [ Validators.required, Validators.minLength(5)]],
    endereco: ['', [ Validators.required, Validators.minLength(6)]],
    horario: ['', [ Validators.required, Validators.minLength(6)]],
    comoChegar: [''],
  })

  constructor(
    private fb: FormBuilder,
    private restauranteService: RestauranteService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.getRestaurante();
  }

  getRestaurante(): void{
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId !== 'new') {
      this.isEditing = true;

      const id = Number(paramId);
      this.restauranteService.getRestaurante(id).subscribe((restaurante) => {
        this.selectedRestaurante = restaurante
        this.form.controls['id'].setValue(restaurante.id)
        this.form.controls['img'].setValue(restaurante.img)
        this.form.controls['name'].setValue(restaurante.name)
        this.form.controls['type'].setValue(restaurante.type)
        this.form.controls['endereco'].setValue(restaurante.endereco)
        this.form.controls['horario'].setValue(restaurante.horario)
        this.form.controls['comoChegar'].setValue(restaurante.comoChegar)
      })

    }
  }


  goBack():void{
    this.location.back();
  }

   //Formulario valido => salvar alterações
   //UPDATE
  update(): void{
    const {valid, value} = this.form;

    if(valid){
      const selectedRestaurante: Restaurante = {
        id: this.selectedRestaurante.id,
        img: this.selectedRestaurante.img,
        name: value.name,
        type: value.type,
        endereco: value.endereco,
        horario: value.horario,
        comoChegar: value.comoChegar
      }

      this.restauranteService.updateRestaurante(selectedRestaurante).subscribe(
        () => this.goBack());
    } else {
      this.showErrorMsg();
    }
  }

  //CREATE
  create(): void{
    const {valid, value} = this.form;

    if(valid){
      const selectedRestaurante: Restaurante = {
        img: '',
        name: value.name,
        type: value.type,
        endereco: value.endereco,
        horario: value.horario,
        comoChegar: value.comoChegar
      } as Restaurante

      this.restauranteService.createRestaurante(selectedRestaurante).subscribe(
        () => this.goBack());
    } else {
      this.showErrorMsg();
    }
  }




  /*

  onFileSelected(event: any){
    const file: File = event.target.files[0];

    if(file){
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedRestaurante.patchValue({
          imagem: e.target.result
        });
      };

      reader.readAsDataURL(file);
    }
  }
  */

  private showErrorMsg(): void{
    this.snackBar.open('Pleas check the errors found.', 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['snackbar-error'] // Adicione uma classe CSS personalizada
    })
  }
}
