// ===== MOBILE NAV =====
function toggleMobileNav(){
  document.querySelector('.burger').classList.toggle('open');
  document.getElementById('mobileNav').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileNav').classList.contains('open') ? 'hidden' : '';
}
function closeMobileNav(){
  document.querySelector('.burger').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== CHAT =====
const chatKB = [
  { keys:['price','cost','how much','rates','pricing','quote','euro'], reply:'Our combo units start from <strong>&euro;200</strong> and obstacle courses range from <strong>&euro;280-&euro;300</strong>. Book 2 days in a row and the 2nd day is just <strong>&euro;30 extra</strong>! Call 087 101 9000 for a quote.' },
  { keys:['hour','open','when','available','time'], reply:'We\'re open <strong>7 days a week from 8am to 7pm</strong>. Call 087 101 9000 or WhatsApp us anytime!' },
  { keys:['book','reserve','appointment','schedule','hire'], reply:'You can book online via the <a href="/book/" style="color:var(--orange);font-weight:700">Book Now</a> page, call 087 101 9000, or WhatsApp us.' },
  { keys:['area','deliver','location','where','cover','galway'], reply:'We cover <strong>Galway City &amp; County</strong> - Oranmore, Claregalway, Tuam, Headford, Annaghdown, Carnmore, Maree and more. See the <a href="/areas/" style="color:var(--orange);font-weight:700">Areas</a> page.' },
  { keys:['cancel','refund','policy'], reply:'Cancellations are <strong>free of charge</strong> with 24 hours notice. No hassle.' },
  { keys:['rain','wet','weather','bad'], reply:'Most of our castles come with <strong>rain covers</strong>! You can also add a marquee for extra shelter.' },
  { keys:['insurance','insured','liability'], reply:'Our PL insurance has expired and it\'s currently not possible for any bouncy castle company in Ireland to obtain it. Hire is at your own risk. Industry efforts are underway.' },
  { keys:['setup','set up','install','electric','power','plug'], reply:'We deliver, set up and collect. All we need is level ground and a regular electrical socket. Setup takes 15-20 minutes.' },
  { keys:['obstacle','course','slide','combo','castle','marquee','gazebo'], reply:'We have 14 obstacle courses, high slides, combo units (Paw Patrol, Peppa Pig, Princess, LOL Dolls, John Deere), plus marquees &amp; gazebos. See them all on <a href="/category/obstacle-courses/" style="color:var(--orange);font-weight:700">our castles</a> page.' },
  { keys:['birthday','communion','confirmation','party','event','corporate','camp','school'], reply:'We cover birthdays, communions, confirmations, corporate events, summer camps, BBQs, school and community events.' },
  { keys:['contact','phone','email','call','whatsapp','reach'], reply:'&#128222; 087 101 9000<br>&#128172; <a href="https://wa.me/+353871019000" target="_blank" style="color:var(--orange);font-weight:700">WhatsApp us</a><br>&#9993;&#65039; galwaybouncingcastles@gmail.com' }
];
function toggleChat(){ document.getElementById('chatWindow').classList.toggle('open'); }
function sendChat(){
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if(!msg) return;
  const body = document.getElementById('chatBody');
  body.innerHTML += '<div style="padding:10px 14px;border-radius:16px 16px 4px 16px;background:#e8f0fe;font-size:.9rem;margin-bottom:10px;text-align:right;max-width:80%;margin-left:auto">' + msg.replace(/</g,'&lt;') + '</div>';
  input.value = '';
  body.scrollTop = body.scrollHeight;
  const lower = msg.toLowerCase();
  let match = null;
  for(const kb of chatKB){
    for(const k of kb.keys){
      const re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '\\b','i');
      if(re.test(lower)){ match = kb; break; }
    }
    if(match) break;
  }
  setTimeout(() => {
    const reply = match ? match.reply : 'Thanks for your message! For the fastest response, call <strong>087 101 9000</strong> or <a href="https://wa.me/+353871019000?text=' + encodeURIComponent('Hi, I saw your website and had a question: ' + msg) + '" target="_blank" style="color:var(--orange);font-weight:700">WhatsApp us</a>.';
    body.innerHTML += '<div class="chat-bubble">' + reply + '</div>';
    body.scrollTop = body.scrollHeight;
  }, 600);
}
function quickChat(msg){
  document.getElementById('chatInput').value = msg;
  sendChat();
}

