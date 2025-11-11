    // script.js
    fetch('data.json') // Or directly use a JSON string: const jsonData = '[{"name": "Alice", ...}]';
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('data-table');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td><a href="mailto${user.email}">${user.email}</a></td>
                    <td>${user.address.city}</td>
                `;
                tableBody.appendChild(row);
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