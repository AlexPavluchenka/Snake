let rickroll;

function playRick()
{
    if(!rickroll) rickroll = document.getElementById('rickroll');
    rickroll.style.display = 'block';
    rickroll.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

function closeRick()
{
    if(!rickroll) rickroll = document.getElementById('rickroll');
    rickroll.style.display = 'none';
    rickroll.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
}