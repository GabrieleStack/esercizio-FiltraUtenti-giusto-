
async function filterAndRenderUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json()

        const searchInput = document.querySelector('input[type="search"]')
        const usersTable = document.querySelector('.table tbody')

        function dropdownFilter() {
            const filterKey = this.textContent.toLowerCase()
            const searchValue = searchInput.value.trim().toLowerCase()

            filterAndRenderUsers(filterKey, searchValue)
        }

        function InputSearch() {
            const filterKeys = ['name', 'username', 'email']
            const searchValue = this.value.trim().toLowerCase()

         if(searchValue.length > 0) {
            filterKeys.forEach(filterKey => {
                filterAndRenderUsers(filterKey, searchValue)
            })
        } else {
            console.log('Termine di ricerca non valido');
        }
    }

        function filterAndRenderUsers(filterKey, searchValue) {
            const searchTerms = searchValue.toLowerCase()
            const filterUser = users.filter(user => {
                const userValue = user[filterKey].trim().toLowerCase()
                return userValue.includes(searchTerms)
            })
            renderUsers(filterUser)
        }

        function renderUsers(users) {
            usersTable.innerHTML = ''
            users.forEach((user, index) => {
                const row = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <td>${user.name}</td>
                </tr>
            `;
             usersTable.insertAdjacentHTML('beforeend', row)
            })
        }

        const dropDownItems = document.querySelectorAll('.dropdown-menu .dropdown-item')
        dropDownItems.forEach(items => {
            items.addEventListener('click', dropdownFilter)
        })

        searchInput.addEventListener('input', InputSearch)

        renderUsers(users)

    } catch (error) {
        console.error('Errore nel recupero dei dati', error);
    }
}

filterAndRenderUsers() 


