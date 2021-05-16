

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
    const response = await fetch(`http://localhost:8080/todolist/${form.putId.value}`, {
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
                <button id='delButton' type="submit button" class="btn btn-primary">Delete Card ${i.id}</button>
            </div>
        </div>
        
       `

}
       displayArea.innerHTML = displayhtml;
       
        // Delete Card
        const deleteArea = document.querySelector('#delButton')  
        deleteArea.addEventListener('click',  () => {
        fetch(`http://localhost:8080/todolist/${jsonResponse[0].id}`, {
            method: 'DELETE',
            headers: {
            "Content-Type": "application/json"
        },
        })
        .then(res => res.text()) 
        .then(res => console.log(res))
        })
}

showCard();

// View Card
async function viewCard(){  
    const data = await fetch('http://localhost:8080/todolist')
    const jsonResponse = await data.json()

    let displayArea = document.querySelector('#ViewCard1Modal')
    let displayhtml = ``
    let i = jsonResponse[0]
        displayhtml = displayhtml + `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ViewCardModalLabel">View Card</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body text-left">
                    <form>
                        <div class="form-group">
                            <label for="taskcard-name" class="col-form-label"><span style="font-size: 0.9rem;">Task Name</span></label>
                            <input type="text" class="form-control" id="taskcard-name" placeholder="${i.name}" readonly>
                            <br>
                            <label for="taskcard-description" class="col-form-label"><span style="font-size: 0.9rem;">Task Description</span></label>
                            <textarea class="form-control" id="taskcard-description" rows="3" placeholder="${i.description}" readonly></textarea>
                        </div>

                        <br>

                        <div class="form-group row">
                            <label for="colFormLabel" class="col-sm-3 col-form-label"><i class="fas fa-tags fa-sm m-1"></i><span style="font-size: 0.9rem;">Status</span></label>
                            <div class="col-sm-9">
                                <div class="btn-group-sm btn-group-toggle mt-1" data-toggle="buttons">
                                    <label class="btn btn-info rounded-pill">
                                      <input type="radio" name="options" id="option1" autocomplete="off" disabled> TO DO
                                    </label>
                                    <label class="btn btn-info rounded-pill active">
                                      <input type="radio" name="options" id="option2" autocomplete="off" checked disabled> IN PROGRESS
                                    </label>
                                    <label class="btn btn-info rounded-pill">
                                      <input type="radio" name="options" id="option3" autocomplete="off" disabled> REVIEW
                                    </label>
                                    <label class="btn btn-info rounded-pill">
                                        <input type="radio" name="options" id="option3" autocomplete="off" disabled> DONE
                                      </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="colFormLabel" class="col-sm-3 col-form-label"><i class="fas fa-tags fa-sm m-1"></i><span style="font-size: 0.9rem;">Members</span></label>
                            <div class="col-sm-9">
                                <i class="fas fa-user-circle fa-2x m-1"></i>
                                <i class="fas fa-user-circle fa-2x m-1"></i>
                                <i class="fas fa-user-circle fa-2x m-1"></i>
                                <i class="fas fa-plus-circle fa-2x mr-2 float-right"></i>
                            </div>
                        </div>


                        <div class="form-group row">
                            <label for="example-date-input" class="col-5 col-sm-3 col-form-label"><i class="fas fa-clock fa-sm m-1"></i><span style="font-size: 0.9rem;">Due-Date</span></label>
                            <div class="col-7 col-sm-9">
                                <input class="form-control" type="date" value="2021-04-15" id="example-date-input" readonly>
                            </div>
                        </div>
                    </form>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#EditCard1Modal"><i class="fas fa-edit mr-2"></i>Edit Card</button>
                
                </div>
            </div>
        </div>
    </div>
        
       `       
       displayArea.innerHTML = displayhtml;
    

}
viewCard();