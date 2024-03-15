import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  userForm?: FormGroup;
  errors: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      id: 0,
      type: 0,
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      cell: [
        '',
        [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(11)]
      ],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.userForm.valueChanges.subscribe(() => {
      this.updateErrors();
    });
  }

  checkEmailExists(): void {
    const emailControl = this.userForm?.get('email');

    if (emailControl?.value) {
      this.userService.checkEmailExists(emailControl.value).subscribe(
        (emailExists) => {
          if (emailExists) {
            emailControl.setErrors({ emailExists: true });
          }
        },
        (error) => {
          console.error('Erro ao verificar e-mail:', error);
        }
      );
    }
  }

  checkCellExists(): void {
    const cellControl = this.userForm?.get('cell');

    if (cellControl?.value) {
      this.userService.checkCellExists(cellControl.value).subscribe(
        (cellExists) => {
          if (cellExists) {
            cellControl.setErrors({ cellExists: true });
          }
        },
        (error) => {
          console.error('Erro ao verificar celular:', error);
        }
      );
    }
  }

  register(): void {
    this.resetErrors();

    if (this.userForm && this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.userService) {
        this.userService.checkEmailExists(userData.email).subscribe(
          (emailExists) => {
            if (emailExists) {
              this.errors['email'] = 'E-mail já cadastrado.';
            } else {
              if (this.userService) {
                this.userService.checkCellExists(userData.cell).subscribe(
                  (cellExists) => {
                    if (cellExists) {
                      this.errors['cell'] = 'Celular já cadastrado.';
                    } else {
                      if (this.userService) {
                        this.userService.register(userData).subscribe(
                          () => {
                            console.log('Usuário registrado com sucesso!');
                            this.router.navigate(['/login']);
                          },
                          (error) => {
                            console.error('Erro ao registrar usuário:', error);
                          }
                        );
                      }
                    }
                  },
                  (error) => {
                    console.error('Erro ao verificar celular:', error);
                  }
                );
              }
            }
          },
          (error) => {
            console.error('Erro ao verificar e-mail:', error);
          }
        );
      }
    } else {
      console.error('Corrija os erros antes de registrar.');
    }
  }

  private resetErrors(): void {
    this.errors = {
      name: '',
      email: '',
      cell: '',
      password: ''
    };
  }

  private updateErrors(): void {
    this.errors = {};

    const nameControl = this.userForm?.get('name');
    if (nameControl && nameControl.dirty && nameControl.invalid) {
      if (nameControl.hasError('required')) {
        this.errors['name'] = 'Nome é obrigatório.';
      } else if (nameControl.hasError('minlength')) {
        this.errors['name'] = 'Nome deve ter pelo menos 3 caracteres.';
      } else if (nameControl.hasError('pattern')) {
        this.errors['name'] = 'Nome deve conter apenas letras.';
      }
    }

    const emailControl = this.userForm?.get('email');
    if (emailControl && emailControl.dirty && emailControl.invalid) {
      if (emailControl.hasError('required')) {
        this.errors['email'] = 'E-mail é obrigatório.';
      } else if (emailControl.hasError('email')) {
        this.errors['email'] = 'E-mail inválido.';
      } else if (emailControl.hasError('emailExists')) {
        this.errors['email'] = 'E-mail já cadastrado.';
      }
    }

    const cellControl = this.userForm?.get('cell');
    if (cellControl && cellControl.dirty && cellControl.invalid) {
      if (cellControl.hasError('pattern')) {
        this.errors['cell'] = 'Formato de celular inválido.';
      } else if (cellControl.hasError('cellExists')) {
        this.errors['cell'] = 'Número de celular já cadastrado.';
      }
    }

    const passwordControl = this.userForm?.get('password');
    if (passwordControl && passwordControl.dirty && passwordControl.invalid) {
      if (passwordControl.hasError('required')) {
        this.errors['password'] = 'Senha é obrigatória.';
      } else if (passwordControl.hasError('minlength')) {
        this.errors['password'] = 'Senha deve ter pelo menos 5 caracteres.';
      }
    }
  }

  private emailAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return this.userService.checkEmailExists(email).pipe(
        map(emailExists => (emailExists ? { emailExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  private cellAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const cell = control.value;
      return this.userService.checkCellExists(cell).pipe(
        map(cellExists => (cellExists ? { cellExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
