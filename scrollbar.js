
// When the user scrolls the page, execute myFunction
var drawn = false;
var created = false;
window.onscroll = function() {myFunction()};
var scrolled = 0;
var text ;
function myFunction() {
  var scrolledht = document.body.scrollTop || document.documentElement.scrollTop;
        var totalht = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrolled = (scrolledht / totalht) * 100;
        scrolled  =  Math.trunc(scrolled);
       console.log(scrolled);
     
       draw();
}



function draw() {
  
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (!drawn) {
        if (height > 0) {
            if (!created) {
                var progressContainer = document.createElement("div");
                progressContainer.id = "exentsion-progress-container";
                
                progressContainer.style.zIndex = 9999;
                progressContainer.style.position = "fixed";
                progressContainer.style.top = 0;
                progressContainer.style.right = 0;
                progressContainer.style.visibility = 'visible';

                
                var paragraph = document.createElement("p");
                text = document.createTextNode(scrolled + "%");
              text.id = "text";
                
                paragraph.appendChild(text);

                progressContainer.appendChild(paragraph);

                document.body.prepend(progressContainer);
                created = true;
                drawn = true;
            }
            else {
              
                var progressContainer = document.getElementById('exentsion-progress-container');
                progressContainer.style.visibility = 'visible';
                drawn = true;
            }
        }
    }
    else {
        if (created) {
         
           
                var progressContainer = document.getElementById('exentsion-progress-container');
                document.querySelector('p').firstChild.data = scrolled + "%";
                //progressContainer.style.visibility = 'hidden';
                drawn = false;
            
        }
    }
}

draw();
window.addEventListener('resize', draw);
