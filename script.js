
class GithubUser{
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`
        return fetch(endpoint)
            .then(data => data.json()
            .then(data => ({
                login: data.login,
                name: data.name,
                public_repos: data.public_repos,
                followers: data.followers
            })))
    }
}

class Users{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()

        //GithubUser.search('mtsbotelhosantos').then(user => console.log(user))
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];

         console.log(this.entries);

        // entries.forEach( user =>{
        //     console.log(user);
        // } )


        

    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add (username){

        
        
        try{
            const userExsists =  this.entries.find(entry => entry.login === username) 

            if(!userExsists){    

                const user = await GithubUser.search(username)    
                
                if(user.login === undefined){
                    throw new Error('User not defined')
                }

                this.entries = [user, ...this.entries]
                this.update()
                this.save()
            
            }else{
                console.log(error);
            }
        
        }
            catch(error){
            alert("Usuário já salvo! - User already saved!")
        

    }
        
    }

    delete(user){
        const filteredEntries = this.entries.filter(entry => 
            entry.login !== user.login)

            this.entries = filteredEntries;
            this.update()
            this.save()
    }
    
}


class UserView extends Users {
    constructor(root){
        super(root)
        //console.log(this.root);
        this.tbody = this.root.querySelector('table tbody')
        this.update()
        this.onadd()
        
    }

    onadd(){
        const button = this.root.querySelector('.searchButton')
        button.onclick = () => {
            const { value } = this.root.querySelector('#input')

            
                this.add(value)
                
          
        }
    }

    update() {
       
            this.removeAllTr();
           

          


           
            this.entries.forEach( user => {
                const row = this.creatRow()
                row.querySelector('.user img').src = `https://github.com/${user.login}.png`

                row.querySelector('.user img').alt = `Imagem de ${user.name}`
                row.querySelector('.user a').href = `https://github.com/${user.login}`
                row.querySelector('.user p').textContent = user.name
                row.querySelector('.user span').textContent = user.login
                row.querySelector('.repositories').textContent = user.public_repos
                row.querySelector('.followers').textContent = user.followers

                
                row.querySelector('.remove').onclick = () => {
                    const message = confirm('Tem certeza que deseja deletar esse usuário?')
                    if(message){
                        this.delete(user)
                    }
                    
                }

                this.tbody.append(row)
            })

            
       
        };

        creatRow() {

            const tr = document.createElement('tr');
            tr.innerHTML =  `
          <td class="user">
                    <img src="/Explorer/perfil_linkedin.png" alt="" srcset="">
                    <a href="" target="_blank">
                        <p>Matheus</p>
                    </a>
                    <span>Matheus Botelho</span>
                </td>
                <td class="repositories">70</td>
                <td class="followers">9582</td>
                <td>
                    <button class="remove">&times;</button>
                </td> `;
            
            return tr;
          

        };


    removeAllTr(){

        
    
            this.tbody.querySelectorAll('tr').forEach(
                
                (tr) => {
                    tr.remove()
                })
             

        }
    
    }


    
new UserView ("#aplication")




