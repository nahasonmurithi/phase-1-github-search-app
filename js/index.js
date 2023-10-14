
let allUsers;

function displayInformation(gitHubUsers) {
    console.log(gitHubUsers);
    const ul = document.querySelector('#user-list')
    gitHubUsers.items.forEach(user => {
        const li = document.createElement('li')
        li.innerHTML = `
            <h4 style="color: coral;">${user.login}</h4>
            <a href="${user.url}">Git account</a>
        `
        ul.appendChild(li)
        li.querySelector('h4').addEventListener('click', (e) => {
            showRepos(user)
        })
    });
}

function showUser(user) {
    //console.log(user.login);
    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(resp => resp.json())
    .then(repos => {
        const ul = document.querySelector('#repos-list')
        repos.forEach(repo => {
            console.log(repo.name)
            const li = document.createElement('li')
            li.innerHTML = repo.name
            ul.appendChild(li)
        });
    })
}


function searchUser(e){
    e.preventDefault()
    const query = document.querySelector('#query')
    const userInput = query.value.trim()
    const character = allUsers.find(character => character.name === userInput)
    if(character === undefined){
        alert('character not found!!')
    }
   displayUser(character)
   query.value = ''
}




document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('#github-form').addEventListener('submit', searchUser)
})