var username="kip";
// Get form data
function getVal() 
{
    username = document.querySelector('input').value;

    console.log("kip",username)
    var profile_container = document.querySelector('.user-profile'); 
    var repo_container = document.querySelector('.repo-row'); 
    repo_container.innerHTML="";
    profile_container.innerHTML="";
    getData(username)

}
// getData(username)
document.addEventListener('DOMContentLoaded', getVal);

function getData(username) {
    // Get my profile
    fetch(`https://api.github.com/users/${username}? -d {"access_token": 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 }`)
    .then(response => response.json())
    .then(user => {
        profile(user)
        console.log("user ",user.login)
    })
    .catch(err => console.error(err));

    // Get Repos
    fetch(`https://api.github.com/users/${username}/repos? -d {"access_token": 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 }`)
    .then(response => response.json())
    .then(repos => {
        repositories(repos)
    })
    .catch(err => console.error(err));
}


function profile(user) 
{

    var profile_container = document.querySelector('.user-profile');
    var user_error = document.querySelector('.user-error');

    if(user.login==undefined){
        profile_container.innerHTML=="xx";
        console.log("HALLO")

        var error = document.createElement('div')
        error.classList.add("alert");
        error.classList.add("alert-danger");
        error.innerText="User Does not Exist";
        user_error.append(error)
    } 
    else
    {
        // clear the error
        user_error.innerHTML=""
    // creating a div to hold an image
    var profile_image_div = document.createElement("div");
        profile_image_div.classList.add("profile-image")
    var img = document.createElement('img');
    img.src = user.avatar_url;
    img.alt = "profile image"
    img.classList.add("img-fluid")
    profile_image_div.append(img)

    // creating a name h4
    var username_h4 = document.createElement("h4");
    username_h4.innerText = user.name

    // creating a username holder
    var username_paragraph = document.createElement("p");
    username_paragraph.classList.add("username");
    username_paragraph.innerText = user.login

    // creating a bio holder
    var bio_h5 = document.createElement("h5");
    bio_h5.innerText = user.bio

     // creating a followers holder
     var followers_paragraph = document.createElement("p");
        var followers_span = document.createElement("span");
            followers_span.classList.add("d-block");
            followers_span.innerText=user.followers + " Followers"
        var following_span = document.createElement("span");
            following_span.innerText = user.following + " Following"
        followers_paragraph.append(followers_span, following_span)
    // creating HR tag
    var hr = document.createElement("hr"); 
    // creating location
    var location_paragraph = document.createElement("p");
        var location_icon = document.createElement("i");
        location_icon.classList.add("fa");
        location_icon.classList.add("fa-map-marker");
        location_icon.setAttribute('aria-hidden',true);

        var location_text = document.createElement("span");
        location_text.innerText=user.location;
        location_text.classList.add("mx-3")    
        
        location_paragraph.append(location_icon, location_text) 
    


    // creating createdAt
    var date_joined = document.createElement("p");
        var date_joined_span = document.createElement("spann");
        date_joined_span.innerText = "Joined "
        date_joined.append(date_joined_span)
        
        var date_joined_text = document.createElement("span");
        date_joined_text.innerText = " "+new Date(user.created_at).toDateString();
       
        date_joined.append(date_joined_span, date_joined_text)
    // creating updatedAt
    var date_updated = document.createElement("p");
        var date_updated_span = document.createElement("spann");
        date_updated_span.innerText = "Updated "
        date_joined.append(date_updated_span)
        
        var date_updated_text = document.createElement("span");
        date_updated_text.innerText = new Date(user.updated_at).toDateString();
    
        date_updated.append(date_updated_span, date_updated_text) 



    profile_container.append(profile_image_div, username_h4,username_paragraph, bio_h5,
        followers_paragraph, location_paragraph,hr, date_joined, date_updated )
    }
    
}



function repositories(repos)
{
    var repos_badge = document.querySelector('.repos-badge')
    var error = document.querySelector('.error'); 
    if(repos.length==undefined || repos.length==0)
    {
        repos_badge.innerText = 0 ; 
        error.classList.add("alert-danger");
        error.innerText="The user has no repository!"
    }
    else
    {
        var repo_container = document.querySelector('.repo-row');       
        repos_badge.innerText = repos.length;
        error.classList.remove("alert-danger");
        error.innerText="";
    }


    console.log("repos",repos)

    repos.map((repo)=>
    {
        var repo_container = document.querySelector('.repo-row'); 
    
         // 
        var repo_col = document.createElement("div");
         repo_col.classList.add("repo-col")
         repo_col.classList.add("col-md-5")
         repo_col.classList.add("m-1")
         repo_col.innerHTML = `
        <div class="row">
        <div class="col-md-9 mt-auto">
            <h6><a href=${repo.clone_url}  target="_blank"> ${ repo.name }</a></h6>
        </div>

        <div class="col-md-3" appColor>
            <p><i class="fa fa-code-fork" aria-hidden="true"></i> ${ repo.forks }</p>  
        </div>
        </div>
                        
        <p class="description">${ repo.description }</p>
        <p><a class="text-dark" href="${ repo.homepage }"  target="_blank">View Site <i class="fa fa-external-link" aria-hidden="true"></i></a></p>

        <div class="row">
            <div class="col-md-5">
                <p><i class="fa fa-dot-circle-o text-danger" aria-hidden="true"></i> ${ repo.language }</p>  
            </div>
            <div class="col-md-7">
                <p>Watchers <span class="badge bg-secondary text-white rounded-pill">${ repo.watchers }</span></p>  
            </div> 
        </div>         
         `;
         
        //  repo_col,
        repo_container.append( repo_col)   

    })

}