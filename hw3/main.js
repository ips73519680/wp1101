let title = "todos"
let id = 0;
let list = {
    name: `${title}`,
    todo_list: [
    ],
};

let clickCompleted = 0;
let ulHtml = document.getElementById("todo-list");
let footerHtml = document.getElementById("todo-footer");
let testInput = document.getElementById("input");
let activebt = document.getElementById("activebt");
let allbt = document.getElementById("allbt");
let completedbt = document.getElementById("completedbt");
let clearbt = document.getElementById("clearbt");

class Row {
    constructor(data) {

        this.node = document.createElement("li");
        this.node.className = "todo-app__item";

        let divNode = document.createElement("div");
        let inputNode = document.createElement("input");
        let labelNode = document.createElement("label");
        let h1Node = document.createElement("h1");
        let imgNode = document.createElement("img");

        divNode.className = "todo-app__checkbox";
        inputNode.id = id;
        inputNode.type = "checkbox";
        labelNode.htmlFor = id;

        h1Node.className = "todo-app__item-detail";
        imgNode.className = "todo-app__item-x";
        imgNode.src = "img/x.png";
        divNode.appendChild(inputNode);
        divNode.appendChild(labelNode);
        h1Node.textContent = data;

        this.node.appendChild(divNode);
        this.node.appendChild(h1Node);
        this.node.appendChild(imgNode);

        labelNode.addEventListener("click", function () {
            if (h1Node.style.textDecoration === "line-through") {
                h1Node.style = "text-decoration:undefined; opacity:1;"
                clickCompleted++;

            } else {
                h1Node.style = "text-decoration: line-through; opacity: 0.5;"
                clickCompleted--;
            }
            footrender();
        })
        imgNode.addEventListener("click", function () {
            for (let i = 0; i < list.todo_list.length; i++) {
                if (list.todo_list[i] === data) {
                    list.todo_list.splice(i, 1);
                }
            }
            render();
            footrender();
        })

        id++;

    }
    get liNode() {
        return this.node;
    }
}

testInput.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        submit();
    }
}, false);

// < ul內部 >
let ulNode = document.getElementById("todo-app__list");
render();
footrender();


allbt.addEventListener("click", function () {
    let liNodes = document.getElementsByClassName("todo-app__item");

    for (let i = 0; i < liNodes.length; i++) {
        liNodes[i].style.removeProperty("display");

    }
})

completedbt.addEventListener("click", function () {
    let liNodes = document.getElementsByClassName("todo-app__item");
    for (let i = 0; i < liNodes.length; i++) {
        let h1 = liNodes[i].getElementsByTagName("h1");
        if (h1[0].style.opacity == 0.5) {
            liNodes[i].style.removeProperty("display");
        } else {
            liNodes[i].style.display = "none";
        }
    }
}
)

activebt.addEventListener("click", function () {
    let liNodes = document.getElementsByClassName("todo-app__item");
    for (let i = 0; i < liNodes.length; i++) {
        let h1 = liNodes[i].getElementsByTagName("h1");
        if (h1[0].style.opacity == 0.5) {
            liNodes[i].style.display = "none";
        } else {
            liNodes[i].style.removeProperty("display");
        }
    }
}
)

clearbt.addEventListener("click", function () {
    let liNodes = document.getElementsByClassName("todo-app__item");
    for (let i = 0; i < liNodes.length; i++) {
        let h1 = liNodes[i].getElementsByTagName("h1");
        if (h1[0].style.opacity == 0.5) {
            list.todo_list.splice(i, 1);
        }
    }
    render();
    footrender();
})

function render() {
    ulNode.innerHTML = "";
    clickCompleted = 0;
    for (let i = 0; i < list.todo_list.length; i++) {
        let liNode = new Row(list.todo_list[i]).liNode;
        ulNode.appendChild(liNode);
    }
}

function submit() {
    var str = "";
    var submitValue = testInput.value;
    str = submitValue;
    list.todo_list.push(str);
    testInput.value = "";
    render();
    footrender()
}

function footrender() {
    leftNode = document.getElementById("todo-app__total");
    if (list.todo_list.length === 0) {
        footerHtml.style.display = "none";
    } else {
        footerHtml.style.removeProperty("display");
        leftNode.innerText = (list.todo_list.length + clickCompleted) + " left";
    }
    let liNodes = document.getElementsByClassName("todo-app__item");
    clearbt.style.visibility = "hidden";
    for (let i = 0; i < liNodes.length; i++) {
        let h1 = liNodes[i].getElementsByTagName("h1");
        if (h1[0].style.opacity == 0.5) {
            clearbt.style.removeProperty("visibility");
        }
    }

}