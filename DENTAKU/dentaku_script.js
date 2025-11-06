 
      //window表示用の配列
      let window_Array=new Array(0);
      let i = 0;
      let message = "";
      

    function changeWindow(messages) {
        
      document.getElementById("num_window_num").textContent = messages;
    }

    function numIn(num){
      if(i === 0 && (num === '+' || num === '=')) {return};
    
      if (window_Array.includes('+') && num === '+') {return};
    
      if(num !== '='){
        window_Array[i] = num;
        message = window_Array.join("");
        i++;
      } else if(num == '=')
      {
          Calculation();
      }
        
      changeWindow(message);
    
    
  }


    function Calculation(){
      //items = [左辺右辺,[桁数,item]] 
      var right =[];
      var left = [];
      var answer = [0]; 
      var puls = false;
      var r = 0;
      var l =0;
      

      for(u=0;u < window_Array.length;u++){
        if(window_Array[u] == '+'){
          puls = true;
          
         
        }else if(puls==false) {
         right[r] = window_Array[u];
         console.log(right[r]);
          r++;
        }else if(puls==true){
          left[l] = window_Array[u];
          console.log(left[l]);
          l++;
        }
        
      }
      right.reverse();
      left.reverse();
      
      console.log("Right=="+right+";Left=="+left);
      //gを桁数とする
        for(g=0;g<Math.max(right.length,left.length);g++){
          console.log("g="+g);
          
        answer[g] = (answer[g] || 0) + Number(right[g] || 0) + Number(left[g] || 0);
        
        if(answer[g]>=2){
          answer[g+1] =1;
          answer[g]=answer[g]%2;
          }  

          console.log("in_g[" + g + "]_at_the →→" + answer.join());
        }
       
        message = answer.reverse().join("");
        console.log(message);
        changeWindow(message);


        
      
      }
    
      function Reset(){
        console.log("Reset");
       window_Array=new Array(0);
       i = 0;
       message = "";
       changeWindow("____");
      }