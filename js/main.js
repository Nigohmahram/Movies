window.addEventListener('DOMContentLoaded', () => {

     const tabsParent = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          loader = document.querySelector('.loader');
     //LOADER
     setTimeout(() => {
          loader.style.opacity = '0';//1[element]
          setTimeout(() => {
               loader.style.display = 'none';//2[element]
          }, 500); //1[element] ekranda yo'qolishda ishlamoqda
     }, 2000);//2[element] ekranda yurayotganda ishlavotti

     //TABS
     //  function hiteTabContent () {//Olib tashlovchi funksiya
     //      tabsContent.forEach ((item) => {//Bizga ekrandagi keyinroq chiqishi kerakbo'lgan contentlarni uchirib tashlaydi
     //           item.style.display = 'none';//Real loyihalarda asosan class berish orqali qilinadi
     //      });
     function hiteTabContent() {
          tabsContent.forEach((item) => {//Real loyihaga shunday qilib class berish orqali qilinadi
               item.classList.add('hide');//Real loyihalarda asosan class berish orqali qilinadi
               item.classList.remove('show', 'fade');
          });

          tabs.forEach((item) => {
               item.classList.remove('tabheader__item_active');//active bo'lip turgan klasni olib tashlaydi
          });
     }
     function showTabContent(i = 0) {//qo'shib beruvchi funksiya
          tabsContent[i].classList.add('show', 'fade');
          tabsContent[i].classList.remove('hide');//Bu bizga faqat bitta elamentni ko'rsatib beradi
          tabs[i].classList.add('tabheader__item_active');
     }

     hiteTabContent();
     showTabContent();


     tabsParent.addEventListener('click', (event) => {
          const target = event.target;
          if (target && target.classList.contains('tabheader__item')) {
               tabs.forEach((item, idx) => {
                    if (target == item) {
                         hiteTabContent();
                         showTabContent(idx);
                    }
               });
          }
     });

     //TIMER

     const deadline = '2023-03-10';//aksiya tugashi kerak bo'lgan kun

     function getTimeRemaining(endtime) {
          let days, hours, minutes, seconds;
          const timer = Date.parse(endtime) - Date.parse(new Date());//aksiya tugash vaqtidan bugungi sanani ayirilmoqda va qoldiq timerga yuklanadi [perse] bu secondlarigacha maydalab beradi

          if (timer <= 0) {
               days = 0;
               hours = 0;
               minutes = 0;
               seconds = 0;
          } else {
               days = Math.floor(timer / (1000 * 60 * 60 * 24));//kunni chiqarib olish bu yerda Math aniq hisoblovchi matematika
               hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
               minutes = Math.floor((timer / 1000 / 60) % 60);
               seconds = Math.floor((timer / 1000) % 60);
          }



          return { timer, days, hours, minutes, seconds };
     }
     function getZero(num) {
          if (num >= 0 && num < 10) {
               return `0${num}`;
          } else {
               return num;
          }
     }

     function setClock(selector, endtime) {
          const timer = document.querySelector(selector),
               days = timer.querySelector('#days'),
               hours = timer.querySelector('#hours'),
               minutes = timer.querySelector('#minutes'),
               seconds = timer.querySelector('#seconds'),
               timeInterval = setInterval(updatClock, 1000);

          updatClock();



          function updatClock() {
               const t = getTimeRemaining(endtime);

               days.innerHTML = getZero(t.days);
               hours.innerHTML = getZero(t.hours);
               minutes.innerHTML = getZero(t.minutes);
               seconds.innerHTML = getZero(t.seconds);

               if (t.timer <= 0) {
                    clearInterval(timeInterval);
               }
          }
     }
     setClock('.timer', deadline);

     ///Modal oyna
     // Modal
     const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

     function closeModal() {
          modal.classList.add('hide');
          modal.classList.remove('show');
          document.body.style.overflow = '';
     }

     function openModal() {
          modal.classList.add('show');
          modal.classList.remove('hide');
          document.body.style.overflow = 'hidden';
          clearInterval(modalTimerId);
     }

     modalTrigger.forEach((item) => {
          item.addEventListener('click', openModal);
     });

     modalCloseBtn.addEventListener('click', closeModal);

     modal.addEventListener('click', (e) => {
          if (e.target == modal) {
               closeModal();
          }
     });

     document.addEventListener('keydown', (e) => {
          if (e.code === 'Escape' && modal.classList.contains('show')) {
               closeModal();
          } else if (e.code === 'Enter' && modal.classList.contains('show')) {
               closeModal();
          }
     });
     const modalTimerId = setTimeout(openModal, 5000);
     // console.log(window.pageYOffset);
     // console.log(document.documentElement.clientWidth);//displayning enini aniqlash
     // console.log(document.documentElement.clientHeight);//displayning client ko'radigan qismini aniqlash
     // console.log(window.pageYOffset + document.documentElement.clientHeight);//displayni bo'yini boshidan ohirigacha tushadigan qismini aniqlash
     function showModalByScroll() {
          if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight
          ){
               openModal();
               window.removeEventListener('scroll', showModalByScroll);
          }
     }
     window.addEventListener('scroll', showModalByScroll);

     //#50. Loyiha class
     //Class
     class MenuCard{
          constructor(src, alt, title, descr, price, parentSelector) {
               this.src = src;
               this.alt = alt;
               this.title = title;
               this.descr = descr;
               this.price = price;
               this.parent = document.querySelector(parentSelector);
               this.transfer = 11000;
               this.changeToUZS();
          }
          changeToUZS() {
               this.price = this.price * this.transfer;
          }
          render() {
               const element = document.createElement('div');

               element.innerHTML = `
               <div class="menu__item">
           <img src=${this.src} alt=${this.alt} />
           <h3 class="menu__item-subtitle">${this.title}</h3>
           <div class="menu__item-descr">${this.descr}</div>
           <div class="menu__item-divider"></div>
           <div class="menu__item-price">
             <div class="menu__item-cost">Price:</div>
             <div class="menu__item-total"><span>${this.price}</span>uzs/month</div>
           </div>
         </div>
               `;
               this.parent.append(element);
          }
     }
     new MenuCard(
          "img/tabs/1.png",
          "useal",
          'Plan "useal"',
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
          10,
          '.menu .container'
     ).render();
     new MenuCard(
          "img/tabs/2.jpg",
          "elite",
          'Plan “Premium”',
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
          15,
          '.menu .container'
     ).render();
     new MenuCard(
          "img/tabs/3.jpg",
          "post",
          'Plan "VIP"',
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus natus nobis minus corporis atque enim vitae, modi eligendi commodi itaque voluptatum ipsum. Nemo reiciendis, id rem dolorum rerum consequuntur eos.",
          20,
          '.menu .container'
     ).render();


     //#56. Ma'lumot yuborish
     //Form

     const forms = document.querySelectorAll('form');

     forms.forEach((form) => {
          postData(form);
     });
     // console.log(forms);

     const msg = {
          loading: 'Loading....',
          success: "Thank's for submitting our form",
          failure: 'Something went wrong',
     };
     function postData(form) {
          form.addEventListener('submit', (e) => {
               e.preventDefault();

               const statusMessage = document.createElement('div');
               statusMessage.textContent = msg.loading;
               form.append(statusMessage);

               const request = new XMLHttpRequest();
               request.open('POST', 'server.php');

               request.setRequestHeader('Content-Type', 'application/json');

               const obj = {};

               const formData = new FormData(form);

               formData.forEach((val, key) => {
                    obj[key] = val;
               });

               const json = JSON.stringify(obj);

               request.send(json);

               request.addEventListener('load', () => {
                    if (request.status == 200) {
                         console.log(request.response);
                         statusMessage.textContent = msg.success;
                         form.reset();
                         setTimeout(() => {
                              statusMessage.remove();
                         }, 2000);
                    } else {
                         statusMessage.textContent = msg.failure;
                    }
               });
          });
     }
});