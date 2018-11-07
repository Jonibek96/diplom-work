import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AuthService} from './services/auth.service';
import {DataService} from './services/data.service';
import {Table1Component} from './table1/table1.component';
import {FormSodirotComponent} from './form-sodirot/form-sodirot.component';
import {FormHisobComponent} from './form-hisob/form-hisob.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {element} from "protractor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [
    Table1Component,
    FormSodirotComponent,
    FormHisobComponent,
    WelcomeComponent
  ]
})
export class AppComponent implements OnDestroy {

  table1Component = Table1Component;
  formsodirotComponent = FormSodirotComponent;
  formhisob = FormHisobComponent;
  welcomeComponent = WelcomeComponent;
  component = '';

  @ViewChild('content', {read: ViewContainerRef})
  parent: ViewContainerRef;
  type: Type<Table1Component>;
  cmpRef: ComponentRef<Table1Component>;
  panelOpenState = false;

  constructor(private auth: AuthService,
              private dataService: DataService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    // const href = window.location.href;
    // if (href.indexOf('hash') !== -1) {
    //   const hash = href.split('hash=')[1];
    //   const data = atob(hash).split('$');
    //
    //   console.log(href);
    //
    //   const user: UserInfo = {
    //     userId: +data[0],
    //     type: data[1],
    //     time: data[2]
    //   };
    //
    //   this.auth.checkUserSession(user).subscribe(response => {
    //     if (!response) {
    //       window.location.replace('./error.html');
    //     }
    //     else{
    //       this.createComponentDynamically1(this.welcomeComponent, 0)
    //     }
    //   });
    // } else {
    //   window.location.replace('./error.html');
    // }

    this.auth.getToken('jonibek', 'jonibek96').subscribe(result => {
      if (result) {
        this.createComponentDynamically1(this.welcomeComponent, 0);
      } else {
        console.log('Username or password is incorrect');
      }
    });
  }

  ngOnDestroy() {
    this.auth.logout();
  }

  createComponentDynamically(cmp, type) {

    this.component = '';
    switch (type) {
      case 1:
        this.component = 'Фармонҳои Ректор';
        break;
      case 2:
        this.component = 'Паёмҳои президенти Ҷумҳури Тоҷикистон';
        break;
      case 3:
        this.component = 'Қарорҳои ҳукумати Ҷумҳури Тоҷикистон';
        break;
      case 4:
        this.component = 'Қароорҳои Ректор';
        break;
      case 5:
        this.component = 'Қароорҳои шӯрои олмон';
        break;
      case 6:
        this.component = 'Қароорҳо ва қонунҳои Маҷлиси Олии  ҶТ';
        break;
      case 7:
        this.component = 'Қароорҳо ва фармоишҳои ВМ ва ИҶТ';
        break;
      case 8:
        this.component = 'Мактубҳои воридоти аз Ҳукумати ҶТ';
        break;
      case 9:
        this.component = 'Мактубҳои воридоти аз Вазорати Маориф ва Илми Ҷумҳурии Тоҷикистон';
        break;
      case 10:
        this.component = 'Мактубҳои воридоти аз ДИП ҳукумати Ҷумҳурии Тоҷикистон';
        break;
      case 11:
        this.component = 'Аризаҳои донишҷуён оиди интиқол ва барқарор';
        break;
      case 12:
        this.component = 'Аризаҳои донишҷуён';
        break;
      case 13:
        this.component = 'Аризаҳои устодон ва кормандон(қабул, озод)';
        break;
      case 14:
        this.component = 'Аризаҳои аппелятсионӣ';
        break;
      case 15:
        this.component = 'Аризаҳои шикоятӣ';
        break;
      case 16:
        this.component = 'Гузоришҳо нисбатӣ донишҷуён';
        break;
      case 17:
        this.component = 'Гузориш, пешниҳод ва дархостӣ кормандон';
        break;
      case 18:
        this.component = 'Ҳисоботҳо';
        break;
      case 19:
        this.component = 'Ҳуҷҷатҳои воридоти(умуми)';
        break;
      case 20:
        this.component = 'Санадҳо';
        break;
      case 21:
        this.component = 'Қабули лифофаҳо аз почта';
        break;
      case 22:
        this.component = 'Муроҷиати шифоҳи';
        break;
      case 23:
        this.component = 'Муроҷиат таввасути алоқаи телфонӣ';
        break;
      case 24:
        this.component = 'Низомномаҳо';
        break;
      case 25:
        this.component = 'Дастури вазифавии кормандон';
        break;
      case 26:
        this.component = 'Нақшаҳои кории кормандон';
        break;
      case 27:
        this.component = 'Нақшаҳои кории шуъба';
        break;
      case 28:
        this.component = 'Сарҷаласаҳои маҷлисҳои шуъба';
        break;
      case 29:
        this.component = 'Ахбор';
        break;
      case 30:
        this.component = 'Пешниҳодҳо ва дархостҳо';
        break;
      case 31:
        this.component = 'Шартномаҳо';
        break;
      case 32:
        this.component = 'Ҳуҷҷатҳои тафтишотӣ';
        break;
      case 33:
        this.component = 'Ҳуҷҷатҳои бойгонишуда';
        break;
      case 34:
        this.component = 'Феҳраст';
        break;
      case 35:
      default:
        break;
    }

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    this.type = cmp;

    const childComponent = this.componentFactoryResolver.resolveComponentFactory(this.type);
    const CmpRef = this.parent.createComponent(childComponent);
    CmpRef.instance.type = type;
    this.cmpRef = CmpRef;
  }

  createComponentDynamically1(cmp, type) {
    this.component = '';
    switch (type) {
      case 1:
        this.component = 'Мактубҳои содироти ба Ҳукумати Ҷумҳури Тоҷикистон';
        break;
      case 2:
        this.component = 'Мактубҳои содироти ба Вазорати Маориф ва Илми Ҷумҳурии Тоҷикистон';
        break;
      case 3:
        this.component = 'Мактубҳои содироти ба ДИП ҳукумати Ҷумҳурии Тоҷикистон';
        break;
      case 4:
        this.component = 'Ҳуҷҷатҳои содироти(умуми)';
        break;
      case 5:
      default:
        break;
    }


    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    this.type = cmp;

    const childComponent = this.componentFactoryResolver.resolveComponentFactory(this.type);
    const CmpRef = this.parent.createComponent(childComponent);
    CmpRef.instance.type = type;
    this.cmpRef = CmpRef;
  }

  // myfinc(){
  //   var btns = document.getElementsByClassName("card");
  //   for (var i = 0; i < btns.length; i++) {
  //     btns[i].removeEventListener("click", function() {
  //       var current = document.getElementsByClassName("active");
  //       current[0].className = current[0].className.replace(" active", "");
  //       this.className += " active";
  //     });
  //   }
  // }
  //  openCity(evt) {
  //   var i, tablinks;
  //   tablinks = document.getElementsByClassName("card");
  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].className = tablinks[i].className.replace(" active", "");
  //   }
  //
  //   evt.currentTarget.className += " active";
  // }

  myFunction() {
    var input, filter, ul, li, a, i, ll;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("LeftMenu");
    li = ul.getElementsByTagName("mat-card");
    ll = ul.getElementsByTagName("mat-accordion");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
    for (i = 0; i < ll.length; i++){
      a = ll[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        ll[i].style.display = "";
      } else {
        ll[i].style.display = "none";
      }
    }
  }

}
