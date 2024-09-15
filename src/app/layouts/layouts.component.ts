import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PackagesModule } from '../libs/packages/packages.module';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [PackagesModule],
  providers: [ApiService],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  public queryParams: any;
  public username: any;
  public version: any = '1.0.0'
  public isExpanded: boolean = false;
  public itemList = [{
    icon: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard'
  }, {
    icon: 'data_object',
    name: 'Nunjucks',
    path: '/nunjucks'
  }];
  public isSetting: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  home() {
    sessionStorage.clear();
    this.router.navigate(['/dashboard']);
  }

}
