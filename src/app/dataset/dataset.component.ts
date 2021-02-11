import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { clear } from 'console';
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
    {id:6,data:'Spoon'}
  ];

  colors = [
    {id:'green',color:'green'},
    {id:'blue',color:'blue'},
    {id:'red',color:'red'},
    {id:'yellow',color:'yellow'},
    {id:'orange',color:'orange'},
    {id:'black',color:'black'},
  ]
  constructor(public http : HttpClient) {
    
  }

  labelselect(data:any){
    classname=data;
  }  

  postreq(){
    // var className=document.getElementById("select") as HTMLFontElement;
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
      environment.SERVER_URL + '/upload_canvas',
      {filename,image,className:classname},
      {responseType:'text'}
    //"linkwheretobeuploaded",{
    //   "image":dataURL,
    //   "data":className.innerText
    // }
    ).subscribe((val)=>{console.log("Post call successfull",val);},
    response=>{console.log("Post call error",response);},
    ()=>{console.log("The post observable completed");}
    );
    // console.log(classname.innerHTML);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "15pt Courier New";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#06067e";

  }

  ngOnInit(): void {
    const canvas = document.getElementById("myCanvas") as HTMLFormElement;
    const ctx = canvas.getContext('2d');
    ctx.font = "15pt Courier New";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#06067e";
    // ctx.fillText("Draw Inside this Canvas!",40,40);
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
          // ctx.fillText("Draw Inside this Canvas!",40,40);
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
    function color(obj:any):void {
      switch (obj.id) {
          case "green":
              x = "green";
              break;
          case "blue":
              x = "blue";
              break;
          case "red":
              x = "red";
              break;
          case "yellow":
              x = "yellow";
              break;
          case "orange":
              x = "orange";
              break;
          case "black":
              x = "black";
              break;
          case "white":
              x = "white";
              break;
      }
      if (x == "white") y = 14;
      else y = 2;
    }
  }
}

