    // script.js
    fetch('finalprojecttest.json') // Or directly use a JSON string: const jsonData = '[{"name": "Alice", ...}]';
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('data-table');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.projectName}</td>
                    <td style="text-align:right;">$${user.Estimated_cost}</td>
                    <td style="text-align:center;" class="province" data-lat="${user.Latitude}" data-lng="${user.Longitude}" style="pointer:">${user.Province_Territory} <br>(Click to show map)</br></td>
                    <td>${user.Municipality}</td>
                    <td>${user.Status}</td>
                    <td class="map"><img class="map-placeholder" src="static-map-url-or-placeholder" alt="Click Province to view map"></td>`;
                tableBody.appendChild(row);
                showMap();
            });
        })
        .catch(error => console.error('Error fetching data:', error));

        // Search Bar function ;)

        function searchTable() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("search-bar");
            filter = input.value.toUpperCase();
            table = document.getElementById("data-table");
            tr = table.getElementsByTagName("tr");

            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("mytable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function showMap() {
  const table = document.getElementById('mytable');
  if (!table) return;

  // attach once
  if (table.dataset.mapListenerAttached === 'true') return;
  table.dataset.mapListenerAttached = 'true';

  table.addEventListener('click', (e) => {
    const prov = e.target.closest('.province');
    if (!prov) return;

    const row = prov.closest('tr');
    if (!row) return;

    const mapCell = row.querySelector('.map');
    if (!mapCell) return;

    const lat = prov.dataset.lat;
    const lng = prov.dataset.lng;
    if (!lat || !lng) {
      console.warn('Missing lat/lng for clicked .province cell', prov);
      return;
    }

    // If iframe already loaded, just toggle between iframe and placeholder
    if (mapCell.dataset.mapLoaded === 'true') {
      const iframe = mapCell.querySelector('iframe');
      const placeholder = mapCell.querySelector('.map-placeholder');
      if (!iframe || !placeholder) return;

      // If iframe currently visible -> hide iframe and show placeholder
      if (iframe.style.display !== 'none') {
        iframe.style.display = 'none';
        placeholder.style.display = '';
      } else {
        // show iframe, hide placeholder
        iframe.style.display = '';
        placeholder.style.display = 'none';
      }
      return;
    }

    // If loading already in progress, reveal cell and don't recreate
    if (mapCell.dataset.mapLoaded === 'loading') {
      const iframe = mapCell.querySelector('iframe');
      const placeholder = mapCell.querySelector('.map-placeholder');
      if (iframe) { iframe.style.display = ''; }
      if (placeholder) { placeholder.style.display = 'none'; }
      return;
    }

    // mark loading and ensure placeholder exists and is visible while loading
    mapCell.dataset.mapLoaded = 'loading';
    let placeholder = mapCell.querySelector('.map-placeholder');
    if (!placeholder) {
      // create a placeholder element if one doesn't exist
      placeholder = document.createElement('img');
      placeholder.className = 'map-placeholder';
      placeholder.src = 'static-map-url-or-placeholder';
      placeholder.alt = 'map thumbnail';
      mapCell.innerHTML = ''; // clear any text
      mapCell.appendChild(placeholder);
    }
    placeholder.style.display = '';

    // create iframe (do not set src until appended and visible)
    const iframe = document.createElement('iframe');
    iframe.width = '400';
    iframe.height = '300';
    iframe.style.border = '1px solid #000';
    iframe.style.display = 'none'; // start hidden until load completes
    iframe.referrerPolicy = 'no-referrer-when-downgrade';

    const src = `https://www.google.com/maps?q=${encodeURIComponent(lat)},${encodeURIComponent(lng)}&z=15&output=embed`;
    let attempts = 0;
    const maxAttempts = 2;
    const retryDelay = 300;

    function attemptLoad() {
      attempts += 1;
      if (!mapCell.contains(iframe)) mapCell.appendChild(iframe);
      // ensure placeholder is hidden once we set src so browser can start rendering iframe
      placeholder.style.display = 'none';
      // micro delay helps some browsers
      setTimeout(() => { iframe.src = src; }, 10);
    }

    function onLoad() {
      cleanup();
      mapCell.dataset.mapLoaded = 'true';
      iframe.style.display = ''; // show iframe
      placeholder.style.display = 'none';
    }

    function onError() {
      if (attempts < maxAttempts) {
        iframe.removeAttribute('src');
        setTimeout(attemptLoad, retryDelay);
        return;
      }
      cleanup();
      mapCell.dataset.mapLoaded = 'failed';
      // leave placeholder visible to the user
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      mapCell.innerHTML = ''; // remove any temporary content
      mapCell.appendChild(placeholder);
      placeholder.style.display = '';
      console.warn('Map iframe failed to load after retries for', prov);
    }

    function cleanup() {
      iframe.removeEventListener('load', onLoad);
      iframe.removeEventListener('error', onError);
    }

    iframe.addEventListener('load', onLoad);
    iframe.addEventListener('error', onError);

    attemptLoad();
  });
}
