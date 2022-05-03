function scrollToPage(target) {
  window.scrollTo({
    top: getPosition(document.querySelector(target)).y,
    behavior: "smooth",
  });
}
function getPosition(element) {
  var x = 0;
  var y = 0;
  while (element) {
    x += element.offsetLeft - element.scrollLeft + element.clientLeft;
    y += element.offsetTop - element.scrollLeft + element.clientTop;
    element = element.offsetParent;
  }

  return { x: x, y: y };
}
var swiper;
window.onload = () => {
  let listButton = document.querySelector("#listButton");
  listButton.addEventListener("click", () => {
    document.querySelector("header nav").classList.toggle("active");
    document
      .querySelector("header nav #listButton div")
      .classList.toggle("active");
  });

  axios.get("./members.json").then((res) => {
    res.data.enforcer.forEach((info) => {
      AddMemberCard(
        {
          className: info.className,
          classImg: info.classImg,
          classColor: info.classColor,
          weapon: info.weapon,
          weaponImg: info.weaponImg,
          equipment: info.equipment,
          equipmentImg: info.equipmentImg,
          tag: info.tag,
          internalStyle: info.internalStyle,
        },
        "memberList-enforcer"
      );
    });
    res.data.support.forEach((info) => {
      AddMemberCard(
        {
          className: info.className,
          classImg: info.classImg,
          classColor: info.classColor,
          weapon: info.weapon,
          weaponImg: info.weaponImg,
          equipment: info.equipment,
          equipmentImg: info.equipmentImg,
          tag: info.tag,
          internalStyle: info.internalStyle,
        },
        "memberList-support"
      );
    });
  });

  swiper = new Swiper(".members", {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      650: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      950: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1500: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      1900: {
        slidesPerView: 5,
        spaceBetween: 0,
      },
      2100: {
        slidesPerView: 6,
        spaceBetween: 0,
      },
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
};

function AddMemberCard(info, id) {
  let html = `<div class="swiper-slide">
    <div class="memberCard">
      <div class="memberColor"style="background-color:${info.classColor};"></div>
      <div class="memberImgContainer">
        <div>
          <img style="${info.internalStyle}}" src="${info.classImg}" alt="">
        </div>
      </div>
      <div class="content">
        <p>${info.className}</p>
        <span> <img src="${info.weaponImg}" alt=""> ${info.weapon}</span>
        <span> <img src="${info.equipmentImg}" alt=""> ${info.equipment}</span>
      </div>
      <div class="tag">
        <p>${info.tag}</p>
      </div>
    </div>
    </div>`;
  document.querySelector(`#${id}`).innerHTML += html;
}
