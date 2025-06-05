document.addEventListener('DOMContentLoaded', function() {
    const userContainer = document.getElementById('userContainer');
    const errorContainer = document.getElementById('errorContainer');
    const reloadBtn = document.getElementById('reloadBtn');
    
    // Initial fetch
    fetchUserData();
    
    // Reload button event listener
    reloadBtn.addEventListener('click', fetchUserData);
    
    function fetchUserData() {
        // Show loading state
        userContainer.innerHTML = '<p>Loading data...</p>';
        errorContainer.classList.add('hidden');
        
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                displayUsers(users);
            })
            .catch(error => {
                showError(error);
            });
    }
    
    function displayUsers(users) {
        if (users.length === 0) {
            userContainer.innerHTML = '<p>No users found.</p>';
            return;
        }
        
        userContainer.innerHTML = '';
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            userCard.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Address:</strong> 
                    ${user.address.street}, 
                    ${user.address.suite}, 
                    ${user.address.city}, 
                    ${user.address.zipcode}
                </p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;
            
            userContainer.appendChild(userCard);
        });
    }
    
    function showError(error) {
        errorContainer.textContent = `Error fetching data: ${error.message}`;
        errorContainer.classList.remove('hidden');
        userContainer.innerHTML = '<p>Failed to load user data.</p>';
    }
});