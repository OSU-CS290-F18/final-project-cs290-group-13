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
function showPost() {

    var modal = document.getElementById('posts');
    var modalBackdrop = document.getElementById('posts-backdrop');
  
    /* Not Done Yet, Not work in assignment2 and assignment3 */

    var postplusbutton = document.getElementById('expand-post');
    var postminusbutton = document.getElementById('close-post');
    modal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');


    postplusbutton.classList.add('hidden');
    postminusbutton.classList.remove('hidden');

  
}

function hidePost() {

    var modal = document.getElementById('posts');
    var modalBackdrop = document.getElementById('posts-backdrop');
  
    /* Not Done Yet, Use class name to sepately work */
    var postplusbutton = document.getElementById('expand-post');
    var postminusbutton = document.getElementById('close-post');
  
    modal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');
    postplusbutton.classList.remove('hidden');
    postminusbutton.classList.add('hidden');
  
 /*   clearModalInputs();*/
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

    var showPostButton = document.getElementById('expand-post');
    showPostButton.addEventListener('click', showPost);

    var postHideButton = document.getElementsById('close-post');
    postHideButton.addEventListener('click', hidePost);
 
    /* 
    var modalAcceptButton = document.getElementById('modal-accept');
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  
    var modalHideButtons = document.getElementsByClassName('modal-hide-button');
    for (var i = 0; i < modalHideButtons.length; i++) {
      modalHideButtons[i].addEventListener('click', hideModal);
    }

    */
});

/* Create Action */

