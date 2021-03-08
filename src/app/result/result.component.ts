import { Component, OnInit } from '@angular/core';
// import { fromEvent } from 'rxjs';
// import { switchMap, takeUntil, pairwise } from 'rxjs/operators'


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  template: '<canvas #myCanvas></canvas>',
  styles: ['canvas { border: 1px solid #000; }']
})
export class ResultComponent implements OnInit {
   
  constructor() { 
  }
  ngOnInit(): void {
    const canvas = document.getElementById("myCanvas") as HTMLFormElement;
    const ctx = canvas.getContext('2d');
    ctx.font = "15pt Courier New";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#06067e";
  }
  ngAfterViewInit(){
    const canvas = document.getElementById("myCanvas") as HTMLFormElement;
    const ctx = canvas.getContext('2d');
    var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
    var x = "black",
    y = 2;
    canvas.onmousemove=function (e) {
      findxy('move', e)
    }
    canvas.onmousedown= function (e) {
        findxy('down', e)
    }
    canvas.onmouseup = function (e) {
        findxy('up', e)
    }
    canvas.onmouseout= function (e) {
        findxy('out', e)
    }
    
    function findxy(res:string, e:any) {
      if (res == 'down') {
          console.log(e);
          prevX = currX;
          prevY = currY;
          currX = e.offsetX;
          currY = e.offsetY;
  
          flag = true;
          dot_flag = true;
          if (dot_flag) {
              ctx.beginPath();
              ctx.fillStyle = x;
              ctx.fillRect(currX, currY, 2, 2);
              ctx.closePath();
              dot_flag = false;
          }
      }
      if (res == 'up' || res == "out") {
          flag = false;
      }
      if (res == 'move') {
          if (flag) {
              prevX = currX;
              prevY = currY;
              currX = e.offsetX;
              currY = e.offsetY;
              draw();
          }
      }
    }

    const clear = document.getElementById("clear") as HTMLFormElement;
    clear.onclick = function erase() {​​​​​​​
      var m = confirm("Want to clear");
      if (m) {​​​​​​​
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = "15pt Courier New";
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#06067e";
      }​​​​​​​
    }

    const save1 = document.getElementById("save") as HTMLFormElement;
    save1.onclick = function save(){
      var dataURL = canvas.toDataURL('image/png');
        canvas.src = dataURL;
    }

    function draw() {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = x;
      ctx.lineWidth = y;
      ctx.stroke();
      ctx.closePath();
    }
  }
}


