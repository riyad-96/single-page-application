const textarea = document.querySelector("textarea")
const saveBtn = document.querySelector(".save-btn")
const backBtn = document.querySelector(".go-back-btn")
const h1 = document.querySelector("h1")

const urlId = new URLSearchParams(location.search).get("id")
const savedProjects = JSON.parse(localStorage.getItem("projects") || '[]')

const currentProject = savedProjects.find(p => p.id === Number(urlId))

h1.textContent = currentProject.name

saveBtn.addEventListener('click', () => {
  const code = textarea.value
  localStorage.setItem('project-' + urlId, code)
})

const savedCode = localStorage.getItem('project-' + urlId)
textarea.value = savedCode