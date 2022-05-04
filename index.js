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
          class: info.class,
          weapon: info.weapon,
          equipment: info.equipment,
          tag: info.tag,
        },
        "memberList-enforcer"
      );
    });
    res.data.support.forEach((info) => {
      AddMemberCard(
        {
          class: info.class,
          weapon: info.weapon,
          equipment: info.equipment,
          tag: info.tag,
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
  let equipment = [];
  info.equipment.forEach((item) => {
    equipment.push(`<span> <img src="${item.img}" alt=""> ${item.text}</span>`);
  });

  let html = `<div class="swiper-slide">
    <div class="memberCard">
      <div class="memberColor"style="background-color:${
        info.class.color
      };"></div>
      <div class="memberImgContainer">
        <div>
          <img style="${info.class.internalStyle}}" src="${
    info.class.img
  }" alt="">
        </div>
      </div>
      <div class="content">
        <p>${info.class.name}</p>
        <span> <img src="${info.weapon.img}" alt=""> ${info.weapon.text}</span>
        ${equipment.join("")}
      </div>
      <div class="tag">
        <p>${info.tag}</p>
      </div>
    </div>
    </div>`;
  document.querySelector(`#${id}`).innerHTML += html;
}
