/* Search Bar */
function doFilterUpdate() {

    var filters = {
      text: document.getElementById('search-text-input').value.trim(),
    }


    var projectElems = document.getElementsByClassName('project-card');
    for (var i = 0; i < projectElems.length; i++) {
      var postElems = projectElems[i].getElementsByClassName('post');
      for(var j = 0 ; j <postElems.length ; j++)
      {
        if(postPassesFilters(postElems[j], filters))
        {
            console.log("Success");
            postElems[j].style.display = "";
        }
        else {
            postElems[j].style.display = "none";
            console.log("Failure");
        }
      }

    }

}
function postPassesFilters(post, filters) {
    if (filters.text) {
        var postheader2 = post.getElementsByClassName("post-header")[0].querySelector('a').innerHTML.toLowerCase();
        console.log("Post header Test:", postheader2);
        var filterText = filters.text.toLowerCase();
        console.log("FILTER TITLE:" + filterText);
        if (postheader2.indexOf(filterText) === -1) {
            return false;
        }
    }
    return true;
}

/* Show modal */
function showModal() {
    var modal = document.getElementById('new-post-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    modal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

}
/* close modal */
function hideModal() {
    var modal = document.getElementById('new-post-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');
    var projectModal = document.getElementById('new-project-modal');

    modal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');
    projectModal.classList.add('hidden');

    clearModalInputs();
}

function showProjectModal() {
    var modal = document.getElementById('new-project-modal');
    var oldModal = document.getElementById('new-post-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    modal.classList.remove('hidden');
    oldModal.classList.add('hidden');
    modalBackdrop.classList.remove('hidden');

}


function showPost(i) {
    var count = i;
    var count2 = i+10;

    var postplusbutton = document.getElementById(count);
    var postminusbutton = document.getElementById(count2);

    var modal = document.getElementsByClassName('posts');
    for(var j = 0 ; j < modal.length; j++)
    {
        if(j == i)
        {
            modal[j].classList.remove('hidden');
        }
    }

    var modalBackdrop = document.getElementsByClassName('posts-backdrop');
    for(var j = 0 ; j < modalBackdrop.length ; j++)
    {
        if(j == i)
        {
            modalBackdrop[j].classList.remove('hidden');
        }
    }

    postplusbutton.classList.add('hidden');

    postminusbutton.classList.remove('hidden');

}

function newProject(title) {
    console.log("NEW PROJECT")

    var postRequest = new XMLHttpRequest();
    var requestURL = '/addProject';
    postRequest.open('POST', requestURL);

    var projects = document.querySelector(".main-page");
    var button = projects.children.length - 1;
    var requestBody = JSON.stringify({
        title: title,
        posts: [],
        button: button,
        button10: button + 10
    });

    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);

    postRequest.addEventListener('load', function (event) {
        if (event.target.status === 200) {
            var projects = document.querySelector(".main-page");
            var button = projects.children.length - 1
            var context = {
                "title": title,
                "posts": [],
                "button": button,
                "button10": button + 10
            }
            var post = Handlebars.templates.projectCard(context);
            projects.insertAdjacentHTML("beforeend", post);

            var open = document.getElementById(button);
            open.addEventListener('click', function()
            {
                var id = parseInt(this.id);
                console.log("123== New words were entered: " + id);
                showPost(id);
            });

            var close = document.getElementById(button + 10);
            close.addEventListener('click', function()
            {
                var id = parseInt(this.id);
                console.log("== New words were entered: " + id);
                hidePost(id)
            });

            var html = "<option>" + title + "</option>"
            var menu = document.getElementById("create-project");
            menu.insertAdjacentHTML("beforeend", html);
            
        } else {
          alert("Error making new project: " + event.target.response);
        }
    });


    hideModal()
  /*
    console.log("NEW PROJECT")
    var projects = document.querySelector(".main-page");
    var button = projects.children.length - 1
    var context = {
        "title": title,
        "posts": [],
        "button": button,
        "button10": button + 10
    }
    var post = Handlebars.templates.projectCard(context);
    projects.insertAdjacentHTML("beforeend", post);

    var open = document.getElementById(button);
    open.addEventListener('click', function()
    {
        var id = parseInt(this.id);
        console.log("123== New words were entered: " + id);
        showPost(id);
    });

    var close = document.getElementById(button + 10);
    close.addEventListener('click', function()
    {
        var id = parseInt(this.id);
        console.log("== New words were entered: " + id);
        hidePost(id)
    });

    var html = "<option>" + title + "</option>"
    var menu = document.getElementById("create-project");
    menu.insertAdjacentHTML("beforeend", html)
    hideModal()
    */
}

/*WORKKKKKKK NOOOOWW :)*/
/*---------------------------------------- */
function newPost(project, codeName, code, codeLink) {
    console.log("NEW POST")

    var postRequest = new XMLHttpRequest();
    var requestURL = '/addPost';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify({
        project: project,
        title: codeName,
        link: codeLink,
        imgURL: code
    });

    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);

    postRequest.addEventListener('load', function (event) {
        if (event.target.status === 200) {
            var context = {
                title: codeName,
                link: codeLink,
                imgURL: code
            }
            var post = Handlebars.templates.post(context);

            var projects = document.querySelectorAll(".project-card");
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].title == project) {
                    projects[i].children[2].children[0].insertAdjacentHTML("beforeend", post);
                    break
                }
            }
            /*
            var post = Handlebars.templates.post(context);
            var newPostCardHTML = post({
                project: project,
                title: codeName,
                link: codeLink,
                imgURL: code
            });


            var projects = document.querySelectorAll(".project-card");
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].title == project) {
                    projects[i].children[2].children[0].insertAdjacentHTML("beforeend", newPostCardHTML);
                    break
                }
            }
            */
        } else {
          alert("Error storing photo: " + event.target.response);
        }
    });


    hideModal()
}


