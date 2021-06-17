window.avastGlobals = window.avastGlobals || {};
window.avastGlobals.web = {
  domain: "localhost",
  pathFromRoot: "en-us/index",
  fileName: "index",
  locale: "en-us",
  ulocale: "/en-us",
  RootPath: "../",
  language: "en",
  numberDecimalSeparator: ".",
  numberThousandSeparator: ",",
  responsive: true,
  contentGroup: 'Consumer',
  pageName: 'en-us | en-us/index',
  'notification-overlay-for-wrong-download': {
    'this-is-a-temp-index': {
      '					alternative-links': {
        android: '/download-thank-you.php?product=AMS',
        mac: '/download-thank-you.php?product=MAC-FREE-ONLINE',
        ios: '/download-thank-you.php?product=IMS'
      },
      'alternative-tracking': {
        android: 'AMS',
        mac: 'MAC-FREE-ONLINE',
        ios: 'IMS'
      },
      'button-selector': '[href*=\"download-thank-you.php?product=FAV-ONLINE\"]',
      'product-id': 'FAV-ONLINE',
      'supported-platform': 'windows'
    },
    'free-antivirus-download-v2': {
      'alternative-links': {
        android: '/download-thank-you.php?product=AMS',
        mac: '/download-thank-you.php?product=MAC-FREE-ONLINE',
        ios: '/download-thank-you.php?product=IMS'
      },
      'alternative-tracking': {
        android: 'AMS',
        mac: 'MAC-FREE-ONLINE',
        ios: 'IMS'
      },
      'button-selector': '[href*=\"download-thank-you.php?product=FAV-ONLINE\"]',
      'product-id': 'FAV-ONLINE',
      'supported-platform': 'windows'
    }
  }
};

const faqQuestion = document.querySelector('.product_faq_container');
if(faqQuestion) {
  faqQuestion.addEventListener('click', evt => {
    let item = evt.target.matches('h5') ? evt.target : evt.target.parentElement
    openQuestion(item);
  });
  function openQuestion(item) {
    let questionContainer = item.parentElement;
    let answer = questionContainer.querySelector('.product_faq_answer');
    let answerHeight = answer.clientHeight;
    let questionContainerHeight = questionContainer.clientHeight;
    if(questionContainerHeight > 99) {
      questionContainer.style.height = 99 + 'px';
      item.classList.remove('active');
    } else {
      item.classList.add('active');
      questionContainer.style.height = questionContainerHeight + answerHeight + 40 + 'px';
    }
  };
};

const buyContainer = document.querySelector('.buy_main_choose_items');
const popupBilling = document.querySelector('#confirm-popup');
if(buyContainer) {
  buyContainer.addEventListener('click', evt => {
    let elementTarget = evt.target;
    if(elementTarget.matches('.buy_main_choose_item_buybutton')) {
      openBilling();
    };
  });
  
  function openBilling() {
    popupBilling.style.display = "flex";
    setTimeout(() => { popupBilling.style.opacity = 1; }, 150);  
  }
};

if(popupBilling) {
  popupBilling.addEventListener('click', evt => {
    if(evt.target.matches('.confirm_popup')) {
      popupBilling.style.opacity = 0;
      setTimeout(() => { popupBilling.style.display = "none"; }, 400); 
    }
  });
}

const saccefullPayment = document.querySelector('#saccefull-payment');
if(saccefullPayment && popupBilling) {
  let confirmButton = document.querySelector('.confirm_popup_container_button');
  confirmButton.addEventListener('click', openSaccesfull);

  saccefullPayment.addEventListener('click', evt => {
    if(evt.target.matches('.confirm_popup')) {
      saccefullPayment.style.opacity = 0;
      setTimeout(() => { saccefullPayment.style.display = "none"; }, 400); 
    }
  });

  function openSaccesfull() {
    popupBilling.style.opacity = 0;
    setTimeout(() => { popupBilling.style.display = "none"; }, 400); 

    setTimeout(() => { saccefullPayment.style.opacity = 1; }, 400); 
    saccefullPayment.style.display = "flex";
  };

  let activateButton = document.querySelector('.saccefull_payment_container_button');
  activateButton.addEventListener('click', () => {
    saccefullPayment.style.opacity = 0;
    setTimeout(() => { saccefullPayment.style.display = "none"; }, 400);
    
    window.open(
      '#',
      '_blank'
    );
  })
}