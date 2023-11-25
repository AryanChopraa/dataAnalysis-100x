let assignmentId = "";
let answer = "";

async function fetchData() {
  const url = `https://one00x-data-analysis.onrender.com/assignment?email=aryanchopra989@gmail.com`;

  try {
    const response = await fetch(url);
    const assignmentId = response.headers.get('X-Assignment-ID');

    if (!assignmentId) {
      console.error('Assignment ID not found in headers.');
      return null;
    }

    const data = await response.json();

    return { assignmentId, data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function count(response) {
  const phraseCounts = {};

  response.forEach((phrase) => {
    if (phraseCounts[phrase]) {
      phraseCounts[phrase]++;
    } else {
      phraseCounts[phrase] = 1;
    }
  });

  let mostUsedPhrase = response[0];
  return mostUsedPhrase;
}

async function submitAnswer(assignmentId, answer) {
  const submitUrl = 'https://one00x-data-analysis.onrender.com/assignment?email=aryanchopra989@gmail.com';

  const requestBody = {
    assignmentId: assignmentId,
    answer: answer,
  };

  try {
    const submitResponse = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const secretCode = await submitResponse.json();
    console.log('Secret Code:', secretCode);

 
  } catch (error) {
    console.error('Error submitting', error);
  }
}

async function main() {
  const data = await fetchData();
  if (!data) {
    return;
  }

  const response = data.data;
  assignmentId = data.assignmentId;
  answer = count(response);

  console.log(answer);
  console.log(assignmentId);

  
  await submitAnswer(assignmentId, answer);
}

main();
