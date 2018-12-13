var over_module = (function(){
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
       add, button
	   }
}());
over_module.add();
over_module.button();