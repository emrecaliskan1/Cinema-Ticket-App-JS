const container = document.querySelector('.container');

const count = document.getElementById('count');

const amount = document.getElementById('amount');

const select = document.getElementById('movie');

const seats = document.querySelectorAll('.seat:not(.reserved');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected'); //varsa siler yoksa ekler
        
        calculateTotal();
    }
})

select.addEventListener('change',function(e){
    calculateTotal();
})


function calculateTotal(){

    const selectedSeats = container.querySelectorAll('.seat.selected'); //seçilen koltukların div listesi

    // console.log(seats);
    // console.log(selectedSeats);

    const selectedSeatsArr = [];

    const seatsArr=[];


    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    })

    //spread

    seats.forEach(function(seat){
        seatsArr.push(seat);
    })

    // [1,3,5,...]  Boş olan koltukların kaçıncı indexi?
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    console.log(selectedSeatIndexs);

    let selectedSeatCount = container.querySelectorAll('.seat.selected').length;
    let price = select.value;
    count.innerText = selectedSeatCount;
    amount.innerText=selectedSeatCount*price;

    saveToLocalStorage(selectedSeatIndexs);
}


function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){  //koltuk bilgilerini dolaş ve seçilmişKoltuklar'a ekle.
            if(selectedSeats.indexOf(index) > -1){ //index arama işlemi
                seat.classList.add('selected');
            }
        })
    }

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex; // sayfa yenilendiğinde son seçtiğin film kalıyor

    }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}