function fetchRssFeed(feedid) {
  const url = document.getElementById('feedurl').value;
  fetch(`/news-feed/fetch/${feedid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  }).then(response => response.json())
    .then(result => {
      if (result.status == 'success') {
        location.reload()
      } else {
        alert(JSON.stringify(result, null, 2));
      }
    })
    .catch((err) => {
      alert(JSON.stringify(err, null, 2));
    });
}
function generateMp3(id) {
  fetch('/mp3/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  }).then(response => response.json())
    .then(result => {
      if (result.status == 'success') {
        location.reload();
      } else {
        alert(JSON.stringify(result, null, 2));
      }
    })
    .catch((err) => {
      alert(JSON.stringify(err, null, 2));
    });
}
function toggleStatus(id, status) {
  var r = confirm("Are you sure!");
  if (r == true) {
    const upstatus = status == 'hide' ? 'active' : 'hide';
    fetch('/stories/status/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: upstatus, id: id })
    }).then(response => response.json())
      .then(result => {
        if (result.status == 'success') {
          location.reload();
        } else {
          alert(JSON.stringify(result, null, 2));
        }
      })
      .catch((err) => {
        alert(JSON.stringify(err, null, 2));
      });
  }
}
function deleteStory(id) {
  fetch('/stories/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  }).then(response => response.json())
    .then(result => {
      if (result.status == 'success') {
        location.reload();
      } else {
        alert(JSON.stringify(result, null, 2));
      }
    })
    .catch((err) => {
      alert(JSON.stringify(err, null, 2));
    });
}