/*---------------------------------------- */


/* Handling adding a post */

function handleModalAcceptClick() {
    var project = document.getElementById('create-project').value.trim();
    var codeName = document.getElementById('create-codename').value.trim();
    var code = document.getElementById('create-code').value.trim();
    var codeLink = document.getElementById('create-code-link').value.trim();

    if (!project || !codeName || !code || !codeLink) {
        alert("You must fill in all of the fields!");
    } else {

        newPost(project, codeName, code, codeLink);
        hideModal();
    }
}

function handleProjectAcceptClick() {
    var project = document.getElementById('project-name').value.trim();

    if (!project) {
        alert("You must fill in all of the fields!");
    } else {

        newProject(project);
        hideModal();
    }
}


function hidePost(i) {
    var count = i-10;
    var count2 = i;

    var postplusbutton = document.getElementById(count);
    var postminusbutton = document.getElementById(count2);


    var modal = document.getElementsByClassName('posts');
    for(var j = 0 ; j < modal.length; j++)
    {
        if(j == i-10)
        {
            modal[j].classList.add('hidden');
        }
    }

    var modalBackdrop = document.getElementsByClassName('posts-backdrop');
    for(var j = 0 ; j < modalBackdrop.length; j++)
    {
        if(j == i-10)
        {
            modalBackdrop[j].classList.add('hidden');
        }
    }

    postplusbutton.classList.remove('hidden');
    postminusbutton.classList.add('hidden');


}

/* Clear modal */
function clearModalInputs() {
    document.getElementById("create-project").value = "";
    document.getElementById("create-codename").value = "";
    document.getElementById("create-code").value = "";
    document.getElementById('create-code-link').value = "";
    document.getElementById('project-name').value = "";
}

window.addEventListener('DOMContentLoaded', function () {
    var addPostButton = document.getElementById('add-new-post');
    addPostButton.addEventListener('click', showModal);

    var showPostButton = document.getElementsByClassName('post-expand-button');

    for(var i = 0 ; i < showPostButton.length ; i++)
    {
        showPostButton[i].addEventListener('click', function()
        {
            var id = parseInt(this.id);
            console.log("123== New words were entered: " + id);
            showPost(id);
        });
    }

    var postHideButton = document.getElementsByClassName('post-close-button');
    for(var i = 0 ; i < postHideButton.length ; i++)
    {
        postHideButton[i].addEventListener('click', function()
        {
            var id = parseInt(this.id);
            console.log("== New words were entered: " + id);
            hidePost(id)
        });
    }

    var modalProjectButton = document.getElementById('modal-project');
    modalProjectButton.addEventListener('click', showProjectModal);

    var modalAcceptButton = document.getElementById('modal-accept');
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);

    var projectAcceptButton = document.getElementById('project-accept');
    projectAcceptButton.addEventListener('click', handleProjectAcceptClick);

    var modalHideButtons = document.getElementsByClassName('modal-hide-button');
    for (var i = 0; i < modalHideButtons.length; i++) {
      modalHideButtons[i].addEventListener('click', hideModal);
    }
    var modalHideButtons = document.getElementsByClassName('modal-close-button');
    for (var i = 0; i < modalHideButtons.length; i++) {
      modalHideButtons[i].addEventListener('click', hideModal);
    }

    var searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', doFilterUpdate);

});

/* Create Action */
