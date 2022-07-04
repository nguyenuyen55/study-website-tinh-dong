import { Component,  EventEmitter,  Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() { }
  @Input() item = {
    title: '',
    message: '',
    type: '',
    duration: 0,
  };   
  ngOnInit(): void {    
  } 
  toast({ title = '', message = '', duration = 0, type = '' }) {
    const main = document.getElementById('cus-toast');
    const icons = {
      success: '<i class="bi bi-check-circle-fill"></i>',
      info: 'fas fa-info-circle',
      warning: 'fas fa-exclamation-circle',
      error: 'fas fa-exclamation-circle',
    }
    if (main) {
      const toast = document.createElement('div');
      //Set time auto remove toast 
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000)

      toast.onclick = function (e) {
        const c =  e.target as Element ;
        if (c.closest('.cus-toast__close')) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      }


      toast.classList.add('cus-toast', `cus-toast--${type}`);
      const delay = (duration / 1000).toFixed(2);

      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`
      toast.innerHTML = `
            <div class="cus-toast__icon">
                <i class="{icons[type]}"></i>
            </div> 
            <div class="cus-toast__body">
                <h3 class="cus-toast__title">{title}</h3>
                <p class="cus-toast__msg">{message}</p>
            </div>
            <div class="cus-toast__close">
                <i class="fas fa-times"></i>
            </div>`;
      main.appendChild(toast) 

    }
  } 
  showSuccessToast(e:any) { 
    this.toast({
      title: 'Thanh cong !!!',
      message: 'Ready to pour… the Font Awesome 6 Beta!',
      type: 'success',
      duration: 3000,
    });
  } 
  showErrorToast() {
    this.toast({
      title: 'That bai!!!',
      message: 'Ready to pour… the Font Awesome 6 Beta!',
      type: 'error',
      duration: 3000,
    });
  }
}
