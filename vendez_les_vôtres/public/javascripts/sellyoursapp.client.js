let userId;
let goodsToBuy;
let goodsToSell;
let username;
let title;
let form;
const setup = () => {
  username = document.getElementById('username');
  getUser();
  document.getElementById('update').addEventListener('click', update);
  document.getElementById('logout').addEventListener('click', logout);
  form = document.getElementById("form");


  title = document.getElementById("title");
  price = document.getElementById("price");
  document.getElementById("create").addEventListener("click",createGood);
  displayGoods();
}
window.addEventListener('DOMContentLoaded', setup);

const update =  async () => {
  const userData = { name : username.value };
  const body = JSON.stringify(userData);
  const requestOptions = {
                         method :'PUT',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch('/user/me', requestOptions);
  if (response.ok) {
    const updatedUser = await response.json();
    console.log(`user updated : ${JSON.stringify(updatedUser)}`);
  }
  else {
    const error = await response.json();
    handleError(error);
  }
}
const logout = async () => {
  const requestOptions = {
                         method :'GET',
                       };
  const response = await fetch(`/access/logout`, requestOptions);
  if (response.ok) {
    window.location.href= '/';
  }
}

const handleError = error => {
  if (error.redirectTo)
    window.location.href= error.redirectTo;
  else
    console.log(`erreur : ${error.message}`);
}
/*************************************************************************************** */
/************************************************************************** */
const displayGoods = async ()=> {
  const requestOptions = {
    method : "GET",
  };
  const response = await fetch("/user/goods", requestOptions);
  const user = await fetch("/user/me", requestOptions);
  if(response.ok) {
    const allGoods = await response.json();
    const userId = await user.json();
    goodsToSell = allGoods.filter((el) => el.user === userId.id);
    goodsToBuy = allGoods.filter((el) => el.user != userId.id);

   for (index in goodsToSell){
     document.getElementById("goodslistSell").innerHTML += `<li>OBJECT:${allGoods[index].title} - PRICE: ${allGoods[index].price}</li>`;
   }

   for (index in goodsToBuy){
    document.getElementById("goodslistBuy").innerHTML += `<li>OBJECT:${allGoods[index].title} - PRICE: ${allGoods[index].price}<button id="buy" value=${goodId}>Buy</button></li>`;
  } 
}
  else {
    const error = await response.json();
    console.log(`erreur : ${error.message}`);
  }
  };
  const BuyGoods = async ()=> {
    const requestOptions = {
      method: "GET",

    };
};

const getGood =
    async goodId => {
      const requestOptions = {
                               method :'GET'
                             };
      const response = await fetch(`/goods/getGood`, requestOptions)
      const good = await response.json()
      JSONanswer.textContent = JSON.stringify(good);
      window.setTimeout( updateTable, DELAY_BEFORE_REFRESHING);
    }
    const createGood =
    async () => {
      const newGoodData = { description : 'New description', price : 100 };
      const body = JSON.stringify(newGoodData);
      let requestOptions = {
                             method :'POST',
                             headers : { "Content-Type": "application/json" },
                             body : body
                           };
      const response = await fetch(`/goods/createGood`, requestOptions);
      const createdGood = await response.json();
      console.log(createdGood);
    }

    const ADDED_CHAR = '\u2605\u2605\u2605';
    // fetch PUT to update one good with given good id
    const updateGood =
        async good => {
          const newdescription = good.description.endsWith(ADDED_CHAR) ? good.description.slice(0, -ADDED_CHAR.length) : good.description+ADDED_CHAR; // add or remove ADDED_CHAR to good.description
          const newGoodData = { ...good,  description : newdescription };   // update description good object
          const body = JSON.stringify(newGoodData);
          const requestOptions = {
                                   method :'PUT',
                                   headers : { "Content-Type": "application/json" },
                                   body : body
                                  };
          const response = await fetch(`${good._id}`, requestOptions);
          const updatedGood = await response.json();
          console.log(updatedGood);
        }
    
    // fetch DELETE to delete one good with given good id
    const deleteGood =
        async (goodId, button) => {
          const requestOptions = {
                                   method :'DELETE'
                                 };
          const response = await fetch(`${goodId}`, requestOptions);
          const received = await response.json();
          //JSONanswer.textContent = JSON.stringify(received);
          console.log(received);
      
        }
    

