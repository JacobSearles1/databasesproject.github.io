fetch("import.xml")
  .then(res => res.text())
  .then(xmlText => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const books = xmlToJson(xml);

    console.log(books);       // books is available here
    populateTable(books);     // safe to call here
  });

function xmlToJson(xmlDoc) {
  const rows = xmlDoc.getElementsByTagName("ROW");
  const books = [];

  for (let row of rows) {
    books.push({
      BookID: row.getElementsByTagName("BookID")[0].textContent,
      Title: row.getElementsByTagName("Title")[0].textContent,
      Author: row.getElementsByTagName("Author")[0].textContent,
      Genre: row.getElementsByTagName("Genre")[0].textContent,
      BookCondition: row.getElementsByTagName("BookCondition")[0].textContent,
      InStock: row.getElementsByTagName("InStock")[0].textContent,
      PublicationYear: row.getElementsByTagName("PublicationYear")[0].textContent,
      Price: parseFloat(row.getElementsByTagName("Price")[0].textContent)
    });
  }

  return books;
}

function populateTable(data) {
  const tableBody = document.getElementById("data-table");
  tableBody.innerHTML = "";

  data.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.BookID}</td>
      <td>${item.Title}</td>
      <td>${item.Author}</td>
      <td>${item.Genre}</td>
      <td>${item.PublicationYear}</td>
    `;

    tableBody.appendChild(tr);
  });
}

function searchTable() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("search-bar");
            filter = input.value.toUpperCase();
            table = document.getElementById("data-table");
            tr = table.getElementsByTagName("tr");

            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
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