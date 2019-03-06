var modals = document.getElementsByClassName("modal");

var modal_btns = document.getElementsByClassName("modal_btn");

var close_btns = document.getElementsByClassName("close");

window.onload = function()
{
	for(i = 0; i < modal_btns.length; i++)
	{
		(function(btnIndex){
			modal_btns[btnIndex].onclick = function()
			{
				modals[btnIndex].style.display = "block";
			};
		})(i)		
	}
	
	for(j = 0; j < close_btns.length; j++)
		{
			(function(closeIndex){
				close_btns[closeIndex].onclick = function()
				{
					modals[closeIndex].style.display = "none";
				};
			})(j)
		}
}