document.body.style.backgroundImage = 'Url(img/comicBg.png)';

const TOKEN = '1748818695493831';

//huge boxes for upload heroes and for score
const playerOneBox = document.getElementById('playerOneHero');
const playerTwoBox = document.getElementById('playerTwoHero');
const scoreBox = document.getElementById('scoreBoard');

//input boxes for hero name
const inputPlayerOne = document.getElementById('playerOneInput');
const inputPlayerTwo = document.getElementById('playerTwoInput');

//buttons to start proccess
const buttonPlayerOne = document.getElementById('playerOneUpload');
const buttonPlayerTwo = document.getElementById('playerTwoUpload');
const buttonCombat = document.getElementById('combatButton');

//load database => change it to json and render
const loadHero = async(name) =>{
  const response = await fetch(`https://www.superheroapi.com/api.php/${TOKEN}/search/${name}`);
  const data = await response.json();
  return await data
}

//render data on site
const render =async(div, input) =>{
  const data =await loadHero(input.value);
  div.innerHTML = '';
  //error check
  if(data.response == 'error'){
    div.innerHTML ='error!';
    return;
  }

  console.log(data)
  //display stuff on screen
  const pic = `<img src='${data.results[0].image.url}' width=250 height=350/>`;

  const newDivPic = document.createElement('div');
  newDivPic.className = 'newDivPic';
  newDivPic.innerHTML=pic;
  div.appendChild(newDivPic);

  const newDivInfo = document.createElement('div');
  newDivInfo.className = 'newDivInfo';

  newDivInfo.innerHTML = `<span>
    Name: ${data.results[0].name}<br>
    Intelligence: ${data.results[0].powerstats.intelligence} <br>
    Speed: ${data.results[0].powerstats.speed} <br>
    Strength: ${data.results[0].powerstats.strength}
  </span>`;
  div.appendChild(newDivInfo);
}

//func to compare both heroes
const heroCombat = async(div,inputOne, inputTwo) =>{
  const dataPlayerOne =await loadHero(inputOne.value);
  const dataPlayerTwo =await loadHero(inputTwo.value);

  if(dataPlayerOne.response == 'error' || dataPlayerTwo.response == 'error'){
    div.innerHTML ='no data!';
    return;
  }

  let onePoints=0;
  let twoPoints=0;
  const whoWinDiv = document.createElement('div');
  const scoreDiv = document.createElement('div');
  const winnerImgDiv = document.createElement('div');

  whoWinDiv.className = 'centralBoxStuff';
  scoreDiv.className = 'centralBoxStuff';
  winnerImgDiv.className = 'centralBoxStuff';

//conditions checking which hero has better stats
  if(dataPlayerOne.results[0].powerstats.intelligence>dataPlayerTwo.results[0].powerstats.intelligence){
    onePoints++;
  } else if(dataPlayerOne.results[0].powerstats.intelligence<dataPlayerTwo.results[0].powerstats.intelligence){
    twoPoints++;
  } else{
    console.log('remis');
  }

  if(dataPlayerOne.results[0].powerstats.speed>dataPlayerTwo.results[0].powerstats.speed){
    onePoints++;
  } else if(dataPlayerOne.results[0].powerstats.speed<dataPlayerTwo.results[0].powerstats.speed){
    twoPoints++;
  } else{
    console.log('remis');
  }

  if(dataPlayerOne.results[0].powerstats.strength>dataPlayerTwo.results[0].powerstats.strength){
    onePoints++;
  } else if(dataPlayerOne.results[0].powerstats.strength<dataPlayerTwo.results[0].powerstats.strength){
    twoPoints++;
  } else{
    console.log('remis');
  }

  //display winner
  if(onePoints>twoPoints){
    whoWinDiv.innerHTML=`${dataPlayerOne.results[0].name} wins!`;
    scoreDiv.innerHTML=`${onePoints} : ${twoPoints}`;
    const winnerPic = `<img src='${dataPlayerOne.results[0].image.url}' width=200 height=300/>`;
    winnerImgDiv.innerHTML = winnerPic;
  }else if(onePoints<twoPoints){
    whoWinDiv.innerHTML=`${dataPlayerTwo.results[0].name} wins!`;
    scoreDiv.innerHTML=`${onePoints} : ${twoPoints}`;
    const winnerPic = `<img src='${dataPlayerTwo.results[0].image.url}' width=200 height=300 style="border: 5px solid green;"/>`;
    winnerImgDiv.innerHTML = winnerPic;
  }
  else{
    whoWinDiv.innerHTML='Draw!';
    scoreDiv.innerHTML=`${onePoints} : ${twoPoints}`;
    //const winnerPic = `<img src='${dataPlayerTwo.results[0].image.url}' width=150 height=250/>`;
   // winnerImgDiv.innerHTML = winnerPic;
  }

  div.innerHTML='';
  div.appendChild(whoWinDiv);
  div.appendChild(scoreDiv);
  div.appendChild(winnerImgDiv);
}

//add func to buttons
buttonPlayerOne.onclick = () => render(playerOneBox, inputPlayerOne);
buttonPlayerTwo.onclick = () => render(playerTwoBox, inputPlayerTwo);
buttonCombat.onclick = () => heroCombat(scoreBox, inputPlayerOne, inputPlayerTwo);