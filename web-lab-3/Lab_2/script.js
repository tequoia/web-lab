var over_module = (function(){
	function hintsForLinks()
						{
						   if (window.XMLHttpRequest)
						   {
						      var links = document.querySelectorAll("#word");
						      console.log(links);
						      
						      for(i = 0; i < links.length; i++)
						      {
						         links[i].onmouseover = function()
						         {
						            getXMLDoc("hints.txt");
						            curHintId = this.id;
						         }
						         links[i].onmouseout = function()
						         {
						            links.style.left = "-1000px";
						            links.innerHTML = "";
						         }
						         links[i].onmousemove = function(e)
						         {
						            if (mouse.x(e) && links.innerHTML != "")
						            {
						               var dx = (document.body.clientWidth - mouse.x(e) + document.body.scrollLeft < links.offsetWidth) ? links.offsetWidth + 15 : 0;
						               var dy = (document.body.clientHeight - mouse.y(e) + document.body.scrollTop < links.offsetHeight) ? links.offsetHeight + 15 : 0;
						               var x = mouse.x(e) + 10 - dx;
						               var y = mouse.y(e) + 10 - dy;
						               links.style.left = (x - document.body.scrollLeft > 0) ? x : document.body.scrollLeft;
						               links.style.top = (y - document.body.scrollTop > 0) ? y : document.body.scrollTop;
						            }
						         }
						      }
						   }
						}

						function getXMLDoc(url)
						{
						   try
						   {
						      req = new XMLHttpRequest();
						      if (req)
						      {
						         req.onreadystatechange = function () 
						         {
						            if (req.readyState == 4)
						            {
						               if (req.status == 200)
						               {
						                  var links = document.querySelectorAll("#word");
						                  links.innerHTML = req.responseText;
						                  try
						                  {
						                     document.getElementById(curHintId).fireEvent("onmousemove");
						                  }
						                  catch(e)
						                  {
						                     links.style.left = mouse.x(e) + 10;
						                     links.style.top = mouse.y(e) + 10;
						                  }
						               }
						            }
						         }
						         req.open("GET", url, true);
						         req.send("");
						      }
						   }
						   catch(e) 
						   {
						      return;
						   }
						}

var hints = ["bio", "bio hint", "include", "include hint", "new-word", "new-hint"];
function search(word){
	for(var i = 0; i < hints.length; i += 2)
		if (word === hints[i]) return hints[i + 1];
	return "no hint";
}

function add(){
			var elems = document.querySelectorAll(".word");
			for (var i = 0; i < elems.length; i++){
				var div;
				elems[i].addEventListener("mouseover",
				(function(e){
					var ref = e.target;
					div = document.createElement('div');
					var rect = ref.getBoundingClientRect();
					div.className = 'hint';
					div.innerText = search(ref.innerText);
					div.style.left = rect.right + 'px';
					div.style.top = rect.top - 20 + 'px';
					document.body.appendChild(div);
				}));
				elems[i].addEventListener("mouseout", (function(){document.body.removeChild(div);}));
				elems[i].addEventListener("click",
				(function(e) {
					var text = prompt("Input text", "OK");
					hints.push(e.target.innerText);
					hints.push(text);
				}
				));
			}
		}
		
function button(){
	document.getElementById("btn").addEventListener("click",
	(function(){
		var word = prompt("Type word", "ok");
		var hint = prompt("Type hint", "ok");
		hints.push(word);
		hints.push(hint);
		console.log(word);
		document.body.innerHTML = document.body.innerHTML.replace(word, "<a class=\"word\">" + word + "</a>");
		add();
	}));
}
return {
       add, button, hintsForLinks
	}
}());
over_module.add();
over_module.button();
over_module.hintsForLinks();