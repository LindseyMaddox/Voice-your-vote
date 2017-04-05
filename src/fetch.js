
    fetch('voice-your-vote-llmaddox.c9users.io/api/polls',{
      method: 'post',
      headers: { 'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: 'json=test'}).
    then((response) => { if(response.ok){
    return response.json();
  } throw new Error('Network response was not ok.');
})
.catch((error) =>  { console.log('There has been a problem with your fetch operation: ' + error.message);
 });