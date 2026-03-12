// TIME & GREETING

function updateTime(){

const now = new Date()

document.getElementById("time").textContent =
now.toLocaleTimeString()

document.getElementById("date").textContent =
now.toDateString()

let hour = now.getHours()

let greeting="Hello"

if(hour < 12) greeting="Good Morning"
else if(hour < 18) greeting="Good Afternoon"
else greeting="Good Evening"

document.getElementById("greeting").textContent=greeting

}

setInterval(updateTime,1000)
updateTime()



// TIMER

let time = 1500
let timerInterval

function updateTimer(){

let minutes=Math.floor(time/60)
let seconds=time%60

document.getElementById("timer").textContent =
`${minutes}:${seconds.toString().padStart(2,"0")}`

}

document.getElementById("start").onclick=()=>{

timerInterval=setInterval(()=>{

time--

updateTimer()

if(time<=0) clearInterval(timerInterval)

},1000)

}

document.getElementById("stop").onclick=()=>{
clearInterval(timerInterval)
}

document.getElementById("reset").onclick=()=>{
clearInterval(timerInterval)
time=1500
updateTimer()
}

updateTimer()



// TASKS

const taskInput=document.getElementById("taskInput")
const taskList=document.getElementById("taskList")

let tasks=JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks))
}

function renderTasks(){

taskList.innerHTML=""

tasks.forEach((task,index)=>{

let li=document.createElement("li")

if(task.done) li.classList.add("done")

li.innerHTML=`
<span>${task.text}</span>
<div>
<button onclick="toggleTask(${index})">✓</button>
<button onclick="deleteTask(${index})">X</button>
</div>
`

taskList.appendChild(li)

})

}

document.getElementById("addTask").onclick=()=>{

if(taskInput.value==="") return

tasks.push({
text:taskInput.value,
done:false
})

taskInput.value=""

saveTasks()
renderTasks()

}

function toggleTask(index){

tasks[index].done=!tasks[index].done

saveTasks()
renderTasks()

}

function deleteTask(index){

tasks.splice(index,1)

saveTasks()
renderTasks()

}

renderTasks()



// QUICK LINKS

const linkName=document.getElementById("linkName")
const linkURL=document.getElementById("linkURL")
const linksDiv=document.getElementById("links")

let links=JSON.parse(localStorage.getItem("links")) || []

function saveLinks(){
localStorage.setItem("links",JSON.stringify(links))
}

function renderLinks(){

linksDiv.innerHTML=""

links.forEach((link,index)=>{

let div=document.createElement("div")
div.className="link-box"

div.innerHTML=`

<a class="link-btn" href="${link.url}" target="_blank">${link.name}</a>
<button class="delete-btn" onclick="deleteLink(${index})">Delete</button>

`

linksDiv.appendChild(div)

})

}

document.getElementById("addLink").onclick=()=>{

if(!linkName.value || !linkURL.value) return

links.push({
name:linkName.value,
url:linkURL.value
})

linkName.value=""
linkURL.value=""

saveLinks()
renderLinks()

}

function deleteLink(index){

links.splice(index,1)

saveLinks()
renderLinks()

}

renderLinks()