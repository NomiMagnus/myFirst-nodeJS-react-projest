


const loginService = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "userName": user.userName,
    "password": user.password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let myUser = await fetch("http://localhost:27017/api/auth/login", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return new Promise((resolve, reject) => {
    resolve({
      loginStatus: myUser !== 'User not allowed!' ? "ok" : "unknown",
      _id: myUser.id,
      name: myUser.name,
      userToken: myUser.userToken,
      role: myUser.role
    });
  });
};

const registerService = async (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "userName": data.userName,
    "password": data.password,
    "firstName": data.firstName,
    "lastName": data.lastName,
    "email": data.email,
    "phone": data.phone
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("http://localhost:27017/api/auth/register", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const AddToCartService = (productId, amount) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "productId": productId,
    "amount": amount
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:27017/api/Cart", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

const getCartsByUserService = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let arrCart = await fetch("http://localhost:27017/api/Cart", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return new Promise((resolve, reject) => {
    resolve({ data: arrCart })
  })
}

const deleteCartProdByIDService = async (_id) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "_id": _id
  });

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  await fetch("http://localhost:27017/api/Cart", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const updateCountService = (productId, amount) => {
  //עדכון הכמות

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "productId": productId,
    "amount": amount
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:27017/api/Cart", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


const addNewProductService = (newProduct) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": newProduct.newName,
    "price": newProduct.newPrice,
    "picture": newProduct.newPicture,
    "ageMatch": newProduct.newAgeMatch,
    "category": newProduct.newCategory,
    "description":newProduct.newDecription,
    "deliverPrice":newProduct.newDeliverPrice
  });



  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:27017/api/Product", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const updateProductService = (product) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var prodToUpdate = JSON.stringify({
    _id: product._id,
    name: product.newName,
    price: product.newPrice,
    picture: product.newPicture,
    ageMatch: product.newAgeMatch,
    category: product.newCategory,
    description: product.newDecription,
    deliverPrice: product.newDeliverPrice
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: prodToUpdate,
    redirect: 'follow'
  };

  fetch("http://localhost:27017/api/Product", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .then(alert(`${product.newName} updated!`))
    .catch(error => console.log('error', error));

}


const DeleteProductService = (productId) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log(productId);
  var raw = JSON.stringify({
    "_id": productId
  });

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:27017/api/Product", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

const getAllProductsService = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const arr = await fetch("http://localhost:27017/api/Product", requestOptions)
    .then(res => res.json())
    .catch(err => console.log('error', err))

  return new Promise((resolve, reject) => {
    resolve({ data: arr })
  })
}

export { loginService, registerService, AddToCartService, getCartsByUserService, deleteCartProdByIDService, updateCountService, addNewProductService, updateProductService, DeleteProductService, getAllProductsService };