"use strict";

window.addEventListener("DOMContentLoaded", function () {
  //tiny-slider
  const slider = tns({
    container: ".carousel__inner",
    items: 1,
    slideBy: "page",
    controls: false,
    controlsText: [
      "<img src = '../img/slider/button_prev.png'",
      "<img src = '../img/slider/button_next.png'",
    ],
    speed: 1000,
    nav: false,
  });

  document.querySelector(".next-btn").addEventListener("click", function () {
    slider.goTo("next");
  });

  document.querySelector(".prev-btn").addEventListener("click", function () {
    slider.goTo("prev");
  });

  //tabs код из https://denis-creative.com/jquery-tabs/
  $(".catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
    $(this)
      .addClass("catalog__tab_active")
      .siblings()
      .removeClass("catalog__tab_active")
      .closest(".container")
      .find(".catalog__content")
      .removeClass("catalog__content_active")
      .eq($(this).index())
      .addClass("catalog__content_active");
  });

  //Отображение информации в элементах табов
  const link = document.querySelectorAll(".catalog-item__link"),
    back = document.querySelectorAll(".catalog-item__back"),
    list = document.querySelectorAll(".catalog-item__list-wrapper"),
    content = document.querySelectorAll(".catalog-item__content");

  link.forEach(function (item, i) {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      content[i].classList.remove("catalog-item__content_active");
      list[i].classList.add("catalog-item__list-wrapper_active");
    });
  });

  back.forEach(function (item, i) {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      list[i].classList.remove("catalog-item__list-wrapper_active");
      content[i].classList.add("catalog-item__content_active");
    });
  });

  //Скрытие и показ
  const showMore = document.querySelector(".catalog__link");

  // модальные окна
  const btnConsult = document.querySelectorAll("[data-modal = 'consultation']"),
    btnOrder = document.querySelector("[data-modal = 'order']"),
    modalConsult = document.querySelector("#consultation"),
    Overlay = document.querySelector(".overlay"),
    subtitle = document.querySelectorAll(".catalog-item__subtitle"),
    modalOrder = document.querySelector("#order");

  btnOrder.addEventListener("click", (e) => {
    e.preventDefault();
    showModal(modalConsult);
  });

  document.querySelectorAll(".button_mini").forEach((item, i) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      console.log();
      document.querySelector("#order .modal__descr").textContent =
        subtitle[i].textContent;
      showModal(modalOrder);
    });
  });

  btnConsult.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      showModal(modalConsult);
    });
  });

  document.querySelectorAll(".modal__close").forEach((item) => {
    item.addEventListener("click", () => {
      hideModal(modalConsult);
      hideModal(modalOrder);
    });
  });

  function showModal(modal, overlay = Overlay) {
    overlay.style.display = "block";
    modal.style.display = "block";
    document.body.style.cssText = `overflow:hidden; 
    padding-right:${calcScrollbarWidth()}px;`;
  }

  function hideModal(modal, overlay = Overlay) {
    overlay.style.display = "none";
    modal.style.display = "none";
    document.body.style.cssText = `overflow:auto; 
    padding-right:0px`;
  }

  function calcScrollbarWidth() {
    let div = document.createElement('div');
    div.style.cssText = "width:100px; hieght:100px; overflow:scroll;";
    document.body.append(div);
  
    let scrollbarWidth = div.offsetWidth - div.clientWidth;
  
    div.remove();
  
    return scrollbarWidth;
  }

  // Валидация
  validateForm("#order form");
  validateForm("#consultation-form");
  validateForm("#consultation form");
  function validateForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Позжалуйста укажите ваше имя",
          minlength: jQuery.validator.format(
            "Имя должно иметь как минимум {0} символа!"
          ),
        },
        phone: "Позжалуйста укажите ваш телефон",
        email: {
          required: "Позжалуйста укажите вашу почту",
          email: "Ваш email должен иметь формат name@domain.com",
        },
      },
    });
  }

  //Mask
  $("[name = 'phone']").mask("+7 (999) 999-9999");

  //form - код Ивана Петриченко
  document.querySelectorAll('.feed-form').forEach((item) => {
    item.addEventListener("submit", function(e) {
      e.preventDefault();

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize() //this это форма 
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');//все формы обновляются  
      });

      return false;
    });
  });

  //scroll - код Ивана Петриченко
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href^='#']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  //wow
  new WOW().init();
});
