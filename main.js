const findMaxWord = (data) => {
  let maxWord,
    count = 0,
    maxCount = 0;
  
  for (let i = 0; i < 99; i++) {
    if (data[i] === data[i + 1]) {
      count++;
    } else {
      if (maxCount < count) {
        maxCount = count;
        maxWord = data[i - 1];
      }
      count = 0;
    }
  }
  console.log(maxWord);
  return maxWord;
};
  
const getData = async () => {
  let maxWord, xAssignmentId;
  try {
    await fetch(
      "https://one00x-data-analysis.onrender.com/assignment?email=aryanchopra989@gmail.com"
    )
      .then((response) => {
        if (response.ok) {
          console.log("Call Successful.");
          xAssignmentId = response.headers.get("x-assignment-id");
          return response.json();
        } else {
          console.error("Call Not Successful");
          throw Error;
        }
      })
      .then((data) => {
        data.sort();
        maxWord = findMaxWord(data);
      });
    return { assignment_id: `${xAssignmentId}`, answer: `${maxWord}` };
  } catch (error) {
    console.log("API not working.");
  }
};
  
const postData = async (result) => {
  await fetch(
    "https://one00x-data-analysis.onrender.com/assignment?email=aryanchopra989@gmail.com",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse response as JSON
      } else {
        throw new Error("Response posting failed"); // Handle failure
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      // Handle error
      console.log(`Error: ${error.message}`);
    });
};
  
const getThenPost = async () => {
  let result = await getData();
  console.log(result);
  await postData(result);
};
  
getThenPost();