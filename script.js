//get reference to both the divs
const source = document.getElementById("source");
const target = document.getElementById("target");

// add event listeners on them
source.addEventListener("dragstart", dragStart);
target.addEventListener("dragover", dragOver);
target.addEventListener("drop", drop);

// function to handle drag start
function dragStart(event) {

    // differentiate among all different types of elements.
  if (event.target.tagName === "IMG") {
    //   set its src and element type as two properties in data transfer api.
    event.dataTransfer.setData("text/plain", event.target.src);
    event.dataTransfer.setData("data-type", "image");
  } else if (event.target.tagName === "P") {
    event.dataTransfer.setData("text/plain", event.target.innerHTML);
    event.dataTransfer.setData("data-type", "p");
  } else if (event.target.tagName === "I") {
    const className = event.target.className;
    event.dataTransfer.setData("text/plain", className);
    event.dataTransfer.setData("data-type", "i");
  }

//   if we delete it instantly, there will be no reference to look upon while creating element in target.
  setTimeout(() => {
    source.removeChild(event.target);
  }, 1000);
}

function dragOver(event) {
  // prevent the default behaviour of not allowing to drop
  event.preventDefault();
}

function drop(event) {
  // prevent the default behaviour which is to open the dropped content.
  event.preventDefault();

//   fetch back the data we had set.
  const textValue = event.dataTransfer.getData("text/plain");

  const dataType = event.dataTransfer.getData("data-type");

  // create a new element based on the details
  let element;
  if (dataType === "image") {
    element = document.createElement("img");
    element.src = textValue;
  } else if (dataType === "p") {
    element = document.createElement("p");
    element.innerHTML = textValue;
  } else if (dataType === "i") {
    element = document.createElement("i");
    element.className = textValue;
  }

  //append it to target div.
  target.appendChild(element);
}

//function to handle reset operation
function handleClick(){
    //we get all the nodes of target, traverse through them, make them draggable again and push to source.
    const childNodes = target.childNodes;
    for (let index = 0; index < childNodes.length; index++) {
        const element = childNodes[index].cloneNode(true);
        element.draggable = true;
        source.appendChild(element);
    }

    //clear the target div.
    target.innerHTML = '';    
}