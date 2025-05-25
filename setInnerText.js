function setInnerText(innerText) {
	const textbox = Array.from(document.getElementsByClassName('hon-ue-content')).pop().children[0];
    
	textbox.innerText = new XMLSerializer().serializeToString(document.createTextNode(innerText));
}
