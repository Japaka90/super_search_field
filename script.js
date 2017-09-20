function findElem(parentForm, elem) {
  return document.getElementById(parentForm).querySelector(elem);
}

function setFieldActive(event) {
  var formID = event.target.parentNode.parentNode.parentNode.id;

  if (event.target.value != '') {
    findElem(formID, '.super_search_btn').disabled = false;
    findElem(formID, '.reset_btn').style.visibility = 'visible';
    findElem(formID, '.input_wrapper').style.border = '1px solid #1b93e5';
  }
  else {
    hideResetBtn(event);
  }

  if (checkInputForUrl(event.target.value)) {
    getDropdownList(event.target.value, formID);
  }
  else {
    hideDropdownList(formID);
  }
}

function hideResetBtn(event) {
  var formID = event.target.parentNode.parentNode.parentNode.id;
  findElem(formID, '.reset_btn').style.visibility = 'hidden';
  findElem(formID, '.super_search_btn').disabled = true;
  findElem(formID, '.dropdown_list').style.display = 'none';
  findElem(formID, '.input_wrapper').style.border = '1px solid grey';
}

function getDropdownList(url, formID) {
  findElem(formID, '.dropdown_list').style.display = "block";

  var noProtocolUrl = url.split('//')[1];

  var host = noProtocolUrl.split('/')[0];
  if (host.indexOf('www.') != -1) {
    host = host.substr(4);
  }

  var tooltipContent = '<ul>' +
                        '<li><div class="link_wrapper"><a href="super-analytics.com?suggestionType=in Phrase Overview&query='+url+'">'+ url +'</a></div> <p>in <span>Phrase Overview<span></p></li>' +
                        '<li><div class="link_wrapper"><a href="super-analytics.com?suggestionType=in Phrase Overview&query='+url+'">'+ host +'</a></div> <p>in <span>Domain Overview<span></p></li>' +
                        '<li><div class="link_wrapper"><a href="super-analytics.com?suggestionType=in Phrase Overview&query='+url+'">'+ noProtocolUrl +'</a></div> <p>in <span>URL Overview<span></p></li>' +
                      '</ul>';

  findElem(formID, '.dropdown_list').innerHTML = tooltipContent;

  //styles for links
  var listElems = document.getElementById(formID).querySelectorAll('li');

  for (var i = 0; i < listElems.length; i++) {
    var linkElem = listElems[i].querySelector('a');
    var suggestionType = listElems[i].querySelector('p');

    if (listElems[i].offsetWidth -20 > linkElem.offsetWidth + suggestionType.offsetWidth) {
      listElems[i].className = 'full_view_elem';
    }
    else {
      listElems[i].className = 'overflow_hidden_elem';
      var linkWrapper = listElems[i].querySelector('.link_wrapper');
      linkWrapper.style.width = listElems[i].offsetWidth - suggestionType.offsetWidth -30 +'px';
    }

  }


}

function hideDropdownList(formID) {
  findElem(formID, '.dropdown_list').style.display = 'none';
}

function checkInputForUrl(value) {
  var regExpr = /(((http|ftp|https):\/{2})+(([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?))\b/
  return regExpr.test(value);
}

function postRequest(event) {

  var data = JSON.stringify({ "id": event.target.parentNode.id,  "query": event.target.value});

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "http://super-analytics.com/");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "cf5ade76-4b32-8b92-9424-f303d4f5559a");

  xhr.send(data);
}
