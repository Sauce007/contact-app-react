async function fetchAPI(url, method="GET", sendData=null) {
    const fetchOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhdWNlMDA3IiwiaWF0IjoxNjA2MDczMjU2LCJleHAiOjE2MDY2NzgwNTZ9.c4yD6Onw7KskEKWPF33spWw8gEdtDN-JUKUWrg3CdtI'
      }
    };
  
    if (sendData) {
      fetchOptions.body = JSON.stringify(sendData);
    }
  
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
  
    return data;
  }

  export default fetchAPI;