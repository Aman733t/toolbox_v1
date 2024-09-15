import { AfterViewInit, Component, OnInit, ViewChild, HostListener} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PackagesModule } from '../../libs/packages/packages.module';
import { ApiService } from '../../services/api.service';
import * as nunjucks from 'nunjucks'

@Component({
  selector: 'app-nunjucks',
  standalone: true,
  imports: [PackagesModule],
  providers: [ApiService],
  templateUrl: './nunjucks.component.html',
  styleUrl: './nunjucks.component.scss'
})

export class NunjucksComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  public queryParams: any;
  public jsonValue: any;
  public nunjucksCode: any;
  public result: any
  public extractJson:any;
  public jsonArr:any = [];
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'r' && event.shiftKey) {
      this.validateNunjucks();
    }
  }

  validateNunjucks() {
    if(this.jsonArr.length > 0 && this.nunjucksCode){
      this.getSingleJson((json:any)=>{
        let nun = nunjucks.configure({autoescape:false});
        let output:any = '';
        try{
          output = nun.renderString(this.nunjucksCode,json);
        }catch(err){
          console.log(err);
          output = err;
        }
        this.result = output;
      })
    } else {
      if(this.jsonArr.length == 0 && !this.nunjucksCode){
        this._snackBar.open('Value Pair Missing And Nunjucks Code Missing','OK');
      } else if (!this.nunjucksCode){
        this._snackBar.open('Nunjucks Code Missing..','OK')
      } else if(this.jsonArr.length == 0){
        this._snackBar.open('Value Pair Missing..','OK')
      }
    }
  }

  validateUsingApi(){
    this.getSingleJson((json:any)=>{
      this.api.nunjucksValidator(json, this.nunjucksCode).subscribe((response: any) => {
        if (response['code'] == 1) {
          this.result = response['response'];
        } else {
          this._snackBar.open('Nunjucks Code Invalid', 'OK');
          this.result = JSON.stringify(response['response']);
        }
      })
    })
  }

  getSingleJson(callback:any){
    let singleObj:any = {};
    for(let i=0;i<this.jsonArr.length;i++){
      singleObj[this.jsonArr[i]['key'].toString()] = this.jsonArr[i]['value'].toString();
    }
    callback(singleObj)
  }

  addNewKeyValue(){
    this.jsonArr.unshift({
      "key":"",
      "value":""
    });
  }

  deleteJsonEntry(index:any){
    this.jsonArr.splice(index, 1);
  }

  jsonExtract(){
    if(this.jsonValue){
      try{
        let json:any;
        if(typeof this.jsonValue == 'string'){
          json = JSON.parse(this.jsonValue);
        } else {
          json = this.jsonValue;
        }
        let extractedArray:any = [];
        for(let key in json){
          let singleObj:any = {};
          singleObj['key'] = key;
          singleObj['value'] = json[key];
          extractedArray.push(singleObj);
        }
        this.jsonArr = [...extractedArray];
        this.drawer.toggle();
      }catch(err){
        this._snackBar.open('invalid JSON..','OK');
      }
    } else {
      this._snackBar.open('Add JSON value for nunjucks to render','OK');
    }
  }

}
