import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RestService } from 'src/app/services/rest.service';
import swal from "sweetalert2";



@Component({
    selector: 'agregarMedicamento',
    templateUrl: './agregarMedicamento.component.html',
    styleUrls: ['./agregarMedicamento.component.scss']
  })
  export class AgregarMedicamentoComponent implements OnInit {
  
    private nombreMedicamento:string = null;
    private codigoMedicamento:string = null;
    public myForm: FormGroup;
    constructor(
      private router: Router,
      private service: RestService,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit() {
  
      this.nombreMedicamento = this.route.snapshot.queryParams["nombreMedicamento"];
      this.codigoMedicamento = this.route.snapshot.queryParams["codigoMedicamento"];
  
      this.myForm = new FormGroup({
       
        nombre: new FormControl("nombreMedicamento", [Validators.required]),
        valor: new FormControl("codigoMedicamento", [Validators.required])
        
      });
    }

    store(){
        let controls = this.myForm.controls;
        if (this.myForm.invalid) {
          Object.keys(controls).forEach(controlName =>
            controls[controlName].markAsTouched()
          );
          return;
        }
    }

    const datosMedicamento = {
      
        nombreMedicamento: controls["nombreMedicamento"].value,
        codigoMedicamento: controls["codigoMedicame"].value,
        
      };
      let url = `http://localhost:8080/medicamento`;

      let data = {
        "nombreMedicamento": datosMedicamento.nombreMedicamento,
        "codigoMedicametno": datosMedicamento.codigoMedicamento,
      }

      let body = JSON.stringify(data);
    this.service.queryPost(url, body).subscribe(data => {
      let result = data;
      if (result) {
        swal({
          title: this.translate.instant("alerts.success"),
          text: this.translate.instant("alerts.stored_urgencia"),
          type: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.translate.instant("buttons.ok"),
        }).then(result => {

          this.router.navigate(["/movie-store"]);
        });
      } else {
        swal({
          title: this.translate.instant("alerts.error"),
          text: this.translate.instant("alerts.cannot_delete_urgencia"),
          type: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.translate.instant("buttons.ok"),
        }).then(result => {
          return false;
        });
      }
    }
    )