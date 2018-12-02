
/*------------------------------------------------------------------- */
/*
function text_search(post, searched)
{
	var check = null;
	if(text.trim() != "")
	{
		text = text.toLowerCase().split(" ");
		for(var i = 0 ; i < searched.length; i++)
		{
			check = searched[i].textContent.toLowerCase().split(" ");
			for(var j = 0 ; j < check.length; j++)
			{
				if(text.includes(check[j]))
				{
					break;
				}
				else if(!text.includes(check[j]) && j+1 == check.length)
				{
					document.getElementById("posts").removeChild(searched[i]);
				}
			}
		}
	}
}
*/

function doFilterUpdate() {

    /*
     * Grab values of filters from user inputs.
     */
    
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
            //postElems[j].classList.remove('hidden');
        }
        else {
            postElems[j].style.display = "none";
            console.log("Failure");
            //postElems[j].classList.add('hidden');
        }
      }
      
      /*
      for(var j = 0; j < postElems.length ; j++)
      {
          console.log("Test: " + postElems[j].length);
        if(postPassesFilters(postElems[j], filters))
        {
            postElems[j].classList.remove('hidden');
        }
        else {
            postElems[j].classList.add('hidden');
        }
      }
      */
    }
/*
    var postElems = document.getElementsByClassName('project-card');
    for (var i = 0; i < postElems.length; i++) {
        var 
        for(var j=0 ; j < )
        allPosts.push(parsePostElem(postElems[i]));
    }




    allPosts.forEach(function (post) {
        if (postPassesFilters(post, filters)) {
          post.classList.remove('hidden');
        }
        else{
            post.classList.add('hidden');
        }
    });
*/
}
function postPassesFilters(post, filters) {
    if (filters.text) {
        var postheader2 = post.getElementsByClassName("post-header")[0].querySelector('a').innerHTML.toLowerCase();
        console.log("Post header Test:", postheader2);
/*
            var postname = document.getElementsByClassName('post-header');

        for(var i = 0 ; i < post.length ; i++)
        {
            
            var postheader = post[i].getElementsByClassName("post-header")[0].innerHTML;
            console.log("Post header Test:", postheader);
            var postheader2 = post[i].getElementsByClassName("post-header")[0].querySelector('a').innerHTML.toLowerCase();
            console.log("Post header Test:", postheader2);
            
        }
  */    
        var filterText = filters.text.toLowerCase();
        console.log("FILTER TITLE:" + filterText);
        if (postheader2.indexOf(filterText) === -1) {
            return false;
        }
    }
    return true;
}


/*it will be in addeventlistenr */
/*
var projectElems = document.getElementsByClassName('project-card');
  for (var i = 0; i < projectElems.length; i++) {
    var postElems = projectElems.getElementsByClassName('posts-dialog');
    for(var j = 0; j < postElems.length ; j++)
    {

    }
    allPosts.push(parsePostElem(postElems[i]));
  }
*/



/*------------------------------------------------------------------- */
/* Show modal */
function showModal() {

    var modal = document.getElementById('new-post-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    modal.classList.remove('hidden');
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

function newProject(description, photoURL, price, city, condition) {
    var context = {
        "price": price,
        "city": city,
        "condition": condition,
        "description": description,
        "photoURL": photoURL
    }
    var post = Handlebars.templates.itemPost(context);

    /*
     * Add the new post element into the DOM at the end of the posts <section>.
     */
    var postsSection = document.getElementById('posts');
    postsSection.insertAdjacentHTML("beforeend", post);

}
function newPost(project, codeName, code) {
    var context = {
        "price": price,
        "city": city,
        "condition": condition,
        "description": description,
        "photoURL": photoURL
    }
    var post = Handlebars.templates.itemPost(context);

    /*
     * Add the new post element into the DOM at the end of the posts <section>.
     */
    var postsSection = document.getElementById('posts');
    postsSection.insertAdjacentHTML("beforeend", post);

}

/* Handling adding a post */

/*
function handleModalAcceptClick() {
    var project = document.getElementById('create-project').value.trim();
    var codeName = document.getElementById('create-codename').value.trim();
    var code = document.getElementById('create-code').value.trim();

    if (!project || !codeName || !code) {
        alert("You must fill in all of the fields!");
    } else {

      if (project === "Type new project name") {
          newPost(project, codeName, code)
      } else {
          */
          /*Create new project (Actually get name)*/
/*
          newPost(project, codeName, code)
      }
      allPosts.push({
          description: description,
          photoURL: photoURL,
          price: price,
          city: city,
          condition: condition
      });

      hideModal()
}
*/

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
    for(var j = 0 ; j < modalBackdrop.length ; j++)
    {
        if(j == i-10)
        {
            modalBackdrop[j].classList.add('hidden');
        }
    }

    postplusbutton.classList.remove('hidden');

    postminusbutton.classList.add('hidden');


}

/*Not done!! Clear modal */
function clearModalInputs() {

    var modalInputElements = document.querySelectorAll('#new-post-modal input')
    for (var i = 0; i < modalInputElements.length; i++) {
      modalInputElements[i].value = '';
    }
    modalInputElements[0] = "Type new project name"

}


/* close modal */
function hideModal() {

    var modal = document.getElementById('new-post-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    modal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');

 /*   clearModalInputs();*/
}

window.addEventListener('DOMContentLoaded', function () {
/*
    var projectElems = document.getElementsByClassName('project-card');
    for (var i = 0; i < projectElems.length; i++) {
      var postElems = projectElems.getElementsByClassName('posts-dialog');
      for(var j = 0; j < postElems.length ; j++)
      {
        allPosts.push(parsePostElem(postElems[j]));
      }
    }

    var postElems = document.getElementsByClassName('project-card');
    for (var i = 0; i < postElems.length; i++) {
        var 
        for(var j=0 ; j < )
        allPosts.push(parsePostElem(postElems[i]));
    }

*/




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
/*
    var modalAcceptButton = document.getElementById('modal-accept');
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
*/
    var modalHideButtons = document.getElementsByClassName('modal-hide-button');
    for (var i = 0; i < modalHideButtons.length; i++) {
      modalHideButtons[i].addEventListener('click', hideModal);
    }

    
    var searchButton = document.getElementById('search-button');
    
    searchButton.addEventListener('click', doFilterUpdate);
    
});

/* Create Action */
