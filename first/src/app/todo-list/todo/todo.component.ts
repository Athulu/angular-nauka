import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

// implements OnChanges
// implements OnInit
// implements OnChange, DoCheck
// implements OnInit, OnDestroy
export class TodoComponent  {
  @Input() todo!: Todo;
  @Input() id!: number;
  @Input() i!: number; 
  @Output() delete = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  // @ViewChild('li') li!: ElementRef;
  openModal = false;
  timeout!: number;
  keyValueTest: {[key:string]: string | number} = { name: 'test', age: 12};

  constructor(private router: Router, private route: ActivatedRoute){}

  // ngOnInit(): void {
  //   this.timeout = setTimeout(() => {
  //     console.log('setTimeout')
  //   }, 3000)
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes)
  // }

  // ngDoCheck(): void {
  //   console.log('ngDoCheck został wykonany!')
  // }

  // ngAfterViewInit(): void {
  //   console.log(this.li)
  // }

  // ngOnDestroy(): void {
  //   console.log('test')
  //   clearTimeout(this.timeout);
  // }

  changeTodoStatus() {
    this.changeStatus.emit(this.id);
  }

  toggleModal(): void {
    this.openModal = !this.openModal;
  }
  
  deleteTodo() {
    this.delete.emit();
  }

  navigateToDetails(){
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      // state: { example: 'test' }
      // queryParams: {id: this.i, test: 'wartosc'}
    }
    this.router.navigate([this.id], navigationExtras)
  }
}
