

//Fetch: POST with JSON format
const fetchLoginForm = document.querySelector('#fetchAddCardForm')
fetchLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject['id'] = form.fetchId.value;
    formObject['name'] = form.fetchName.value;
    formObject['description'] = form.fetchDescription.value;
    formObject['assignedto'] = form.fetchAssignedto.value;
    formObject['duedate'] = form.fetchDuedate.value;
    formObject['status'] = form.fetchStatus.value;
    const response = await fetch('http://localhost:8080/todolist/', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject), 
    })
    let jsonResponse = await response.json();
})

// Edit Card
const saveArea = document.querySelector('#fetchSaveCardForm')
saveArea.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject['id'] = form.putId.value;
    formObject['name'] = form.putName.value;
    formObject['description'] = form.putDescription.value;
    formObject['assignedto'] = form.putAssignedto.value;
    formObject['duedate'] = form.putDuedate.value;
    formObject['status'] = form.putStatus.value;
    const response = await fetch("http://localhost:8080/todolist/7", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formObject),
    })
    .then(response => {
    console.log(response);
    })
    .catch(err => {
    console.error(err);
    });
        let jsonResponse = await response.json();
    })


// Delete Card
    const deleteArea = document.querySelector('#delButton')
    deleteArea.addEventListener('click', () => {
        // let a = new URLSearchParams (window.location.search)
        // let id = a.get('id')
        fetch(`http://localhost:8080/todolist/7`, {
            method: 'DELETE',
        })
        .then(res => res.text()) 
        .then(res => console.log(res))
    })
    

// [todo] GET!
async function showCard(){  
    const data = await fetch('http://localhost:8080/todolist')
    const jsonResponse = await data.json()
    let displayArea = document.querySelector('#card-fetch-area')
    let displayhtml = ``
    for (let i of jsonResponse){
        displayhtml = displayhtml + `
        <!-- Task Card 1 -->
        <div class="task-card-kit ">
            <div class="clearfix">
                <button type="button " class="status-overlap rounded-pill btn btn-info float-left ">${i.status}</button>
                <button type="button " class="star-overlap btn btn btn-outline-warning float-right "><i class="fas fa-star "></i></button>
            </div>

            <div class="card bg-light mb-3 ">
                <div class="card-body " data-toggle="modal" data-target="#ViewCard1Modal">
                    <h5 class="card-title ">${i.name}</h5>
                    <p class="card-text ">${i.description}</p>
                    <p>${i.assignedto}</p>

                    <div class="bg-transparent clearfix ">
                        <button type="button " class="btn btn-light rounded-pill float-left "><i class="fas fa-clock "></i> ${i.duedate}</button>
                        <a class="navbar-user float-right " href="# ">
                            <i class="fas fa-user-circle fa-2x"></i>
                            <i class="fas fa-user-circle fa-2x"></i>
                            <i class="fas fa-user-circle fa-2x"></i>
                        </a>
                    </div>

                </div>

            </div>

        </div>



       `


        
    }
    displayArea.innerHTML = displayhtml;

}

showCard();