$(document).ready(function(){if(localStorage.theme) {$('body').addClass( localStorage.theme );} else{$('body').addClass('dark-mode');}$(".moodToggler").click(function(){if ($('body').hasClass( 'light-mode')){$('body').removeClass('light-mode').addClass('dark-mode');localStorage.theme = 'dark-mode';} else  {$('body').removeClass('dark-mode').addClass('light-mode');localStorage.theme = 'light-mode';}});const indicator = document.querySelector('.nav-indicator');const items = document.querySelectorAll('.nav-item');function handleIndicator(el) {items.forEach(item => {item.classList.remove('is-active');item.removeAttribute('style');});indicator.style.width = `${el.offsetWidth}px`;indicator.style.left = `${el.offsetLeft}px`;indicator.style.backgroundColor = el.getAttribute('active-color');el.classList.add('is-active');el.style.color = el.getAttribute('active-color');}items.forEach((item, index) => {item.addEventListener('click', e => {handleIndicator(e.target);});item.classList.contains('is-active') && handleIndicator(item);});function onReady(callback) {var intervalId = window.setInterval(function() {if (document.getElementsByTagName('body')[0] !== undefined) {window.clearInterval(intervalId);callback.call(this);}}, 1000);}function setVisible(selector, visible) {document.querySelector(selector).style.display = visible ? 'block' : 'none';}onReady(function() {setVisible('.app', true);setVisible('#loading', false);});$("#searchInput").on("keyup", function() {var value = this.value.toLowerCase().trim();$("#countryData tr").show().filter(function() {return $(this).text().toLowerCase().trim().indexOf(value) == -1;}).hide();});$('.goBack').click(function(){parent.history.back();return false;});});