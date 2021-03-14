import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// var dataid:int
var classname:string | null;
@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})

export class DatasetComponent implements OnInit,AfterViewInit {
  links = [
    {id:1,data:'Sun'},
    {id:2,data:'Flower'},
    {id:3,data:'Pencil'},
    {id:4,data:'Umbrella'},
    {id:5,data:'House'},
    {id:6,data:'Spoon'},
    {id:7,data:'Tree'},
    {id:8,data:'Bird'},
    {id:9,data:'Hand'},
    {id:10,data:'Mug'}
  ];

  
  constructor(public http : HttpClient) {
    
  }

  labelselect(data:any,id:any){
    classname=data;
    // var dataid=id;
    // dataid.style.backgroundcolor='orange';
  }  

  postreq(){
    if(classname===null){
      console.log("NOT UPDATED");
      return;
    }
    const canvas = document.getElementById("myCanvas") as HTMLFormElement;
    const ctx = canvas.getContext('2d');
    var image = canvas.toDataURL('image/png');
    var date= Date.now();
    var filename=classname + "_" + date + ".png";
    this.http.post(
      environment.SERVER_URL + '/api/upload_canvas',
      {filename,image,className:classname},
      {responseType:'text'}
    ).subscribe((val)=>{console.log("Post call successfull",val);},
    response=>{console.log("Post call error",response);},
    ()=>{console.log("The post observable completed");}
    );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    classname=null;

  }

  ngOnInit(): void {
    
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
    y = 3;
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
      }​​​​​​​
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

