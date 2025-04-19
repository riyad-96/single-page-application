const input = document.querySelector("input")
const create = document.querySelector(".create")
const createAndOpen = document.querySelector(".create-open")
const projectLists = document.querySelector("ul")

const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]")
// Get id and project name from presaved data
savedProjects.forEach((p) => {
  createLiElement(p.id, p.name)
})

// Creates project links
function createLiElement(id, name) {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = `./user/index.html?id=${id}`
  a.textContent = name
  
  const del = document.createElement("button")
  del.textContent = "Delete"
  del.classList.add('project-delete-btn')
  del.onclick = () => deleteProject(id, li)

  li.appendChild(a)
  li.appendChild(del)
  projectLists.prepend(li)
}

// Delete specific project
function deleteProject(id, liElement) {
  liElement.remove()

  const updatedProjects = savedProjects.filter((p) => p.id !== id)
  localStorage.setItem("projects", JSON.stringify(updatedProjects))
  location.reload()
}

let currentId = null

// save project data on local storage function
function savePageToLocal() {
  if (!input.value.trim()) return

  const projectInfo = {
    id: Date.now(),
    name: input.value.trim(),
  }

  currentId = projectInfo.id
  createLiElement(projectInfo.id, projectInfo.name)
  savedProjects.push(projectInfo)
  localStorage.setItem("projects", JSON.stringify(savedProjects))
  input.value = ""
}

create.addEventListener("click", savePageToLocal)
input.addEventListener("keydown", (e) => {
  if(e.key === 'Enter') {
    e.preventDefault()
    savePageToLocal()
  }
})

createAndOpen.addEventListener("click", () => {
  savePageToLocal()
  location.href = `./user/index.html?id=${currentId}`
})
