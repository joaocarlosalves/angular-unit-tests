import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xp-bar',
  template: ''
})
export class XpBarComponent implements OnInit {
  xp: number = 0;
  xpBar: string = '0%';

  ngOnInit(): void {
    setInterval(() => {
      this.xp += 3;
      if(this.xp >= 100) this.xp = 100;
      this.xpBar = this.xp+'%';
    }, 3000);
  }
}
