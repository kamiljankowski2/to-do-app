class Tasks {
    constructor() {
        this.allTasks = []
        this.container = document.querySelector('.tasks-container')
        this.index = 0;
        this.heading = document.querySelector('.heading__list')
    }
    add(e) {

        if (Validation.check()) {
            e.preventDefault()
            const getTitle = document.querySelector('#title');
            const getDescription = document.querySelector('#description')
            const getDate = document.querySelector('#date')
            const getCategory = document.getElementsByName(`category`)
            let category = null

            getCategory.forEach(item => {
                if (item.checked) {
                    category = item.getAttribute("id")
                }
            })
            const li = document.createElement(`li`);
            const div = document.createElement(`div`);
            const div2 = document.createElement(`div`);
            const div3 = document.createElement(`div`);
            const div4 = document.createElement(`div`);
            const h2 = document.createElement(`h2`);
            const h5 = document.createElement(`h5`);
            const h52 = document.createElement(`h5`);
            const p = document.createElement(`p`);
            const span = document.createElement('span')
            const span2 = document.createElement('span')
            const btnDel = document.createElement(`button`);
            const btnFin = document.createElement(`button`);
            const btnUn = document.createElement(`button`);
            btnFin.className = "button button__task button__task-finished";
            btnDel.className = "button button__task button__task-delete";
            btnUn.className = "button button__task button__task-unfinished";
            li.className = "task group";
            li.dataset.key = this.index;
            h2.className = "task__heading"
            h2.textContent = getTitle.value
            p.className = "task__description"
            p.textContent = getDescription.value
            div.className = "group group--task"
            div2.className = "task__info-container"
            h5.className = "task__info-heading"
            h5.textContent = "Category "
            div2.appendChild(h5)
            span.className = "task__category-item";
            span.textContent = category
            div2.appendChild(span)
            div3.className = "task__info-container"
            h52.className = "task__info-heading"
            h52.textContent = "Final Term "
            div3.appendChild(h52)
            span2.className = "task__term-item"
            span2.textContent = getDate.value
            div3.appendChild(span2)
            div.appendChild(div2)
            div.appendChild(div3)
            div4.className = "task__group";
            btnDel.innerHTML = `<i class="fas fa-trash-alt icon--sm"></i>`;
            btnFin.innerHTML = `<i class="fas fa-check icon--sm"></i>`;
            btnUn.innerHTML = `<i class="fas fa-times icon--sm"></i>`;
            btnFin.setAttribute("data-status", "true")
            btnUn.setAttribute("data-status", "false")
            btnDel.addEventListener("click", (e) => this.delete(e))
            btnFin.addEventListener("click", (e) => this.completed(e))
            btnUn.addEventListener("click", (e) => this.completed(e))
            div4.appendChild(btnFin)
            div4.appendChild(btnUn)
            div4.appendChild(btnDel)
            div4.appendChild(btnDel)
            li.appendChild(h2)
            li.appendChild(p)
            li.appendChild(div)
            li.appendChild(div4)

            this.allTasks.push({
                index: this.index++,
                completed: null,
                category,
                task: li
            })
            console.log(this.allTasks)
            getTitle.value = "";
            getDescription.value = "";
            getCategory.forEach(item => {
                item.checked = false;
            })
            document.querySelector('select').value = "All"
            Render.tasks()

        }

    }
    delete(e) {
        const index = e.target.closest("li").getAttribute("data-key");
        const delIndex = this.allTasks.findIndex(item => item.index == index)
        this.allTasks.splice(delIndex, 1)
        this.container.textContent = ""
        Render.tasks()
    }
    completed(e) {
        const index = e.target.closest("li").getAttribute("data-key");
        const findIndex = this.allTasks.findIndex(item => item.index == index)
        console.log(findIndex)
        this.allTasks[findIndex].completed = e.target.closest("button").getAttribute("data-status")
        this.container.textContent = ""
        Render.tasks()
    }
}
class Render {
    static tasks() {
        tasks.container.textContent = "";
        const recentTasks = tasks.allTasks.filter(task => task.completed === null)
        recentTasks.forEach((task) => {
            tasks.container.prepend(task.task)

        })
        tasks.heading.textContent = `Tasks you recently added`

        if (recentTasks.length === 0) {
            const li = document.createElement('li')
            li.className = "task group"
            li.style.border = "none"
            li.textContent = "There is nothing to see"
            tasks.container.appendChild(li)
        }
    }

    static category(e) {
        const category = document.querySelector('select').value;

        if (category === "done" || category === "uncomplete") {
            tasks.container.textContent = "";
            let finishedTasks = []

            if (category === "done") {
                finishedTasks = tasks.allTasks.filter(task => task.completed == "true");
                tasks.heading.textContent = `Tasks you have completed`
            } else {
                finishedTasks = tasks.allTasks.filter(task => task.completed == "false")
                tasks.heading.textContent = `Tasks you have not completed`
            }
            finishedTasks.forEach(task => {
                tasks.container.prepend(task.task)
                document.querySelector(".button__task-finished").style.display = "none"
                document.querySelector(".button__task-unfinished").style.display = "none"
            })


            if (finishedTasks.length === 0) {
                const li = document.createElement('li')
                li.className = "task group"
                li.style.border = "none"
                li.textContent = "There is nothing to see"
                tasks.container.appendChild(li)
            }
        }
        else {
            const tasksByCat = tasks.allTasks.filter(task => task.category == category && !task.completed)
            tasks.heading.textContent = `Your ${category} tasks`
            tasks.container.textContent = "";
            tasksByCat.forEach(task => {
                tasks.container.prepend(task.task)
            })

            if (tasksByCat.length === 0) {
                const li = document.createElement('li')
                li.className = "task group"
                li.style.border = "none"
                li.textContent = "There is nothing to see"
                tasks.container.appendChild(li)
            }
        }


    }

    static date() {
        const getDate = document.querySelector('.input--date')
        const setDate = new Date()
        const minDate = setDate.toISOString().slice(0, 10);
        let maxDate = minDate.slice(0, 4) * 1 + 1;
        maxDate += "-12-31"
        getDate.setAttribute("min", minDate);
        getDate.setAttribute("max", maxDate);
    }
}

class Validation {
    static check() {
        const getTitle = document.querySelector('#title');
        const getDescription = document.querySelector('#description');
        const getCategory = document.getElementsByName(`category`);
        const getDate = document.querySelector('#date')

        let category = null;
        const errors = {
            input: true,
            area: true,
            radios: true,
            date: true
        }

        const input = document.querySelector('#validation--input');
        const area = document.querySelector('#validation--area');
        const radio = document.querySelector('#validation--radio')
        const date = document.querySelector('#validation--date')
        input.style.display = "none"
        area.style.display = "none"
        radio.style.display = "none"
        date.style.display = "none"


        if (getTitle.value.length === 0) {
            input.style.display = "block"
        } else {
            errors.input = false
        }
        if (getDescription.value.length === 0) {
            area.style.display = "block"
        } else {
            errors.area = false
        }
        if (getDate.value.length === 0) {
            date.style.display = "block"
        } else {
            errors.date = false
        }

        getCategory.forEach(item => {
            if (item.checked) {
                category = item.getAttribute("id")
            }
        })

        if (!category) {
            radio.style.display = "block"
        } else {
            errors.radios = false
        }
        if (!errors.input && !errors.area && !errors.radios && !errors.date) {
            return true
        }
    }
}


const tasks = new Tasks
document.querySelector(`.button__create`).addEventListener("click", (e) => { tasks.add(e) })

Render.date()

document.querySelector('select').addEventListener("change", Render.category)