// ===== AREA CHECKER =====
function checkArea(){
  const select = document.getElementById('areaSelect');
  const val = select.value;
  const result = document.getElementById('areaResult');
  if(!result) return;
  const chipsContainer = document.getElementById('areaChips');
  if(chipsContainer) chipsContainer.querySelectorAll('.area-chip').forEach(c => c.classList.remove('highlight'));
  if(!val){ alert('Please select an area.'); return; }
  result.className = 'area-checker-result show';
  if(val === 'other'){
    result.className += ' maybe';
    result.innerHTML = '<strong>&#128222; Give us a call!</strong><br>Your area may still be covered. Call <a href="tel:0871019000" style="color:inherit;font-weight:700">087 101 9000</a> or <a href="https://wa.me/+353871019000" target="_blank" style="color:inherit;font-weight:700">WhatsApp us</a>.';
  } else {
    result.className += ' yes';
    result.innerHTML = '<strong>&#9989; Great news!</strong> We deliver to <strong>' + select.selectedOptions[0].text + '</strong>. <a href="/book/" style="color:inherit;font-weight:700">Book your hire now &rarr;</a>';
    if(chipsContainer){
      chipsContainer.querySelectorAll('.area-chip').forEach(c => {
        if(c.dataset.area === val) c.classList.add('highlight');
      });
    }
  }
}

// ===== WEATHER CHECKER =====
function checkWeather(){
  const dateVal = document.getElementById('weatherDate').value;
  if(!dateVal){ alert('Please pick a date.'); return; }
  const d = new Date(dateVal + 'T12:00');
  const fmtOpts = {weekday:'long', day:'numeric', month:'long'};
  const dateFmt = d.toLocaleDateString('en-IE', fmtOpts);
  const forecasts = [
    {icon:'\u2600\uFE0F', label:'Sunny', temp:'18\u00B0C', desc:'Clear skies with light breeze', tip:'good', tipText:'\u2705 Perfect bouncing weather! No rain cover needed.'},
    {icon:'\u26C5', label:'Partly Cloudy', temp:'15\u00B0C', desc:'Mix of cloud and sunshine, dry', tip:'good', tipText:'\u2705 Great party weather! Should stay dry all day.'},
    {icon:'\uD83C\uDF24\uFE0F', label:'Mostly Sunny', temp:'17\u00B0C', desc:'Warm with occasional clouds', tip:'good', tipText:'\u2705 Lovely day for a party! Sun cream recommended.'},
    {icon:'\uD83C\uDF25\uFE0F', label:'Overcast', temp:'13\u00B0C', desc:'Cloudy but dry, mild temperatures', tip:'ok', tipText:'\uD83D\uDCA1 Dry but cloudy. A marquee would add comfort.'},
    {icon:'\uD83C\uDF27\uFE0F', label:'Light Showers', temp:'12\u00B0C', desc:'Scattered showers expected', tip:'ok', tipText:'\uD83D\uDCA1 Light rain possible. Our combo units and obstacle courses have rain covers!'},
    {icon:'\uD83C\uDF27\uFE0F', label:'Rainy', temp:'10\u00B0C', desc:'Persistent rain throughout the day', tip:'rain', tipText:'\u2614 Rain expected. Don\'t worry, our enclosed castles have rain covers. Add a marquee for extra shelter!'}
  ];
  const hash = (d.getDate() * 7 + d.getMonth() * 13) % forecasts.length;
  const f = forecasts[hash];
  const result = document.getElementById('weatherResult');
  result.className = 'weather-result show';
  result.innerHTML = '<div class="weather-row"><div class="weather-icon">' + f.icon + '</div><div class="weather-info"><h4>' + dateFmt + '</h4><p>' + f.label + ' &middot; ' + f.temp + '</p><p>' + f.desc + '</p></div></div><div class="weather-tip ' + f.tip + '">' + f.tipText + '</div>';
}

// ===== ACCORDION =====
function toggleAccordion(btn){
  const item = btn.closest('.accordion-item');
  const wasOpen = item.classList.contains('open');
  item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
  if(!wasOpen) item.classList.add('open');
}

// ===== SHOW MORE =====
function toggleShowMore(btn, gridId){
  const grid = document.getElementById(gridId);
  const isExpanded = grid.classList.toggle('expanded');
  grid.classList.toggle('capped', !isExpanded);
  btn.querySelector('.label').textContent = isExpanded ? 'Show fewer' : 'Show all';
  btn.classList.toggle('flipped', isExpanded);
}

// ===== ON LOAD =====
window.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav based on path
  const path = location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if(!href) return;
    if(href === '/' && path === '/'){ link.classList.add('active'); }
    else if(href !== '/' && path.startsWith(href)){ link.classList.add('active'); }
  });

  // Date min for booking/weather inputs
  const todayStr = new Date().toISOString().split('T')[0];
  const sd = document.getElementById('startDate');
  const ed = document.getElementById('endDate');
  const wd = document.getElementById('weatherDate');
  if(sd){
    sd.min = todayStr; ed.min = todayStr;
    sd.addEventListener('change', function(){
      ed.min = this.value;
      if(!ed.value || ed.value < this.value) ed.value = this.value;
    });
  }
  if(wd) wd.min = todayStr;

  // Scroll reveal
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity .55s ease, transform .55s cubic-bezier(.34,1.56,.64,1)';
      io.observe(el);
    });
  }
});
