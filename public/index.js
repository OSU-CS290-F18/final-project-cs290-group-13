/* Not done!! Search bar action -> search the post name in projects, and remover others*/

/*
function text_search(text, searched)
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

});

/* Create Action */

