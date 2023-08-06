const toggle_btn = document.getElementById("sidebar-toggle");
const sideBar = document.getElementById("side-bar-container");
const sidebar_menu_items = document.getElementsByClassName("side-bar-menu-items");
// const sidebar_title = document.getElementsByClassName("side-bar-menu-items-title");
const fiters = document.getElementById("filters-container");
const video_container = document.getElementById("video-container");
// const collapsed_sidebar = document.getElementById("collapsed");
var expanded = true;
let str = `<div class="side-bar-menu-items-collapsed">
    <div class="img">
        <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path></g></svg>
    </div>
    <div class="collapsed-side-bar-menu-items-title">Home</div>
</div>    
<div class="side-bar-menu-items-collapsed">
    <div class="img">
        <svg height="28" viewBox="0 0 28 28" width="28" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path></svg>
    </div>
    <div class="collapsed-side-bar-menu-items-title">Shorts</div>
</div> 
<div class="side-bar-menu-items-collapsed">
    <div class="img">
        <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path></svg>
    </div>
    <div class="collapsed-side-bar-menu-items-title">Subscriptions</div>
</div> 
<div class="side-bar-menu-items-collapsed">
    <div class="img">
        <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"></path></svg>                        </div>
        <div class="collapsed-side-bar-menu-items-title">Library</div>
    </div> 
</div>`
toggle_btn.addEventListener("click", expand_collapse_sidebar);
function sideBar_changer(state) {
    for (let i = 0; i < sidebar_menu_items.length; i++) {
        const element = sidebar_menu_items[i];
        element.style.display = state;
        if(state === "block") element.style.display = "flex";
    }
    document.getElementById("copyRight").style.display = state;
    document.querySelector(".side-bar-menu-items-titl").style.display = state;
    document.querySelector(".side-bar-section-3 > .section-title").style.display = state;
    document.querySelector(".side-bar-section-4 > .section-title").style.display = state;


}
function borderBottom(color){
    for(let i = 0; i < 6; i++){
        let cont = document.querySelector(`.side-bar-section-${i+1}`);
        cont.style.borderBottom = `1px solid ${color}`;
        cont.style.width = "100%";
        // cont.style
    }
}

function changeVideoStyle(size) {
    const videos = document.getElementsByClassName("videos");
    const videos_img = document.getElementsByClassName("thumbnail");

    for (let i = 0; i < videos.length; i++) {
        const vid = videos[i];
        const img = videos_img[i];
        vid.style.width = size;
        img.style.width = size;
    }
}

const collapsed = document.createElement("div");
collapsed.id = "collapsed";
collapsed.className = "collapsed";
collapsed.innerHTML  = str;
function expand_collapse_sidebar(){
    if(!expanded){
            sideBar.style.width = "15vw";
            expanded = true;
            if(document.getElementById("collapsed")) collapsed.remove();
            sideBar_changer("block");

            video_container.style.width = "84vw";
            video_container.style.left = "15vw";
            fiters.style.width ="84vw"
            fiters.style.left = "15vw";
            document.querySelector(".side-bar-section-2").style.borderBottom = "none";
            borderBottom("#303030");
            video_container.style.gridTemplateColumns = "repeat(3, 1fr)"
            changeVideoStyle("23vw");
            
        }else if(expanded){
            sideBar.style.width = "6vw"
            expanded = false;
            sideBar.appendChild(collapsed);
            sideBar_changer("none");
            // sidebar_menu_items.display = "none";
            video_container.style.width = "93vw";
            video_container.style.left = "6vw";
            fiters.style.width ="92vw"
            fiters.style.left = "6vw";
            borderBottom("transparent");
            video_container.style.gridTemplateColumns = "repeat(4, 1fr)"
            changeVideoStyle("20vw");
            
        }
    }


    const search = document.getElementById("search-input");
    const search_btn = document.querySelector(".search-box-btn > img")
    const search_result = document.getElementById("search-btn");
    let clicked = false;
    search_btn.addEventListener("click",()=>{
        search.value = '';
        search_btn.style.display = "none";
        clicked = false;
    })
    search.addEventListener("click", ()=>{
        if(!clicked && search.value.length > 0) {
            search_btn.style.display = "block";
            clicked = true;
        }
        else if(clicked) {
            search_btn.style.display = "none";
            clicked = false;
        }
    });
    async function fetchSearchResult(){
        video_container.innerHTML = '';
        const apiKey = `AIzaSyBM1_C40cespNthMdFZHgn6-6VwZ8X4mlo`;
        const search_url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${search.value}&type=channel,video,playlist&maxResults=20`;
            let response = await fetch(search_url);
            let search_values = await response.json(); 
            // console.log(video_suggestions);
            console.log(search_values);
            for (const i in search_values.items) {
                makeSearchAlive(search_values.items[i]);
            }
            
        }
        search_result.addEventListener("click",fetchSearchResult);
        
        async function makeSearchAlive(videos){
            let my_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videos.id.videoId}&key=${apiKey}`
            let response = await fetch(my_url);
            let data = await response.json();
            // for (const i in data.items) {
            //     makeSearchAlive(data.items[i]);
            // }
            for (let i = 0; i < data.items.length; i++) {
            const element = data.items[i];
            getChanelIcon(element);
            }
    }
