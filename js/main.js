fetch(`https://65bdc551b51f9b29e933ab2f.mockapi.io/car/car`)
.then((res)=> res.json())
.then((data)=>  Data(data))
let List = document.querySelector(".list")

function Data(data) {
window.localStorage.setItem('data', JSON.stringify(data))
    data.map((item)=>{
        let newLi = document.createElement('li')
        newLi.className  = 'item'
        newLi.innerHTML =`
        <div class=" kard card" style="width: 18rem;">
  <img src="${item.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">${item.price}</p>
    <p class="card-text">${item.engine}</p>
    <a href="#" class="btn btn-success">More see..</a>
    <button onclick ="getId(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary" ><i class="bi bi-pen"></i></button>
    <button onclick ="carDel(${item.id})"  class="btn btn-danger" ><i class="bi bi-trash"></i></button>
  </div>
</div>
        `
        List.appendChild(newLi)
    })
}

function carPost(event) {

    event.preventDefault()
    let  carName = event.target.name.value
    let carImage = event.target.image.value
    let carPrice = event.target.price.value
    let carEngine = event.target.engine.value
    let data = {
        name: carName,
        image: carImage,
        price:carPrice,
        engine: carEngine
    }
    console.log(data);

    fetch(`https://65bdc551b51f9b29e933ab2f.mockapi.io/car/car`,{
       method:"POST",
    headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
.then((res)=>{
    console.log(res);
    return  res.json()
})
.then((data)=>console.log(data))
.then(()=>{
     event.target.name.value = ''
    event.target.image.value = ''
      event.target.price.value = ''
      event.target.engine.value  = ''
})

}


function carUpDate(event) {
    console.log(event);
    
    event.preventDefault()
    let  carName = event.target.name.value
    let carImage = event.target.image.value
    let carPrice = event.target.price.value
    let carEngine = event.target.engine.value
    let data = {
        name: carName,
        image: carImage,
        price:carPrice,
        engine: carEngine
    }
    console.log(data);

    fetch(`https://65bdc551b51f9b29e933ab2f.mockapi.io/car/car/${window.localStorage.getItem('id')}`,{
       method:"PUT",
    headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
.then((res)=>{
    console.log(res);
    return  res.json()
})
.then((data)=>console.log(data))
.then(()=>{
     event.target.name.value = ''
    event.target.image.value = ''
      event.target.price.value = ''
      event.target.engine.value  = ''
})

}

let elName = document.querySelector('.up__name')
let elImage = document.querySelector('.up__image')
let elPrice = document.querySelector('.up__price')
let elEngine = document.querySelector('.up__engine')


function getId(id) {
    let data = JSON.parse(window.localStorage.getItem('data')).find((item)=> item.id == id)
  elName.value = data.name
  elImage.value = data.image
  elPrice.value = data.price
  elEngine.value = data.engine
    window.localStorage.setItem('id', id)
}

function carDel(id) {
    fetch(`https://65bdc551b51f9b29e933ab2f.mockapi.io/car/car/${id}`,{
        method:"DELETE",
     headers:{
             'Content-Type':'application/json'
         },
     })
 .then((res)=>{
     console.log(res);
     return  res.json()
 })
 .then((data)=>console.log(data))
}