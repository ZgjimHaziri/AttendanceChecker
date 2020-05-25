  function btnClick(param1,arg) 
  { var i,j,k;
    var param=param1+1;
        
         var x = document.getElementById("mytable").getElementsByTagName("td");  
       x[param1].style.backgroundColor ="#B0D182";

      if(param%5==0)
        {i=param/arg;}
      else
      {
        i=param%5;
      }
  
       var a= document.querySelector("table tr:nth-child(" + arg + ") td:nth-child(" + i + ")>a ");
       a.setAttribute("href","index.html");
    } 


  function updateBackground() 
  {  var week=[1,2,3,4,5];
    var hour=[8,10,15,12,16,14,11];
    var minute=[55,30,15,0,15];
      var  hr = (new Date()).getHours();
      var d = (new Date()).getDay();
      var  n = (new Date()).getMinutes();  

      var i,j,k,x,s;
      x=true;
      s=0;
      for(i=0; i<week.length; i++)
    {
      for(j=0; j<hour.length; j++)
        {
          for(k=0; k<minute.length; k++)
            { 

            if (d==week[i] && hr == hour[j] && n==minute[k]) 
                {
                  switch(d) {
                 case 1:
                 switch(hr)
                { case 8: btnClick(1,1); break;
                 case 10: btnClick(2,1); break;
                 case 15: btnClick(3,1); break; 
                 }                        
                    break;

                 case 2:
                 switch(hr)
                 {
                 case 8: btnClick(6,2); break;
                 case 10: btnClick(7,2); break;
                 case 12: btnClick(8,2); break;
                  case 16: btnClick(9,2); break;
                }
                     break;
                     case 3:
                      switch(hr)
                      {
                 case 8: btnClick(11,3); break;
                 case 10: btnClick(12,3); break;
                 case 14: btnClick(13,3); break; 
                }
                  
                     break;
                     case 4:
                     switch(hr)
                     {
                 case 14: btnClick(16,4); break;
                }
                     break;
                     case 5:
                     switch(hr){
                 case 12: btnClick(21,5); break;
                }
                 
                     break;
                    default:
                    
                  }
                  
              }

              minute[k]=n;
              

    }
    hour[j]=hr;
  }
}
  }

   
window.addEventListener("load",function() { updateBackground()});