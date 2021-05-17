// GET CARD ----- [todo] 
async function showCard(){  
    const data = await fetch('http://localhost:8080/todolist')
    const jsonResponse = await data.json()
    let displayArea = document.querySelector('#card-fetch-area')
    let displayhtml = ``
    for (let i of jsonResponse){
        displayhtml = displayhtml + `
        <!-- Task Card -->
        <div class="task-card-kit ">
            <div class="clearfix">
                <button type="button " class="status-overlap rounded-pill btn btn-info float-left ">${i.status}</button>
                <button type="button " class="star-overlap btn btn btn-outline-warning float-right "><i class="fas fa-star "></i></button>
            </div>
            <div class="card bg-light mb-3 ">
                <div class="card-body " data-toggle="modal" data-target="#ViewCard1Modal${i.id}">
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



        <!-- VIEW CARD MODAL -->
        <div class="modal fade" id="ViewCard1Modal${i.id}" tabindex="-1" role="dialog" aria-labelledby="ViewCard1ModalLabel" aria-hidden="true" style="max-width: 100%;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ViewCardModalLabel">View Card</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-left">
                    <form id='ViewCardForm'>
                    <label name='id'>Id: 
                    <input type='text' name='delId' id='delId' value="${i.id}"/>
                    </label><br>
                        <label name='name'>Name: 
                            ${i.name}
                        </label><br>
                        <label name='description'>Description: 
                            ${i.description}
                        </label><br>
                        <label name='assignedto'>Assigned to: 
                            ${i.assignedto}
                        </label><br>
                        <label name='duedate'>Due date: 
                            ${i.duedate}
                        </label><br>
                        <label name='status'>Status: 
                            ${i.status}
                        </label><br>
                        <div class="modal-footer">
                            <button id='delButton' type="click button" class="btn btn-primary" onclick="javascript:window.location.reload()">Delete Card</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal"  data-target="#EditCard1Modal${i.id}"><i class="fas fa-edit mr-2"></i>Edit Card</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> 
                        </div>
                    </form>
                </div>

            </div>
        </div>
        </div>


        <!-- EDIT CARD MODAL -->
        <div class="modal fade" id="EditCard1Modal${i.id}" tabindex="-1" role="dialog" aria-labelledby="EditCard1ModalLabel" aria-hidden="true" style="max-width: 100%;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="EditCard1ModalLabel">Edit Card</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>

                <div class="modal-body text-left">
                    <form method="PUT" id='fetchSaveCardForm' action='http://localhost:8080/todolist/'>
                        <label name='id'>Id: 
                            <input type='text' name='putId' id='putId' value="${i.id}"/>
                        </label><br>
                        <label name='name'>Name: 
                            <input type='text' name='putName' id='putName' value="${i.name}"/>
                        </label><br>
                        <label name='description'>Description: 
                            <input type='text' name='putDescription' id='putDescription' value="${i.description}"/>
                        </label><br>
                        <label name='assignedto'>Assigned to: 
                            <input type='text' name='putAssignedto' id='putAssignedto' value="${i.assignedto}"/>
                        </label><br>
                        <label name='duedate'>Due date: 
                            <input type='text' name='putDuedate' id='putDuedate' value="${i.duedate}"/>
                        </label><br>
                        <label name='status'>Status: 
                            <input type='text' name='putStatus' id='putStatus' value="${i.status}"/>
                        </label><br>

                        <div class="modal-footer">
                            <button id='saveButton' type="submit button" class="btn btn-primary" onclick="javascript:window.location.reload()">Save Changes</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                        </div>

                    </form>
                </div>

            </div>
        </div>
        </div>


       `        
    }
    displayArea.innerHTML = displayhtml;

    var newScript = document.createElement("script");
    var inlineScript = document.createTextNode(`
    console.log(1)
    addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const formObject = {};
        formObject['id'] = form.putId.value;
        formObject['name'] = form.putName.value;
        formObject['description'] = form.putDescription.value;
        formObject['assignedto'] = form.putAssignedto.value;
        formObject['duedate'] = form.putDuedate.value;
        formObject['status'] = form.putStatus.value;
        fetchLink = 'http://localhost:8080/todolist/' + form.putId.value;
        const response = await fetch(fetchLink , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject),
        })
            let jsonResponse = await response.json();
            return jsonResponse
        })`);
    newScript.appendChild(inlineScript);
    document.querySelector('#fetchSaveCardForm').appendChild(newScript);



        var newNewScript = document.createElement("script");
        var delScript = document.createTextNode(`
        console.log(2)
        addEventListener('submit', async (event) => {
            event.preventDefault();
            const form = event.target;
            const formObject = {};
            formObject['id'] = form.delId.value;
            console.log('http://localhost:8080/todolist/' + form.delId.value)      
            fetchLink = 'http://localhost:8080/todolist/' + form.delId.value;
            const response = await fetch(fetchLink , {
                method: 'DELETE',
                headers: {
                "Content-Type": "application/json"
            },
            })
            .then(res => res.text()) 
            .then(res => console.log(res))
            })`
            )
        newNewScript.appendChild(delScript);
        document.querySelector('#delButton').appendChild(newNewScript); 

}
showCard();




//ADD CARD ----- Fetch: POST with JSON format
const fetchAddCardForm = document.querySelector('#fetchAddCardForm')
fetchAddCardForm.addEventListener('submit', async (event) => {
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


