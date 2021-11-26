function CircleProgress(idPercentNode, ms, maxPercent) {
   this.itemNode = document.querySelector(idPercentNode);
   this.percentNode = this.itemNode.querySelector('#item__percent');
   this.progressNode = this.itemNode.querySelector('#item__circle');
   this.ms = ms;
   this.maxPercent = maxPercent;
}

function loader(obj) {
   const ms = Math.floor(obj.ms / obj.maxPercent);
   let percent = 0;
   const objPropertyCSS = window.getComputedStyle(obj.progressNode);
   const valueStrokeDashoffset = objPropertyCSS.getPropertyValue('stroke-dashoffset');
   const persentOffSet = Math.floor(parseInt(valueStrokeDashoffset) * (100 - obj.maxPercent) / 100);
   obj.progressNode.animate({
      strokeDashoffset: `${persentOffSet}`
   }, {
      duration: obj.ms, fill: 'forwards', easing: 'linear'
   });
   setInterval(() => {
      if (percent === obj.maxPercent) {
         clearInterval();
      } else {
         percent++;
         obj.percentNode.innerText = percent + '%';
      }
   }, ms);
}

let nameUser = prompt('Chúng mình sẽ cho bạn 1 điều bất ngờ, nếu bạn muốn nhận nó thì hãy nhập tên vào ô dưới đây và ấn Ok nhé 😉😉😉');

document.body.innerHTML = `
<div class="hidden" id="emoji" style="width:300px;height:0;position:fixed; top: 0%; left: 0;"><iframe
         src="https://giphy.com/embed/NvbLKHpMzJmxKU7vNV" width="300px" height="300px" style="position:absolute"
         frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
   <h1 id="heading" class="heading">Chúng mình đang tải dữ liệu, bạn <span id="nameUser"></span> dễ thương vui lòng đợi
      một tí nhé
      😊😊😊.</h1>
   <div id="item-0" class="item" data-maxPersont="75">
      <div class="item__outer">
         <div class="item__inner">
            <div class="item__content">
               <p id="item__percent" class="item__percent">100%</p>
            </div>
         </div>
      </div>
      <svg class="item__svg">
         <circle id="item__circle" class="item__circle" cx="50%" cy="50%" r="90"></circle>
      </svg>
   </div>
   <h2 id="text"></h2>
`;

if (!nameUser) {
   nameUser = 'thân mến';
}
document.getElementById('nameUser').innerText = nameUser;

const item1 = new CircleProgress('#item-0', 10000, 100);

loader(item1);
const text = `Ở đây mình ko có gì ngoài câu nói: Hãy cố gắn lên nhé, I love you ❤️`;
const textArray = text.split(' ');

const textNode = document.getElementById('text');
let i = 0;
setTimeout(() => {
   document.getElementById('heading').innerText = 'Đã tải xong rồi nè 😋';
   const myInterval = setInterval(() => {
      const newNode = document.createElement('span');
      newNode.innerText = textArray[i++] + ' ';
      textNode.appendChild(newNode);
      if (i >= textArray.length) {
         clearInterval(myInterval);
      }
   }, 600);
   setTimeout(() => {
      document.getElementById('emoji').classList.remove('hidden');
   }, 600 * textArray.length);
}, 10000);
