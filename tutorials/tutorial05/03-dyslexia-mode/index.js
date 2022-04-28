/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/

const taggle =  document.querySelector("#dyslexia-toggle");

const toggleEventHandler = (ev) =>{
  // alert('hh');
  // console.log("test");

  document.body.classList.toggle("dyslexia-mode");
};

taggle,addEventListener("click", toggleEventHandler);