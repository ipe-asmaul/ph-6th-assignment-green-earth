//variable declearation
const categoryContainer = document.getElementById('cat-container');
const postContainer = document.getElementById('post-container');
const cartElementContainer = document.getElementById('cart-items');
//const individualCardBtn = document.querySelectorAll('card-btn');
let allCategory = [];
const cartInfo = [];
// let allData = [];
let postDataUrl = 'https://openapi.programming-hero.com/api/plants';

const loadCategory = async () => {
    const fetchData = await fetch('https://openapi.programming-hero.com/api/categories');
    const res = await fetchData.json();
    allCategory = res['categories'];

    displayCategories();
}

loadCategory();

const displayCategories = () => {
    categoryContainer.innerHTML = "";
    categoryContainer.innerHTML += ` <li class="list-none w-[100%] p-2 cursor-pointer bg-[#15803D] text-white rounded-md font-[500] text-sm cat-btn" data-id="0">All
                                Trees</li>`;
    allCategory.forEach((cat, index) => {
        categoryContainer.innerHTML += `<li class="list-none hover:bg-[#DCFCE7] cursor-pointer rounded-md text-sm p-2 cat-btn" data-id="${cat['id']}">${cat['category_name']}</li>`;
    });
    const allCatBtn = document.querySelectorAll('.cat-btn');
    allCatBtn.forEach((btn, index) => {

        btn.addEventListener('click', (e) => {
            allCatBtn.forEach((classToRemoveBtn) => {
                classToRemoveBtn.classList.remove('bg-[#15803D]', 'text-white')
            })

            e.target.classList.add('bg-[#15803D]', 'text-white');
            const catId = e.target.dataset.id;

            postDataUrl = catId == 0 ? 'https://openapi.programming-hero.com/api/plants' : `https://openapi.programming-hero.com/api/category/${catId}`;
            const catloadData = async () => {
                const fetchData = await fetch(postDataUrl);
                const res = await fetchData.json();
                // allData = res['plants'];
                console.log(res['plants']);
                displayData(res['plants']);

            }
            catloadData();

        })
    })


}

const loadData = async () => {
    const fetchData = await fetch(postDataUrl);
    const res = await fetchData.json();

    //console.log(res['plants']);
    displayData(res['plants']);
}

loadData();
const displayData = (arr) => {
    postContainer.innerHTML = '';
    arr.forEach((post, index) => {
        postContainer.innerHTML += `
                                 <div class="card bg-white rounded-lg p-2 content-center justify-center h-auto" data-id=${post['id']}>
                        <div class="thumbnail w-[100%] h-[250px] bg-[#EDEDED] rounded-lg mb-1">
                            <img src="${post['image']}" class="h-[100%]  rounded-lg"  width="100%" alt="" srcset="">
                        </div>
                        <div class="text-items space-y-3">
                            <h3 class="font-bold text-lg">${post['name']}</h3>
                            <p class="text-gray-500 text-sm">${post['description']}</p>
                            <div class="cat-and-price flex items-center justify-between">
                                <span class="card-category bg-[#DCFCE7] p-2 rounded-4xl text-[#15803D]">${post['category']}</span>
                                <span class="price font-bold">৳${post['price']}</span>
                            </div>
                            <button
                                class="btn bg-[#15803D] w-[100%]  text-white rounded-3xl outline-none border-none shadow-none add-cart-btn">Add
                                to Cart</button>

                        </div>

                    </div>            
            `;



    })

    // const itemsInfo = [];
    const cardBtn = document.querySelectorAll('.add-cart-btn');
    const total = document.getElementById('total');
    

    //console.log(cardBtn);
    cardBtn.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            const dataId = e.target.parentNode.parentNode.dataset.id;
            if (cartInfo.find(el => el.id == dataId)) {
                let item = cartInfo.find(el => el.id == dataId);

                item.count++;
                const countText = document.querySelector(`[cart-data-id="${dataId}"] p`);
                countText.innerText = `৳${item['price']} x ${item.count}`;

            }
            else {
                let itemInfo = {
                    id: dataId,
                    name: arr[index]['name'],
                    price: arr[index]['price'],
                    count: 1

                }

                cartInfo.push(itemInfo);

                cartElementContainer.innerHTML += `<div class="cart-item w-[100%] bg-[#F0FDF4] rounded-lg p-3 flex items-center justify-between" cart-data-id="${dataId}">
                            <div class="text-content-cart">
                                <h3 class="text-sm font-bold">${itemInfo['name']}</h3>
                                <p class="text-gray-500 text-sm">৳${itemInfo['price']} x ${itemInfo.count}</p>
                            </div>
                            <div class="icon-cancel text-gray-500 text-lg cursor-pointer" onclick="deleteCartItem(${dataId},${itemInfo['price']})">X</div>
                        </div>`;
            }
            //console.log(cartInfo);
            let totalPrice = cartInfo.map(item => parseInt(item.price) * parseInt(item.count)).reduce((acc, curr) => acc + curr);
            total.innerText =totalPrice;



        })

    })







}


const deleteCartItem = (catID, price, count) =>{
     const itemIndex = cartInfo.findIndex(item => item.id == catID);
     const parent = document.getElementById('cart-items');
    const total = document.getElementById('total');
    total.innerText = parseInt(total.innerText) - parseInt(price) * parseInt(cartInfo[itemIndex].count);
    removingItem = document.querySelector(`[cart-data-id="${catID}"]`);
   // console.log(removingItem);
   
    parent.removeChild(removingItem);
   
    console.log(cartInfo);
    cartInfo.splice(itemIndex, 1);
    console.log(cartInfo);
    
   

}
//document.getElementById('all-trees').addEventListener('click',loadData);
//window.onload = displayData;

//console.log(document.querySelectorAll('.add-cart-btn'))

//window.onload = displayCategories;
//console.log(allCategory);
   
        
    