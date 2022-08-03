const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const titleTag = document.getElementById("addTitle"),
  descTag = document.getElementById("addTxt");
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();
  if (title.length == 0) {
    alert("Write something in the title box");
  } else {
    let noteInfo = { title, description,color };

    notes.push(noteInfo);
    localStorage.setItem("notes", JSON.stringify(notes));
    descTag.value = "";
    titleTag.value = "";
    addImp.classList.remove("btn-warning");
    addImp.classList.add("btn-secondary");
    showNotes();
  }
});
let color = "btn-secondary";
let addImp = document.getElementById("addImp");
addImp.addEventListener("click", () => {
  if (addImp.classList.contains("btn-secondary")) {
    addImp.classList.remove(color);
    addImp.classList.add("btn-warning");
    color = "btn-warning";
  } else {
    addImp.classList.remove("btn-warning");
    addImp.classList.add("btn-secondary"); 
    color = "btn-secondary";
  }
});

function showNotes() {
  if (!notes) return;
  //   document.querySelectorAll(".note").forEach((li) => li.remove());
  let html = "";
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${note.title}</h5>
                                <p class="card-text"> ${filterDesc}</p>
                                <button id="${id}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                                <button class="btn ${note.color}" id="${(id+1)/10}" onclick="changeColor(this.id)">Marked imp</button>
                            </div>
                        </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notes.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}
showNotes();

function deleteNote(index) {
  // console.log("I am deleting", index)
  // let confirmDel = confirm("Are you sure you want to delete this note?");
  // if (!confirmDel) return;
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("h5")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

function changeColor(clr) {
  clr=document.getElementById(clr)
  clr.addEventListener("click", function () {

    if (clr.classList.contains("btn-secondary")) {
      clr.classList.remove("btn-secondary");
      clr.classList.add("btn-warning");
    } else {
      clr.classList.remove("btn-warning");
      clr.classList.add("btn-secondary");
    }
  });
}
