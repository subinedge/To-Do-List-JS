const form = document.getElementById('myForm');
const taskName = document.getElementById('taskName');
const taskDescription = document.getElementById('taskDescription');
const taskResults = document.querySelector('.taskResults');
var textName;
var textDescription;
let taskData = [];

// form submission
form.addEventListener('submit', function(e) {
  textName = taskName.value;
  textDescription = taskDescription.value;

  // console.log(textName + ' ' + textDescription);

  // check if the input is empty or not // textname is mandatory
  if (textName === '') {
    alert('Useless cocksucker !!! Enter some task u nigga');
  } else {
    //add the item
    addItem(textName, textDescription);
    //clear the input area after adding the item
    // u have to clear the textbox value, not the value stored in the variable above.
    // so clear the input box
    taskName.value = '';
    taskDescription.value = '';

    // add the items to array
    taskData.push(textName, textDescription);
    // console.log(taskData);

    // going to access the HTML of the complete, edit,delete button... for that
    // u can only do it by after submitting the form.

    var well = document.querySelector('.well');
    handleButtons(textName);
  }

  e.preventDefault();
});

//add the item
function addItem(name, description) {
  //doesnt matter the parameter values, argument matters
  const div = document.createElement('div');
  div.classList.add('well', 'well-lg');
  div.innerHTML = `<button type="button" class="btn btn-danger">Delete</button>
                   <button type="button" class="btn btn-info">Edit</button>
                   <button type="button" class="btn btn-success">Complete</button>
                   <h1 class="heading">${name}</h1>
                   <p class="paragraph">${description}
                   </p>`;
  taskResults.appendChild(div);
}

//this function is going to run only after the click of SAVE TASK button
function handleButtons(textName) {
  const wellAll = taskResults.querySelectorAll('.well');
  wellAll.forEach(function(well) {
    if (well.querySelector('.heading').textContent == textName) {
      //complete button
      well.querySelector('.btn-success').addEventListener('click', function() {
        document.querySelector('.heading').classList.toggle('completed');
        document.querySelector('.paragraph').classList.toggle('completed');
        this.classList.toggle('visibility');
      });

      //edit button
      well.querySelector('.btn-info').addEventListener('click', function() {
        taskName.value = textName;
        taskDescription.value = textDescription;
        taskResults.removeChild(well);

        taskData = taskData.filter(function(well) {
          if (well != (taskName && taskDescription)) {
            return well;
          }
        });
      });

      //Delete button
      well.querySelector('.btn-danger').addEventListener('click', function() {
        taskResults.removeChild(well);

        taskData = taskData.filter(function(well) {
          if (well != (taskName && taskDescription)) {
            return well;
          }
        });
      });
    }
  });
}
