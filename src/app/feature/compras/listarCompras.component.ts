import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { RestService } from 'src/app/services/rest.service';
import { Compra } from 'src/app/shared/interfaces/compra';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'listarCompras',
  templateUrl: './listarCompras.component.html',
  styleUrls: ['./listarCompras.component.scss']
})
export class ListarComprasComponent implements OnInit {

  public editing: boolean = false;
  public orden: Compra[]=[];
  public page: number = 1;
  public pageSize: number = 4;
  public collectionSize: number = this.orden.length;
  private cedula:string= null;
  public myForm: FormGroup;

  constructor(private service: RestService, private router: Router,private route: ActivatedRoute) { }


  ngOnInit() {
    this.cedula = this.route.snapshot.queryParams["cedula"];
    this.myForm = new FormGroup({
      cedula: new FormControl("cedula", [Validators.required]),
    });

    this.myForm.controls["cedula"].setValue("");
  }

  getCompras(){
    let controls = this.myForm.controls;
    if (this.myForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const datosOrden = {
      cedula: controls["cedula"].value,
    };
    let url = `http://localhost:8080/comprarMedicamento/`+datosOrden.cedula;
    this.service.queryExternalApi(url).subscribe(
      response => {
        let result = response.json();
        if (result) {
          this.orden = result;
        } else {
          console.log('error');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
