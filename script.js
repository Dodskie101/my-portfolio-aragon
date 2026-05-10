// Custom cursor
const cur = document.getElementById('cur');
const ring = document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
});

(function animRing(){
  rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button,select').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.style.width='16px';cur.style.height='16px';
    ring.style.width='48px';ring.style.height='48px';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.width='9px';cur.style.height='9px';
    ring.style.width='34px';ring.style.height='34px';
  });
});

// Hide cursor on touch devices
if('ontouchstart' in window){
  document.getElementById('cur').style.display='none';
  document.getElementById('curRing').style.display='none';
}

// Hamburger menu
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click',()=>{
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

function closeMenu(){
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}

document.addEventListener('click',e=>{
  if(!hamburger.contains(e.target)&&!navLinks.contains(e.target)){
    closeMenu();
  }
});

window.addEventListener('scroll',()=>closeMenu());

// Scroll reveal
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target)}
  });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Active nav highlight
const secs = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let current='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-100)current=s.id});
  links.forEach(a=>{
    if(a.classList.contains('nav-cta'))return;
    a.style.color=a.getAttribute('href')==='#'+current?'var(--blue)':'';
  });
});

// Form submit
function submitForm(){
  const fname=document.getElementById('fname').value.trim();
  const email=document.getElementById('email').value.trim();
  const role=document.getElementById('role').value;
  const message=document.getElementById('message').value.trim();
  if(!fname||!email||!role||!message){
    alert('Please fill in all required fields.');return;
  }
  document.getElementById('contactForm').style.opacity='0.3';
  document.getElementById('contactForm').style.pointerEvents='none';
  setTimeout(()=>{
    document.getElementById('contactForm').style.display='none';
    document.getElementById('formSuccess').classList.add('show');
  },500);
}