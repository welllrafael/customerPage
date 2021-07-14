import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  customerLogged: Customer | undefined;


  ngOnInit(): void {
  }

  constructor(private loginService: LoginService,
    private router: Router)
  {

  }

  loginCustomer()
  {
    this.loginService.login('96363886104','24/06/1985')
      .subscribe(customer => {
        this.customerLogged = customer
        console.log(this.customerLogged)
        if (this.customerLogged !== undefined)
        {
          console.log("navegou")
          this.router.navigate(['invoice']);
        }
      })
  }

}
